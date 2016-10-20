var seneca = require('seneca')();

  seneca
  .use('./lobbyPlugin.js')
  .use('mesh', { auto:true, pin:'role:lobby,action:*'})
