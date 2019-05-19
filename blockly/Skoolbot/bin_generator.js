module.exports = function (jsonList) {
    return bin_generator(jsonList);
};


const fs = require('fs');

const CODE_SIZE = 1024;


function bin_generator(text_file) {
    generator(text_file);
}

function hexToBytes(hex) {
    return parseInt(hex.substr(2, 10), 16);
}

function generator(commands) {
    var resultList = [];
    commands = commands.split("\n");
    for (var i in commands){
        var row = commands[i].split(' ');
        for (var j in row){
            if(row[j] !== '' && row[j] !== undefined){
                resultList.push(hexToBytes(row[j]));
            }
        }
    }
    return resultList;

    // console.log(commands);
    // var reader = new window.FileReader();
    // reader.readAsArrayBuffer(commands);
    // reader.onload = function () {
    //     console.log(this.result);
    //     console.log(new Blob([this.result]))
    // }
}


function savetxt(path){

    fs.readFile(path, "utf8", function(err, commandList) {
        if (!err) {

            var reslist = generator(commandList);

            var bin_content = new Int8Array(CODE_SIZE);
            for (var j in reslist){
                bin_content[j] = reslist[j];
            }

            var savefile = path.split('/')[4].split('.')[0];
            fs.writeFileSync('../tests/nodejs/bin_generator_outputs/' + savefile + '.bin', Buffer.from(bin_content));

        }
        else{
            throw err;
        }
    });
}


function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = require('path').join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}


var path = '../tests/nodejs/hex_generator_outputs/';
travel(path, savetxt);
