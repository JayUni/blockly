const fs = require('fs');

var bytecode_generator = require('./module_bytecode_generator.js');


const BIN_SIZE = 1024;

// Get arguments
var arguments = process.argv.splice(2);
// var input_path = arguments[0];
var file_name = arguments[0];


// Generate file_path and output_path
var input_path = "../tests/nodejs/symbolic_generator_outputs/" + file_name + '.txt';

var output_path_hex = "../tests/nodejs/hex_generator_outputs/" + file_name + '.txt';

var output_path_bin = "../tests/nodejs/bin_generator_outputs/" + file_name + '.bin';


// console.log('input_path: ', input_path, '\n', 'output_path_hex: ', output_path_hex, '\n', 'output_path_bin: ', output_path_bin);



try{

    var data = fs.readFileSync(input_path, "utf8");

    var reslist = bytecode_generator(data);

    var restxt = '';
    for (var j in reslist){
        restxt += reslist[j] + '\n';
    }

    var hextext = fs.writeFileSync(output_path_hex, restxt);

    var runcode = hextext;

}
catch(err) {
    console.log(err);
}



try{
    var hex = fs.readFileSync(output_path_hex, "utf8");


    var resultList = [];
    var commands = hex.split("\n");
    for (var i in commands){
        var row = commands[i].split(' ');
        for (var j in row){
            if(row[j] !== '' && row[j] !== undefined){
                resultList.push(parseInt(row[j].substr(2, 2), 16));
            }
        }

    }
    var bin_content = new Int8Array(BIN_SIZE);
    for (var j in resultList){
        bin_content[j] = resultList[j];
    }
    // console.log(bin_content);
    var bintext = fs.writeFileSync(output_path_bin, Buffer.from(bin_content));

    var runcode2 = bintext;
}
catch(err) {
    console.log(err);
}
