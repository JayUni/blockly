const fs = require('fs');
var generator_core = require('./generator_core.js');
var add_type_field = require('./type_field_core.js');


function bytecode_generator(commandList) {
    let resultList = [];

    for (let i in commandList){
        let command = commandList[i].split(' ')[0];
        let value = '';
        console.log(command);
        switch (command){
            case 'number':
                value = commandList[i].split(' ')[1];
                resultList.push(getCommandByteCode(command) + ' ' + value);
                break;
        }
    }




    return resultList;
}


var commandMap = {
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
    // remainder
    // constrain
    // randomInt
    // cmpe, cmpne, cmpl, cmple, cmpg, cmpge
    // TRUE, FALSE
    // get,set
    // number,
    // JUMPZ
    // JUMP

};

function getCommandByteCode(command){
    var commandMap = {
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
        // remainder
        // constrain
        // randomInt
        // cmpe, cmpne, cmpl, cmple, cmpg, cmpge
        // TRUE, FALSE
        // get,set
        // number,
        // JUMPZ
        // JUMP

    };
    for (let [key, val] of Object.entries(commandMap)){
        if (key === command){
            return val;
        }
    }
}

// For debugging


var str0 = JSON.parse(`[{"block_name":"controls_statement_ifelse","structure":[{"block_name":"controls_statement_if","statements":"if","condition":{"block_name":"logic_boolean_operator_compare","operator":"cmpl","argument":[{"block_name":"math_number_number","number":"1"},{"block_name":"math_number_number","number":"2"}]},"branchCode":[{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"logic_boolean_boolean","value":"TRUE"}]}]},{"block_name":"controls_statement_else","statements":"else","branchCode":[{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"logic_boolean_boolean","value":"FALSE"}]}]}]}]
`);

for (var i = 0; i<1; i++){
    var vars_name = 'str' + i;
    add_type_field(eval(vars_name));
    var commandList = generator_core(eval(vars_name));
    console.log(generator_core(eval(vars_name)));
    console.log(bytecode_generator(commandList));
    // console.log("JSON_result: \n", JSON.stringify(eval(vars_name), null, 4));

    console.log("\n\n#######################################\n\n")
}
