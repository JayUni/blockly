module.exports = function (jsonList) {
    return bytecode_generator(jsonList);
};


// #define NOP 0x0000
// #define NUMBER 0x0001
// #define ADD 0x0002
// #define SUB 0x0003
// #define MUL 0x0004
// #define DIV 0x0005
// #define POW 0x0006
// #define ABS 0x0007
// #define NEG 0x0008
// #define ISEVEN 0x0009
// #define ISODD 0x000a
// #define ISPOSITIVE 0x000b
// #define ISNEGATIVE 0x000c
// #define ISDIVISBLEBY 0x000d
// #define REMAINDER 0x000e
// #define CONSTRAIN 0x000f
// #define RANDOMINT 0x0010
// #define COMPE 0x0011
// #define COMPNE 0x0012
// #define COMPL 0x0013
// #define COMPLE 0x0014
// #define CMPG 0x0015
// #define CMPGE 0x0016
// #define TRUE  0x0017
// #define FALSE 0x0018
// #define NEGATE 0x0019
// #define NULL 0x001a
// #define GET 0x001b
// #define SET 0x001c
// #define JUMPZ 0x001d
// #define JUMP 0x001e
// #define PRINT 0x001f
// #define BOOLEAN 0x0020

// initialize global variable
var commandMap = {
    'command':{
        'print': '0x1f',
        'add': '0x02',
        'sub': '0x03',
        'mul': '0x04',
        'div': '0x05',
        'pow': '0x06',
        'abs': '0x07',
        'neg': '0x08',
        'isEven': '0x09',
        'isOdd': '0x0a',
        'isPositive': '0x0b',
        'isNegative': '0x0c',
        'isDivisibleBy': '0x0d',
        'remainder': '0x0e',
        'constrain': '0x0f',
        'randomInt': '0x10',
        'cmpe': '0x11',
        'cmpne': '0x12',
        'cmpl': '0x13',
        'cmple': '0x14',
        'cmpg': '0x15',
        'cmpge': '0x16',
        'negate': '0x19',
        'null': '0x1a'
    },
    'single_value':{
        'boolean': '0x20',
        'set': '0x1c',
        'get': '0x1b',
        'number': '0x01',
        'JUMPZ': '0x1d',
        'JUMP': '0x1e'
    },
    'label':{
        'L0': '0x00', // destination of jump, nothing to do
        'L1': '0x00' // destination of jump, nothing to do
    }
};


function bytecode_generator(commands) {
    commands = commands.split("\n");

    var resultList = [];
    var command = '';
    var value = '';
    var index = {};
    for (var i in commands){
        command = commands[i].split(' ')[0];

        if(command.split('_')[0] === 'L0' || command.split('_')[0] === 'L1'){
            index[command] = i;
        }
    }
    // console.log('index: ', index);

    for (var j in commands){
        if (commands[j] !='' || commands[j] !== undefined){
            command = commands[j].split(' ')[0];
            value = '';
            if (commands[j].split(' ')[1]){
                value = commands[j].split(' ')[1];
            }

            // resultList.push(getCommandByteCode(command, commandMap) + processValue(value, index));

            console.log(getCommandByteCode(command, commandMap) + processValue(value, index)); //

        }
    }

    return resultList;
}



function getCommandByteCode(command, commandMap){

    if (commandMap.command[command]){
        for (var [key, val] of Object.entries(commandMap.command)){
            if (key === command){
                return val;
            }
        }
    }
    else if(commandMap.single_value[command]){
        for (var [key, val] of Object.entries(commandMap.single_value)){
            if (key === command){
                return val;
            }
        }
    }
    else if(command.split('_')[0] === 'L0' || command.split('_')[0] === 'L1'){
        return commandMap.label[command.split('_')[0]];
    }
    else if(command == ''){
        return '';
    }

}

