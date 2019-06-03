const fs = require('fs');
var command_generator = require('./module_command_generator.js');


try {
    const jsonString = fs.readFileSync('./' + process.argv[2]);
    const jsonParse = JSON.parse(jsonString);
    var result =  command_generator(jsonParse);
    var string = '';
    for (var i = 0; i < result.length; ++i) {
        string += result[i] + '\n';
    }
    console.log(string);
}
catch(err) {
    console.log(err);
}
