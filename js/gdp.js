var fs = require("fs");
var csvData = fs.readFileSync("csv/data.csv");
var stringData=csvData.toString();
var dataArray= stringData.split('\n');
var header=dataArray[0].split(',');
var rowsLength=dataArray.length;
var colsLength=header.length;
var jsonArray=new Array();
var i=0,j=0;
for (i = 1; i < rowsLength-1; i++){
var obj = {};
var temp,columnIndex;
   var newLine=dataArray[i].split(',');
  var nextLine=dataArray[i+1].split(',');
   var newLine=dataArray[i].split(',');
    if(newLine[0] !="European Union" && newLine[0] !="World"){
      for (j = 0; j< colsLength; j++)
      {
        if(header[j]== "PP2013" || header[j]=="CountryName"){
          var headerText = header[j];
          var valueText = newLine[j];
          if(valueText !=null && valueText !=""){
              obj[headerText] = valueText;
          }

        }

      };
    }
    console.log(obj);
    jsonArray.push(obj);

  //console.log(jsonArray);
};
fs.writeFile(process.cwd()+"/json/pp2013.json", JSON.stringify(jsonArray,undefined, 1), function (err) {
if (err) throw err;
console.log('Done');
});
