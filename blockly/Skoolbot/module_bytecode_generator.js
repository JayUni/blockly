module.exports = function (jsonList) {
    return bytecode_generator(jsonList);
};


// initialize global variable
var commandMap = {
    'command':{
        'print': '0x01',
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
        'remainder': '0x0f',
        'constrain': '0x10',
        'randomInt': '0x11',
        'cmpe': '0x12',
        'cmpne': '0x13',
        'cmpl': '0x14',
        'cmple': '0x15',
        'cmpg': '0x16',
        'cmpge': '0x17'
    },
    'single_value':{
        'boolean': '0x30',
        'set': '0x31',
        'get': '0x32',
        'number': '0x33',
        'JUMPZ': '0x34',
        'JUMP': '0x35'
    },
    'label':{
        'L0': '0x40', // destination of jump
        'L1': '0x41' // destination of jump
    }
};

function bytecode_generator(commandList) {
    var resultList = [];
    var command = '';
    var value = '';
    var index = {};

    for (var i in commandList){
        command = commandList[i].split(' ')[0];

        if(command.split('_')[0] === 'L0' || command.split('_')[0] === 'L1'){
            index[command] = i;
        }
    }
    console.log('index: ', index);

    for (var j in commandList){
        command = commandList[j].split(' ')[0];
        if (commandList[j].split(' ')[1]){
            value = commandList[j].split(' ')[1];
            console.log(value);
        }

        resultList.push(commandList[j] + '            ' + getCommandByteCode(command, commandMap) + processValue(value, index));
        // resultList.push(getCommandByteCode(command, commandMap) + processValue(value, index));

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

}

function processValue(value, index){
    if(parseInt(value)){
        if (value < 0)
        {
            value = 0xFFFFFFFF + value + 1;
        }

        var numberStr = value.toString(16);

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
                return ' 0x01';
            case 'FALSE':
                return ' 0x00';
        }


    }
    else if(value.split('_')[0] === 'L0' || value.split('_')[0] === 'L1'){
        return ' 0x' + index[value].toString(16).toUpperCase();
    }
    else{
        return ' ' + value;
    }
}

// For debugging


// var str0 = JSON.parse(`[{"block_name":"controls_statement_ifelse","structure":[{"block_name":"controls_statement_if","statements":"if","condition":{"block_name":"logic_boolean_operator_compare","operator":"cmpl","argument":[{"block_name":"math_number_number","number":"1"},{"block_name":"math_number_number","number":"2"}]},"branchCode":[{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"logic_boolean_boolean","value":"TRUE"}]}]},{"block_name":"controls_statement_else","statements":"else","branchCode":[{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"logic_boolean_boolean","value":"FALSE"}]}]}]}]
// `);

// const fs = require('fs');
// var generator_core = require('./module_command_generator.js');
// var add_type_field = require('./module_add_type_field.js');

// var str0 = JSON.parse(`[{"block_name":"variables_statement_set","functionName":"variables_set","varName":"a","argument":[{"block_name":"math_number_number","number":"15"}]},{"block_name":"controls_statement_ifelse","structure":[{"block_name":"controls_statement_if","statements":"if","condition":{"block_name":"logic_boolean_operator_compare","operator":"cmple","argument":[{"block_name":"variables_statement_get","functionName":"variables_get","varName":"a"},{"block_name":"math_number_number","number":"30"}]},"branchCode":[{"block_name":"controls_statement_ifelse","structure":[{"block_name":"controls_statement_if","statements":"if","condition":{"block_name":"logic_boolean_operator_compare","operator":"cmpg","argument":[{"block_name":"variables_statement_get","functionName":"variables_get","varName":"a"},{"block_name":"math_number_number","number":"6"}]},"branchCode":[{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"variables_statement_get","functionName":"variables_get","varName":"a"}]}]},{"block_name":"controls_statement_else","statements":"else","branchCode":[]}]}]},{"block_name":"controls_statement_else","statements":"else","branchCode":[{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"logic_boolean_boolean","value":"FALSE"}]}]}]}]
// `);
//
// for (var i = 0; i<1; i++){
//     var vars_name = 'str' + i;
//     add_type_field(eval(vars_name));
//     var commandList = generator_core(eval(vars_name));
//     console.log(generator_core(eval(vars_name)));
//     console.log(bytecode_generator(commandList));
//     // console.log("JSON_result: \n", JSON.stringify(eval(vars_name), null, 4));
//
//     console.log("\n\n#######################################\n\n")
// }
