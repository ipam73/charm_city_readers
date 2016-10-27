config = {}
if process.env.ENV is 'production'
  for key in Object.keys(process.env)
    config[key] = process.env[key]
  console.log config
else
  config = require './local_config'
module.exports = config
