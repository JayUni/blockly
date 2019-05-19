const fs = require('fs');

const BIN_SIZE = 1024;


// Get arguments
var arguments = process.argv.splice(2);
var input_path = arguments[0];
var file_name = arguments[1];


// Generate file_path and output_path
var file_path = input_path + file_name + '.txt';
var output_path = "../tests/nodejs/bin_generator_outputs/" + file_name + '.bin';


console.log('input_path: ', file_path, '\n', 'output_path: ', output_path);

function hexToBytes(hex) {
    return parseInt(hex.substr(2, 10), 16);
}

fs.readFile(file_path, "utf8", function (err, data) {
    if (!err) {

        var resultList = [];
        var commands = data.split("\n");
        for (var i in commands){
            var row = commands[i].split(' ');
            for (var j in row){
                if(row[j] !== '' && row[j] !== undefined){
                    resultList.push(hexToBytes(row[j]));
                }

            }

        }
        var bin_content = new Int8Array(BIN_SIZE);
        for (var j in resultList){
            bin_content[j] = resultList[j];
        }

        fs.writeFileSync(output_path, Buffer.from(bin_content));
    }
    else{
        throw err;
    }

});