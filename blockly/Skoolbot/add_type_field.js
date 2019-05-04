const fs = require('fs');
var type_field = require('./type_field_core.js');


try {
  const jsonString = fs.readFileSync('./' + process.argv[2]);
  const jsonParse = JSON.parse(jsonString)
  var result =  type_field(jsonParse);
  console.log(JSON.stringify(result, null, 4));
}
catch(err) {
  console.log(err);
}
