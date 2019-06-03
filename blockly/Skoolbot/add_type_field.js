const fs = require('fs');
var add_type_field = require('./module_add_type_field.js');


try {
  const jsonString = fs.readFileSync('./' + process.argv[2]);
  const jsonParse = JSON.parse(jsonString)
  var result =  add_type_field(jsonParse);
  console.log(JSON.stringify(result, null, 4));
}
catch(err) {
  console.log(err);
}
