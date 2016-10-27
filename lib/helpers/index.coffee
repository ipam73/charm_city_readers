async = require 'async'
quest = require 'quest'

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


module.exports =
  quest_retry: quest_retry
  get_clever_resource: get_clever_resource
