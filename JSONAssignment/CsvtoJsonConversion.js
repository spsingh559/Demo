//Reading CSV file from File System and converting to JSON
//variables
var noOfRows = 0;
var jsonArray = [];
var noOfCols=0;
var lines;
var stringData;
var csvData;
var fs;
var headerlength;
var header=[];
var firstColumn =[];
var countryIndex=0;
var populationIndex=0;
var gdpIndex=0;
var parityIndex=0;
var populationArray = [];
var gdpArray = [];
var purchasingPowerArray = [];
var parity2010Index=0;
var purchasegrowthArray=[];
var populationGrowthArray=[];
//variable end
fs = require("fs");
csvData = fs.readFileSync('csv/country_details.csv');
stringData=csvData.toString();
lines = stringData.split('\r\n');//splitting the new line character
//Getting the no of column
noOfCols = lines.length; //23
headerlength = lines[0].split(",").length; 

for( var i = 0; i < noOfCols; i++ )
 {
      var line = lines[i];
          if( line != null && line != '' && line.length != 0 )
           {
               noOfRows ++;
               var data = line.split( "," );
               jsonArray.push( data );// storing final data in processedData Array
           }
 }

// Reading header from jsonArray
for (var i = 0; i < headerlength; i++) 
  {
      header[i]=jsonArray[0][i].split(",");
  }

//Reading first column from JsonArray
for (var i = 0; i < jsonArray.length; i++)
  {
     firstColumn[i]=jsonArray[i][0].split(",");
  }

//Reading header content and storing in Index
for (var m = 0; m < header.length; m++) 
{
  if (header[m]=="Country") {
    countryIndex=m;
  }
  if (header[m]=="Population2013") {
    populationIndex=m;
  }
  if (header[m]=="GDP2013") {
    gdpIndex=m;
  }
  if(header[m]=="PPP2013"){
    parityIndex=m;
  }
  if (header[m]=="PPP2010") {
    parity2010Index=m;
  }
  if (header[m]=="Population2010") {
    population2010Index=m;
  }
}

// JSON for Population by Country
jsonPopulation(jsonArray);
function jsonPopulation( jsonArray ) 
{
  var jsonArrayLenght = jsonArray.length;
  for (var i = 1; i < jsonArrayLenght; i++) 
  {
    if(firstColumn[i] != "World" )
      { 
        if (firstColumn[i]!="European Union")
         {
           populationArray[i-1] = {country : jsonArray[i][countryIndex], population2013 : jsonArray[i][populationIndex] };
         }
       }
  }//for loop end
  //creating json file from population Array
  fs.writeFile(process.cwd() + "/json/Population.json", JSON.stringify(populationArray,undefined, 2), function (err) 
      {
       if (err) throw err;
      console.log('Population JSON file has been successfully created');
      });
} //jsonpopulation function enc
  
// JSON for GDP by Country in 2013
jsonGDP(jsonArray);
function jsonGDP( jsonArray )
 {
  var noOfRows = jsonArray.length;
  for (var i = 1; i < noOfRows; i++)
   {
    if(firstColumn[i] != "World" )
      { 
        if (firstColumn[i]!="European Union")
         {
            gdpArray[i-1] = { country : jsonArray[i][countryIndex], GDP2013 : jsonArray[i][gdpIndex] };
         }
       }//for loop end
   }
  //creating json file from GDP 2013
  fs.writeFile(process.cwd() + "/json/GDP.json", JSON.stringify(gdpArray,undefined, 2), function (err)
   {
    if (err) throw err;
    console.log('GDP JSON file has been successfully created');
   });
 }

// JSON for Pruchasing Power by country in 2013
jsonPurchasingPower(jsonArray);
function jsonPurchasingPower( jsonArray )
 {
  var noOfRows = jsonArray.length;
  for (var i = 1; i < noOfRows; i++)
   {
      if(firstColumn[i] != "World" )
      { 
        if (firstColumn[i]!="European Union")
         {
            purchasingPowerArray[i-1] = { country : jsonArray[i][countryIndex], PurchasingPower2013 : jsonArray[i][parityIndex] };

         }
       }
   }//for loop end
   //creating Json file for Purchasing Power 2013
  fs.writeFile(process.cwd() + "/json/PurchasingPower.json", JSON.stringify(purchasingPowerArray,undefined, 2), function (err)
   {
    if (err) throw err;
    console.log('Purchasing Power JSON file has been successfully created');
  });
 }

 //Json for Purchasing growth from 2010 to 2013
 jsonPurchaseGrowth(jsonArray);
