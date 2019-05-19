const fs = require('fs');
var bytecode_generator = require('./module_bytecode_generator.js');


try {
    const jsonString = fs.readFileSync('./' + process.argv[2]);
    const jsonParse = JSON.parse(jsonString);
    var result =  bytecode_generator(jsonParse);
    var string = '';
    for (var i = 0; i < result.length; ++i) {
        string += result[i] + '\n';
    }
    // console.log(string);
}
catch(err) {
    console.log(err);
}
