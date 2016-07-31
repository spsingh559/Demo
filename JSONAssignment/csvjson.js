var fs = require("fs");
//Reading CSV file from File System and converting to JSON
var csvData = fs.readFileSync('csv/country_details.csv');
var stringData=csvData.toString();
//console.log("Raw data ::"+rawData);
//var newLineCharacter = "\r\n";
//splitting the new line character
var lines = stringData.split('\r\n');
//Getting the no of columns
var noOfCols = lines.length; //23
var noOfRows = 0;
var jsonArray = [];
for( var i = 1; i < noOfCols; i++ ) {
  var line = lines[i];
  if( line != null && line != '' && line.length != 0 ) {
    noOfRows ++;
    var data = line.split( "," );
    jsonArray.push( data );// storing final data in processedData Array
  }
}
// JSON for Bar chart of Population by Country
jsonPopulation(jsonArray);
function jsonPopulation( jsonArray ) {
  var populationArray = [];
  var noOfRows = jsonArray.length;
  for (var i = 0; i < noOfRows; i++) {
    if(jsonArray[i][0] != "European Union" && jsonArray[i][0] != "World"){
      populationArray[i] = {country : jsonArray[i][0], population2013 : jsonArray[i][5] };
    }
  }
 fs.writeFile(process.cwd() + "/json/Population.json", JSON.stringify(populationArray,undefined, 2), function (err) {
    if (err) throw err;
    console.log('Population JSON file has been successfully created');
  });
}
// JSON for Bar chart of GDP by Country
jsonGDP(jsonArray);
function jsonGDP( jsonArray ) {
  var gdpArray = [];
  var noOfRows = jsonArray.length;
  for (var i = 0; i < noOfRows; i++) {
    if(jsonArray[i][0] != "European Union" && jsonArray[i][0] != "World"){
    gdpArray[i] = { country : jsonArray[i][0], GDP2013 : jsonArray[i][11] };
  }
}
  fs.writeFile(process.cwd() + "/json/GDP.json", JSON.stringify(gdpArray,undefined, 2), function (err) {
    if (err) throw err;
    console.log('GDP JSON file has been successfully created');
  });
}
// JSON for Bar chart of Pruchasing Power by country
jsonPurchasingPower(jsonArray);
function jsonPurchasingPower( jsonArray ) {
  var purchasingPowerArray = [];
  var noOfRows = jsonArray.length;
  for (var i = 0; i < noOfRows; i++) {
      if(jsonArray[i][0] != "European Union" && jsonArray[i][0] != "World"){
    purchasingPowerArray[i] = { country : jsonArray[i][0], PurchasingPower2013 : jsonArray[i][23] };
  }
}
  fs.writeFile(process.cwd() + "/json/PurchasingPower.json", JSON.stringify(purchasingPowerArray,undefined, 2), function (err) {
    if (err) throw err;
    console.log('Purchasing Power JSON file has been successfully created');
  });
}
