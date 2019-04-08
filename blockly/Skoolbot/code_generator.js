var addTypeField = require('./addTypeField.js');
const fs = require('fs');


// global variable
var commandList = [];

function generator(jsonList){
    if (!hasChild(jsonList)[0]) {
        addCommand(jsonList);
    }
    return commandList;
}

function hasChild(jsonList) {
    var keys = [];
    var hasChild = false;
    for (var val of Object.values(jsonList)){
        if (val instanceof Object){
            generator(val);
            addCommand(jsonList);
            hasChild = true;
        }
    }
    return [hasChild, keys]
}

function addCommand(jsonList){
    for (var [key, val] of Object.entries(jsonList)) {

        // console.log(i, key, val);

        // for (var property in jsonList) {
        //     if (jsonList.hasOwnProperty(property)) {
        //         console.log(jsonList[property])
        //     }
        // }

        // console.log(JSON.stringify(jsonList[key])+ '\n');

        if (key === 'block_name' && val !== undefined) {
            var block_type = val.split('_')[0];
            var command = val.split('_')[2];
            switch (block_type) {
                case 'math':
                    switch (command) {
                        case 'operator':
                            commandList.push(jsonList.operator);
                            break;
                        case 'number':
                            commandList.push(jsonList.valueType + ' ' + jsonList.number);
                            break;
                        case 'numberProperty':
                            commandList.push(jsonList.functionName);
                            break;
                        case 'constant':
                            commandList.push(command + ' ' + jsonList.value);
                            break;
                        case 'function':
                            commandList.push(jsonList.functionName);
                            break;
                        default:
                            commandList.push("ERROR, UNDEFINED");
                            break;
                    }
                    break;
                case 'logic':
                    switch(command){
                        case 'operator':
                            commandList.push(jsonList.operator);
                            break;
                        case 'boolean':
                            commandList.push(jsonList.valueType + ' ' + jsonList.value);
                            break;
                        case 'null':
                            commandList.push(jsonList.value);
                            break;
                        default:
                            commandList.push("ERROR, UNDEFINED");
                            break;
                    }


            }

        }
    }
}



// var str0 = JSON.parse(`[{"block_name":"logic_boolean_compare","operator":"cmple","argument":[{"block_name":"math_arithmetic_operator","operator":"sub","argument":[{"block_name":"math_number_number","number":"1"},{"block_name":"math_number_number","number":"2"}]},{"block_name":"math_number_number","number":"5"}]}]
// `);
// var str1 = JSON.parse(`[{"block_name":"math_arithmetic_operator","operator":"add","argument":[{"block_name":"math_arithmetic_operator","operator":"add","argument":[{"block_name":"math_number_number","number":"2"},{"block_name":"math_number_number","number":"1"}]},{"block_name":"math_number_number","number":"5"}]}]
// `);
// var str2 = JSON.parse(`[{"block_name":"math_number_operator","operator":"sqrt","argument":[{"block_name":"math_number_number","number":"9"}]},{"block_name":"math_number_operator","operator":"abs","argument":[{"block_name":"math_number_number","number":"9"}]},{"block_name":"math_number_single","operator":"neg","argument":[{"block_name":"math_number_number","number":"9"}]},{"block_name":"math_number_single","operator":"ln","argument":[{"block_name":"math_number_number","number":"9"}]},{"block_name":"math_number_single","operator":"log10","argument":[{"block_name":"math_number_number","number":"9"}]},{"block_name":"math_number_single","operator":"exp","argument":[{"block_name":"math_number_number","number":"9"}]},{"block_name":"math_number_single","operator":"pow10","argument":[{"block_name":"math_number_number","number":"9"}]}]
// `);
// var str3 = JSON.parse(`[{"block_name":"math_number_operator","operator":"SIN","argument":[{"block_name":"math_number_number","number":"45"}]}]
// `);
// var str4 = JSON.parse(`[{"block_name":"math_arithmetic_operator","operator":"div","argument":[{"block_name":"math_arithmetic_operator","operator":"add","argument":[{"block_name":"math_number_number","number":"1"},{"block_name":"math_number_sqrt","operator":"sqrt","argument":[{"block_name":"math_number_number","number":"5"}]}]},{"block_name":"math_number_number","number":"2"}]}]
// `);
// var str5 = JSON.parse(`[{"block_name":"math_number_operator","operator":"ROUND","argument":[{"block_name":"math_number_number","number":"3.1"}]}]
// `);
// var str6 = JSON.parse(`[{"block_name":"math_boolean_numberProperty","functionName":"isEven","argument":[{"block_name":"math_number_number","number":"0"}]}]
// `);
// var str7 = JSON.parse(`[{"block_name":"logic_boolean_logicOperation","operator":"or","argument":[{"block_name":"logic_boolean_boolean","value":"TRUE"},{"block_name":"logic_boolean_boolean","value":"FALSE"}]}]
// `);
// var str8 = JSON.parse(`[{"block_name":"math_number_operator_single","operator":"sin","argument":[{"block_name":"math_number_number","number":"45"}]},{"block_name":"math_number_operator_single","operator":"cos","argument":[{"block_name":"math_number_number","number":"45"}]},{"block_name":"math_number_operator_single","operator":"tan","argument":[{"block_name":"math_number_number","number":"45"}]},{"block_name":"math_number_operator_single","operator":"asin","argument":[{"block_name":"math_number_number","number":"45"}]},{"block_name":"math_number_operator_single","operator":"acos","argument":[{"block_name":"math_number_number","number":"45"}]},{"block_name":"math_number_operator_single","operator":"atan","argument":[{"block_name":"math_number_number","number":"45"}]}]
// `);