function processValue(value, index){
    if(parseInt(value)){

        var numberStr = parseInt(value).toString(16);

        var len = numberStr.length;
        if(len <= 4){
            for (var i = 0; i < (4 - len); i++){
                numberStr = '0' + numberStr;
            }
            // return ' 0x' + numberStr;
            var high_byte = numberStr.substring(0, 2);
            var low_byte = numberStr.substring(2, 4);

            return ' 0x' + low_byte + ' 0x' + high_byte;
        }
        return 'out of range';

    }
    else if(value === 'TRUE'|| value === 'FALSE'){
        switch (value){
            case 'TRUE':
                return ' 0x17';
            case 'FALSE':
                return ' 0x18';
        }


    }
    else if(value.split('_')[0] === 'L0' || value.split('_')[0] === 'L1'){
        var val = parseInt(index[value]).toString(16);
        var val_len = val.length;
        if(val_len <= 4){
            for (var i = 0; i < (4 - val_len); i++){
                val = '0' + val;
            }
            var high_byte = val.substring(0, 2);
            var low_byte = val.substring(2, 4);

            return ' 0x' + low_byte + ' 0x' + high_byte;

        }
        return ' 0x' + parseInt(index[value]).toString(16);
    }
    else if(value !== ''){
        return ' ' + value;
    }
    else {
        return '';
    }
}

// For debugging


//
//
// var generator_core = require('./module_command_generator.js');
// var add_type_field = require('./module_add_type_field.js');

// var str0 = JSON.parse(`[{"block_name":"controls_statement_ifelse","structure":[{"block_name":"controls_statement_if","statements":"if","condition":{"block_name":"logic_boolean_operator_compare","operator":"cmpl","argument":[{"block_name":"math_number_number","number":"1"},{"block_name":"math_number_number","number":"2"}]},"branchCode":[{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"logic_boolean_boolean","value":"TRUE"}]}]},{"block_name":"controls_statement_else","statements":"else","branchCode":[{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"logic_boolean_boolean","value":"FALSE"}]}]}]}]
// `);
// var str1 = JSON.parse(`[{"block_name":"variables_statement_set","functionName":"variables_set","varName":"a","argument":[{"block_name":"math_number_number","number":"15"}]},{"block_name":"controls_statement_ifelse","structure":[{"block_name":"controls_statement_if","statements":"if","condition":{"block_name":"logic_boolean_operator_compare","operator":"cmple","argument":[{"block_name":"variables_statement_get","functionName":"variables_get","varName":"a"},{"block_name":"math_number_number","number":"30"}]},"branchCode":[{"block_name":"controls_statement_ifelse","structure":[{"block_name":"controls_statement_if","statements":"if","condition":{"block_name":"logic_boolean_operator_compare","operator":"cmpg","argument":[{"block_name":"variables_statement_get","functionName":"variables_get","varName":"a"},{"block_name":"math_number_number","number":"6"}]},"branchCode":[{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"variables_statement_get","functionName":"variables_get","varName":"a"}]}]},{"block_name":"controls_statement_else","statements":"else","branchCode":[]}]}]},{"block_name":"controls_statement_else","statements":"else","branchCode":[{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"logic_boolean_boolean","value":"FALSE"}]}]}]}]
// `);
//
// for (var i = 0; i<2; i++){
//     var vars_name = 'str' + i;
//     console.log(bytecode_generator(generator_core(add_type_field(eval(vars_name)))));
//     // console.log("JSON_result: \n", JSON.stringify(eval(vars_name), null, 4));
//     console.log("\n\n#######################################\n\n")
// }




// // save as text file
// const fs = require('fs');
//
//
// function savetxt(path){
//
//     fs.readFile(path, "utf8", function(err, commandList) {
//         if (!err) {
//             // commandList = commandList.split("\n");
//             var reslist = bytecode_generator(commandList);
//
//             var restxt = '';
//             for (var j in reslist){
//                 restxt += reslist[j] + '\n';
//             }
//             var savefile = path.split('/')[4].split('.')[0];
//             fs.writeFile('../tests/nodejs/bytecode_generator_outputs/' + savefile + '.txt', restxt, (err) => {
//                 if (err) throw err;
//                 console.log('output is saved successfully!');
//             });
//         }
//         else{
//             throw err;
//         }
//     });
// }
//
//
// function travel(dir, callback) {
//     fs.readdirSync(dir).forEach(function (file) {
//         var pathname = require('path').join(dir, file);
//
//         if (fs.statSync(pathname).isDirectory()) {
//             travel(pathname, callback);
//         } else {
//             callback(pathname);
//         }
//     });
// }
//
//
// var path = '../tests/nodejs/generatorToInterpreter_test_cases/';
// travel(path, savetxt);