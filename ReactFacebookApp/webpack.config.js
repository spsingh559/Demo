module.exports = {
    entry: "./public/components/App.jsx",
    output: {
        path: "./public",
        filename: "bundle.js"
    },
    loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
       loader: 'babel?presets[]=es2015' // 'babel-loader' is also a legal name to reference
      
    }
  ]
};