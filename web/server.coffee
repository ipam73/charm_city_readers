express = require 'express'
session = require 'express-session'
http = require 'http'
config = require './config'
env = require 'node-env-file'

ensure_logged_in = (req, res, next) ->
  # return res.redirect '/login' unless req.session?.user
  next()

module.exports = () ->
  app = express()

  session_opts =
    secret: config.SESSION_SECRET
    fingerprint: -> ""
    proxy: true
    cookie: httpOnly: true
    saveUninitialized: true
    resave: false
  app.use session(session_opts)


  # libraries
  students_lib = require "../lib/students"
  helpers_lib = require "../lib/helpers"

  redirect_base_uri = "http://#{config.HOST}:#{config.PORT}"
  redirect_base_uri = "https://#{config.HOST}" if config.ENV is "production"

  main_parent_routes = require("../app/web/routes") students_lib, helpers_lib, config.CLIENT_ID, config.CLIENT_SECRET, redirect_base_uri, config.SESSION_SECRET, config.AUTH_URL, config.API_URL

  app.use express.static(__dirname + '/public')

  app.set 'view engine', 'jade'
  app.set 'views', "#{__dirname}/views"
  app.set 'view engine', 'jade'

  # app.get '/oauth', auth_routes.oauth
  # app.get '/login', auth_routes.login
  # app.get '/logout', auth_routes.logout

  # parent route, should only see if a parent
  app.get '/', main_parent_routes.homepage
  app.get '/addstudent', main_parent_routes.add_student
  app.post '/addstudent', main_parent_routes.add_student

  # app.post '/addstudent', main_parent_routes.add_student
  app.get '/authorize_student', main_parent_routes.authorize_student
  app.get '/logout_student', main_parent_routes.logout_student
  app.get '/login_success', main_parent_routes.login_success

  app.get '/privacy', main_parent_routes.privacy

  http.createServer(app).listen config.PORT, ->
    console.log "reading-challenge listening on port #{config.PORT}"

if require.main is module
  module.exports()
