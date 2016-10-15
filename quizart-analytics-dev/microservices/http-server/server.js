var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
// var jsonServer = require('json-server');
// var server = jsonServer.create()
// var router = jsonServer.router('db.json')
// var middlewares = jsonServer.defaults()

// server.use(middlewares)
// server.use(router)
// server.listen(8080, function () {
//   console.log('JSON Server is running')
// })

new WebpackDevServer(webpack(config), {
  contentBase: __dirname + '/common-ui',
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');
});