function jsonPurchaseGrowth( jsonArray )
 {
  var noOfRows = jsonArray.length;
  for (var i = 1; i < noOfRows; i++)
   {      
      purchasegrowthArray[i-1] = { country : jsonArray[i][countryIndex], GrowthFrom2010to2013 : jsonArray[i][parityIndex]-jsonArray[i][parity2010Index] };
     
       
   }//for loop end
   //creating Json file for Purchasing Power 2013
  fs.writeFile(process.cwd() + "/json/PurchasingGrowth.json", JSON.stringify(purchasegrowthArray,undefined, 2), function (err)
   {
    if (err) throw err;
    console.log('Purchasing Growth JSON file has been successfully created');
  });
 }

// Json for Population Growth from 2010 to 2013
jsonPopulationgrowth(jsonArray);
function jsonPopulationgrowth( jsonArray )
 {
  var noOfRows = jsonArray.length;
  for (var i = 1; i < noOfRows; i++)
   {      
      populationGrowthArray[i-1] = { country : jsonArray[i][countryIndex], PopulationFrom2010to2013 : jsonArray[i][populationIndex]-jsonArray[i][population2010Index] };
     
       
   }//for loop end
   //creating Json file for Purchasing Power 2013
  fs.writeFile(process.cwd() + "/json/PopulationGrowth.json", JSON.stringify(populationGrowthArray,undefined, 2), function (err)
   {
    if (err) throw err;
    console.log('Purchasing Growth JSON file has been successfully created');
  });
 }

//Json for aggregate for population continent wise
var m=0;
var europeanCountries=[];
var populationCountries=[];
var continent = {
    Asia : { continentName : "Asia", country : ["India","China","Indonesia","Japan","Russia","Saudi Arabia","Republic of Korea","Turkey" ] },
    Europe : {continentName : "Europe", country : [ "Germany","France","Italy" ,"United Kingdom"] },
    SouthAmerica: { continentName:"SouthAmerica", country:[ "Argentina","Brazil"]},
    NorthAmerica: { continentName:"NorthAmerica", country:[ "Canada","Mexico", "USA"]},
    Australia:{continentName:"Australia",country:["Australia"]},
    Africa:{continentName:"Africa",country:["South Africa"]}

};/*
console.log(continent.Asia.country[0] );
console.log(continent.Europe.country[0] ); 
console.log(continent.Europe.country.length);
console.log(firstColumn); */
var sum=0;
var popcount=0;
var m=0;
for (var i = 0; i < continent.Europe.country.length; i++) {
  while(m<firstColumn.length){
   if(firstColumn[m]==continent.Europe.country[i]){
     // europeanCountries.push(continent.Europe.continentName);
      sum=sum+parseFloat(jsonArray[m][gdpIndex]);
      popcount=popcount+parseFloat(jsonArray[m][populationIndex]);

  }m++;
}m=0;

  }
  europeanCountries.push(continent.Europe.continentName);
europeanCountries.push(sum);
populationCountries.push(continent.Europe.continentName);
populationCountries.push(popcount);


 sum=0;
 popcount=0;
 m=0;
for (var i = 0; i < continent.Asia.country.length; i++) {
  while(m<firstColumn.length){
   if(firstColumn[m]==continent.Asia.country[i]){
     // europeanCountries.push(continent.Europe.continentName);
     sum=sum+parseFloat(jsonArray[m][gdpIndex]);
      popcount=popcount+parseFloat(jsonArray[m][populationIndex]);


  }m++;
}m=0;

  }
  europeanCountries.push(continent.Asia.continentName);
