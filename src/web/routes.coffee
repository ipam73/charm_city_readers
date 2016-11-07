async = require 'async'
crypto = require 'crypto'
qs = require 'querystring'
_ = require "underscore"

# helpers_lib, config.CLIENT_ID, config.CLIENT_SECRET,
module.exports = (
  students_lib,
  helpers_lib,
  client_id,
  client_secret,
  redirect_base_uri,
  session_secret,
  auth_url,
  api_url
  ) ->
  homepage: (req, res, next) ->
    locals =
      bootstrap:
        parent:
          name:
            first: "Pam"
            last:"Martinez"

    res.render "parent-homepage", locals

  logout_student: (req, res, next) ->
    return res.redirect "#{auth_url}/logout"

  login_success: (req, res, next) ->
    res.render "finish_add_student"
    # return res.redirect "/logout"

  add_student: (req, res, next) ->
    redirect_uri = "#{redirect_base_uri}/authorize_student"
    state = crypto.createCipher('aes-256-ctr', session_secret).update(req.sessionID + "|" + req.query.user, 'utf8', 'hex')
    if req.query.mobile
      state = crypto.createCipher('aes-256-ctr', session_secret).update(req.sessionID + "|" + req.query.user + "|mobile", 'utf8', 'hex')


    params =
      response_type: 'code'
      redirect_uri: redirect_uri
      client_id: client_id
      district_id: "54c6778015ec3d010000001b" # baltimore
      # district_id: "56ae8e9c5994560100000ae4" # test district
      channel: 'reading_challenge_app'
      skip: 1
      state: state
    # res.sendStatus(200)

    return res.redirect "#{auth_url}/authorize?#{qs.stringify params}"
    # return res.sendStatus(200)

  privacy: (req, res, next) ->
    res.render "privacy", {url: "https://reading-challenge.herokuapp.com"}

  authorize_student: (req, res, next) ->
    console.log "in authorize_student"

    state = crypto.createDecipher('aes-256-ctr', session_secret).update(req.query.state, 'hex', 'utf8').split('|')
    return res.redirect "/addstudent" if state[0] isnt req.sessionID
    parent_id = state[1]

    isMobile = false
    if state.length >= 3
      if state[2] is 'mobile'
        isMobile = true
        console.log "it is mobile!"

    console.log "in authorize_student next"

    async.auto
      token: (cb_a) ->
        auth_options =
          uri: "#{auth_url}/tokens"
          method: 'POST'
          auth:"#{client_id}:#{client_secret}"
          json:
            code: req.query?.code
            redirect_uri: "#{redirect_base_uri}/authorize_student"
            grant_type: 'authorization_code'
        helpers_lib.quest_retry auth_options, (err, resp, body) ->
          return cb_a err if err
          unless body.access_token?
            return cb_a new Error "No access token returned from Auth Service (status #{resp.statusCode})"
          cb_a null, body.access_token

      user_info: ['token'].concat (cb_a, {token}) ->
        helpers_lib.get_clever_resource(api_url) "/me", token, cb_a

      user: ['user_info', 'token'].concat (cb_a, {user_info, token}) ->
        console.log "user"
        helpers_lib.get_clever_resource(api_url) "/v1.1/#{user_info.type}s/#{user_info.id}", token, (err, user_data) ->
          return cb_a err if err
          cb_a null, user_data

      # this is broken!!!! for some reason hitting this endpoint returns a 404, do I have the wrong scopes?
      # should I hit a different endpoint?
      school_info: ['user_info', 'token'].concat (cb_a, {user_info, token}) ->
        # console.log "school_info"
        # helpers_lib.get_clever_resource(api_url) "/v1.1/students/56ae931f0264e7b267011b48/district", token, (err, user_data) ->
        # helpers_lib.get_clever_resource(api_url) "/v1.1/#{user_info.type}s/#{user_info.id}/school", token, (err, user_data) ->
          # console.log "user data is", user_data
          # return cb_a err if err
          # cb_a null, user_data
        cb_a null, {name: ""}

    , (err, results) ->
      # console.log "results are, ", results

      return next err if err?
      user_type = results.user_info.type

      # error if user is not student
      if user_type isnt "student"
        console.log "houston we have a problem!"
        return res.redirect "/" #eventually show error

      buddy_arrary = ["crab", "dog", "flag", "raven", "sailboat"]
      rand_buddy = buddy_arrary[Math.floor(Math.random() * buddy_arrary.length)]

      student =
        id: results.user.id
        first_name: results.user.name.first
        district_id: results.user.district
        grade: results.user.grade
        school_id: results.user.school
        school_name: results.school_info.name
        buddy: rand_buddy

      req.session.student_logged_in = true
      req.session.access_token = results.token

      err = students_lib.save_student student.id, student.first_name, student.school_id, student.school_name, student.district_id, student.grade, parent_id, student.buddy
      # do something if error
      # res.send(200)

      redirect_url = "/"
      if isMobile
        redirect_url = 'charm-city-readers://homepage'
      res.redirect redirect_url
      # res.redirect "/login_success"
      # res.redirect "/logout"
