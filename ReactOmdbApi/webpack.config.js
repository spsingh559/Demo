module.exports = {
   entry: "./components/main.jsx",
   output: {
       path:".",
       filename: "bundle.js"
   },
   module:{
       loaders:[
        {loader: 'babel', // 'babel-loader' is also a legal name to reference
          query: {
            presets: ['es2015',"react"]
         } }
        ]
   }
}