europeanCountries.push(sum);
populationCountries.push(continent.Asia.continentName);
populationCountries.push(popcount);

  sum=0;
  m=0;
  popcount=0;
for (var i = 0; i < continent.NorthAmerica.country.length; i++) {
  while(m<firstColumn.length){
   if(firstColumn[m]==continent.NorthAmerica.country[i]){
     // europeanCountries.push(continent.Europe.continentName);
      sum=sum+parseFloat(jsonArray[m][gdpIndex]);
        popcount=popcount+parseFloat(jsonArray[m][populationIndex]);

  }m++;
}m=0;

  }
europeanCountries.push(continent.NorthAmerica.continentName);
europeanCountries.push(sum);
populationCountries.push(continent.NorthAmerica.continentName);
populationCountries.push(popcount);

 sum=0;
 m=0;
 popcount=0;
for (var i = 0; i < continent.SouthAmerica.country.length; i++) {
  while(m<firstColumn.length){
   if(firstColumn[m]==continent.SouthAmerica.country[i]){
     // europeanCountries.push(continent.Europe.continentName);
     sum=sum+parseFloat(jsonArray[m][gdpIndex]);
      popcount=popcount+parseFloat(jsonArray[m][populationIndex]);

  }m++;
}m=0;

  }
europeanCountries.push(continent.SouthAmerica.continentName);
europeanCountries.push(sum);
populationCountries.push(continent.SouthAmerica.continentName);
populationCountries.push(popcount);

sum=0;
popcount=0;
m=0;
for (var i = 0; i < continent.Australia.country.length; i++) {
  while(m<firstColumn.length){
   if(firstColumn[m]==continent.Australia.country[i]){
     // europeanCountries.push(continent.Europe.continentName);
     sum=sum+parseFloat(jsonArray[m][gdpIndex]);
      popcount=popcount+parseFloat(jsonArray[m][populationIndex]);

  }m++;
}m=0;

  }
  europeanCountries.push(continent.Australia.continentName);
europeanCountries.push(sum);
populationCountries.push(continent.Australia.continentName);
populationCountries.push(popcount);

sum=0;
m=0;
popcount=0;
for (var i = 0; i < continent.Africa.country.length; i++) {
  while(m<firstColumn.length){
   if(firstColumn[m]==continent.Africa.country[i]){
     // europeanCountries.push(continent.Europe.continentName);
     sum=sum+parseFloat(jsonArray[m][gdpIndex]);
      popcount=popcount+parseFloat(jsonArray[m][populationIndex]);

  }m++;
}m=0;

  }
  europeanCountries.push(continent.Africa.continentName);
europeanCountries.push(sum);
populationCountries.push(continent.Africa.continentName);
populationCountries.push(popcount);

var d=0;
  console.log(europeanCountries); 
  console.log(europeanCountries.length);
  var aggregateGDPArray=[];

  aggregateGDP(europeanCountries);
  
  //Problem in function
  function aggregateGDP( europeanCountries)
  { 
      for (var i = 0; i < europeanCountries.length-1; i=i+2)
   {      
      aggregateGDPArray[d] = { continents : europeanCountries[i], aggregateGDPof2013 : europeanCountries[i+1]};
     d++;
       
   }
   fs.writeFile(process.cwd() + "/json/GDPAggregate.json", JSON.stringify(aggregateGDPArray,undefined, 2), function (err)
   {
    if (err) throw err;
    console.log('aggregateGDP JSON file has been successfully created');
  });

  }
  

  // aggreagate population of continents
  var aggregatePopulationArray=[];
 d=0;
  aggregatepop(populationCountries);
 
  function aggregatepop( populationCountries)
  { 
      for (var i = 0; i < populationCountries.length-1; i=i+2)
   {      
      aggregatePopulationArray[d] = { continents : populationCountries[i], aggregateGDPof2013 : populationCountries[i+1]};
     d++;
       
   }
   fs.writeFile(process.cwd() + "/json/PopulationAggregate.json", JSON.stringify(aggregatePopulationArray,undefined, 2), function (err)
   {
    if (err) throw err;
    console.log('aggregate Population JSON file has been successfully created');
  });

  }