// var str0 = JSON.parse(`[{"block_name":"math_number_operator_modulo","operator":"%","argument":[{"block_name":"math_number_number","number":"64"},{"block_name":"math_arithmetic_operator","operator":"sub","argument":[{"block_name":"math_number_number","number":"5"},{"block_name":"math_number_number","number":"2"}]}]}]
// `);
// var str1 = JSON.parse(`[{"block_name":"math_arithmetic_operator","operator":"pow","argument":[{"block_name":"math_arithmetic_operator","operator":"mul","argument":[{"block_name":"math_number_operator_single","operator":"acos","argument":[{"block_name":"math_number_number","number":"60"}]},{"block_name":"math_number_operator_single","operator":"log10","argument":[{"block_name":"math_number_number","number":"9"}]}]},{"block_name":"math_number_number","number":"2"}]}]
// `);
// var str2 = JSON.parse(`[{"block_name":"math_arithmetic_operator","operator":"sub","argument":[{"block_name":"math_arithmetic_operator","operator":"mul","argument":[{"block_name":"math_number_number_constant","number":"PI"},{"block_name":"math_number_operator_single","operator":"sqrt","argument":[{"block_name":"math_number_number","number":"9"}]}]},{"block_name":"math_number_operator_single","operator":"round","argument":[{"block_name":"math_number_number","number":"3.1"}]}]}]
// `);
// var str3 = JSON.parse(`[{"block_name":"logic_boolean_operator_compare","operator":"cmpg","argument":[{"block_name":"math_number_operator_single","operator":"exp","argument":[{"block_name":"math_number_number","number":"2"}]},{"block_name":"math_number_operator_single","operator":"tan","argument":[{"block_name":"math_number_function_randomInt","functionName":"randomInt","argument":[{"block_name":"math_number_number","number":"1"},{"block_name":"math_number_number","number":"100"}]}]}]}]
// `);
// var str4 = JSON.parse(`[{"block_name":"math_number_operator_constrain","operator":"constrain","argument":[{"block_name":"math_number_number","number":"50"},{"block_name":"math_number_number","number":"1"},{"block_name":"math_number_operator_single","operator":"round","argument":[{"block_name":"math_number_operator_single","operator":"sqrt","argument":[{"block_name":"math_number_number","number":"15"}]}]}]}]
// `);


// for (var i =0; i<5; i++){
//     var vars_name = 'str' + i;
//     commandList = [];
//     addTypeField.addTypeField(eval(vars_name));
//     console.log("JSON: \n", JSON.stringify(eval(vars_name), null, 4));
//     console.log(generator(eval(vars_name)));
//
//     console.log("\n\n#######################################\n\n")
// }


function savetxt(i){
    var path = '../tests/nodejs/generator_test_jsons/math_test' + (i+1).toString() + '.json';

    fs.readFile(path, "utf8", function(err, jsondata) {
        if (!err) {
            jsondata = JSON.parse(jsondata);
            addTypeField.addTypeField(jsondata);
            commandList = [];
            var reslist = generator(jsondata);
            console.log(reslist);
            var restxt = "";
            for (var j in reslist){
                restxt += reslist[j] + '\n';
            }

            fs.writeFile('./output/result' + (i+1).toString() + '.txt', restxt, (err) => {
                if (err) throw err;
                console.log('It\'s saved!');
            });
        }
        else{
            throw err;
        }
    });
}


for (var i = 0; i < 5; i++){
    savetxt(i);
}