const fs = require('fs');
var generator_core = require('./generator_core.js');


try {
    const jsonString = fs.readFileSync('./' + process.argv[2]);
    const jsonParse = JSON.parse(jsonString);
    var result =  generator_core(jsonParse);
    var string = '';
    for (var i = 0; i < result.length; ++i) {
        string += result[i] + '\n';
    }
    console.log(string);
}
catch(err) {
    console.log(err);
}