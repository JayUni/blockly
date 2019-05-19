const fs = require('fs');

const BIN_SIZE = 1024;

var arguments = process.argv.splice(2);

var input_path = arguments[0];
var output_path = arguments[1];


console.log('input_path: ', input_path, '\n', 'output_path: ', output_path);

function hexToBytes(hex) {
    return parseInt(hex.substr(2, 10), 16);
}

fs.readFile(input_path, "utf8", function (err, data) {
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