module.exports = {
   entry: "./public/component/MainComponent.jsx",
   output: {
       path:"public/views",
       filename: "bundle.js"
   },
   module:{
       loaders:[
        {
          loader: 'babel',
          test: /\.jsx$/,// 'babel-loader' is also a legal name to reference
          query: {
            presets: ['es2015',"react","stage-1"]
         } }
        ]
   },
   resolve:{
  extensions:['','.js','.jsx','/index.js', '/index.jsx']
 },
 
}