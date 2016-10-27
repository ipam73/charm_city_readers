async = require 'async'
crypto = require 'crypto'
qs = require 'querystring'
quest = require 'quest'
_ = require "underscore"

quest_retry = (options, cb) ->
  options.timeout ?= 2000
  async.retry 5, ((cb_r) ->
    quest options, (err, response, body) ->
      return cb_r(err, [response, body]) if err?
      return cb_r(new Error("Got status code " + response.statusCode), [response, body]) if response.statusCode > 499
      cb_r null, [response, body]
    ), (err, [response, body]) -> cb err, response, body

get_clever_resource = (api_path) ->
  (url, token, cb) ->
    options =
      json: true
      headers: authorization: "Bearer #{token}"
      uri: "#{api_path}#{url}"
    quest_retry options, (err, resp, body) ->
      return cb(err) if err
      return cb(new Error "Bad status code returned from Clever API (#{resp.statusCode})") unless resp.statusCode is 200
      return cb(new Error "Bad response body returned from Clever API") unless body?.data
      cb null, body.data

login = (client_id, redirect_uri, session_secret, auth_url) ->
  (req, res) ->
    params =
      response_type: 'code'
      redirect_uri: redirect_uri
      client_id: client_id
      channel: 'reading_challenge_app'
      skip: 1
      state: crypto.createHmac('sha256', session_secret).update(req.sessionID).digest('hex')
    res.redirect "#{auth_url}/authorize?#{qs.stringify params}"

oauth = (client_id, client_secret, redirect_uri, session_secret, auth_url, api_url) ->
  (req, res, next) ->
    expected_state = crypto.createHmac('sha256', session_secret).update(req.sessionID).digest('hex')
    # If at first you don't succeed, try, try again
    return res.redirect "/login" if expected_state isnt req.query.state

    async.auto
      token: (cb_a) ->
        auth_options =
          uri: "#{auth_url}/tokens"
          method: 'POST'
          auth:"#{client_id}:#{client_secret}"
          json:
            code: req.query?.code
            redirect_uri: redirect_uri
            grant_type: 'authorization_code'
        quest_retry auth_options, (err, resp, body) ->
          return cb_a err if err
          unless body.access_token?
            return cb_a new Error "No access token returned from Auth Service (status #{resp.statusCode})"
          cb_a null, body.access_token
      user_info: ['token'].concat (cb_a, {token}) ->
        get_clever_resource(api_url) "/me", token, cb_a
      user: ['user_info', 'token'].concat (cb_a, {user_info, token}) ->
        get_clever_resource(api_url) "/v1.1/#{user_info.type}s/#{user_info.id}", token, (err, user_data) ->
          return cb_a err if err
          cb_a null, user_data
    , (err, results) ->
      return next err if err?

      console.log "results user", results.user

      # if user is a student
      # if user is an admin
      if results.user_info.type is "student"
        console.log "in student"
        user =
          id: results.user.id
          name: results.user.name
          district: results.user.district
          grade: results.user.grade
          school: results.user.school

        console.log "the user is a student, save student info"
        req.session.new_student = user
        return res.redirect "/parent"

      console.log "didn't do that"
      user =
        id: results.user.id
        type: results.user_info.type
        name: results.user.name
        district: results.user.district
      # user not a student
      # set user in the session
      req.session.user = user
      res.redirect "/"

logout = (req, res) ->
  req.session.destroy ->
    res.redirect '/'

# TODO:  MOHIT -- somehow talk to the firebase db somewhere here
addstudent = (client_id, redirect_uri, session_secret, auth_url) ->
  (req, res, next) ->
    console.log "in add student"
    # if req.session.user?
    #   req.session.destroy ->
    #     console.log "session should have been destroyed"
    #     return res.redirect '/login'
    # else
    #   return res.redirect '/login'

    student =
      id: "123"
      name:
        first: "Pam"
      district: "district id"
      grade: "1"
      school: "school id"
    req.session.new_student = student
    console.log "before redirecting to new student"
    console.log "res.locals", res.locals
    return res.redirect '/'

module.exports = (client_id, client_secret, redirect_uri, session_secret, auth_url, api_url) ->
  {
    login: login client_id, redirect_uri, session_secret, auth_url
    oauth: oauth client_id, client_secret, redirect_uri, session_secret, auth_url, api_url
    logout: logout
    addstudent: addstudent client_id, redirect_uri, session_secret, auth_url
  }
