module.exports = {
    entry: "./components/App.jsx",
    output: {
        path: ".",
        filename: "bundle.js"
    },
    loaders: [
    {
      
       loader: 'babel?presets[]=es2015' // 'babel-loader' is also a legal name to reference
      
    }
  ]
};