var addTypeField = require('./addTypeField.js');
const fs = require('fs');



// global variable
var commandList = [];
var L0 = 0;
var L1 = 0;


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
            addCommand(jsonList);// This statement runs more than one time
            hasChild = true;
        }
        else{
            addLabel(jsonList);
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
                            commandList.push(command + ' ' + jsonList.number);
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
                    break;
                case 'variables':
                    switch(command){
                        case 'set':
                            commandList.push('set ' + jsonList.varName);
                            break;
                        case 'get':
                            commandList.push('get ' + jsonList.varName);
                            break;
                    }
                    break;
                case 'text':
                    switch(command){
                        case 'text':
                            commandList.push(jsonList.valueType + ' ' + jsonList.text);
                            break;
                        case 'print':
                            commandList.push('print');
                            break;

                    }
                    break;
                case 'controls':
                    switch(command){
                        case 'if':

                            console.log(jsonList.statements);
                            if(jsonList.statements === 'if'){
                                commandList.push('JUMPZ L0_' + jsonList.label_0);

                                jsonList.statements = 'if_checked';
                            }
                            if(jsonList.statements ==='if_checked'){
                                jsonList.statements = 'if_branchCode';
                                break;
                            }
                            if(jsonList.statements ==='if_branchCode')
                                commandList.push('JUMP L1_' + jsonList.label_1);
                            commandList.push('L0_' + jsonList.label_0);



                            break;
                        case 'elseif':

                            console.log(jsonList.statements);
                            if(jsonList.statements === 'elseif'){
                                commandList.push('JUMPZ L0_' + jsonList.label_0);
                                jsonList.statements = 'if_checked';
                            }
                            if(jsonList.statements ==='if_checked'){
                                jsonList.statements = 'if_branchCode';
                                break;
                            }
                            if(jsonList.statements ==='if_branchCode'){
                                commandList.push('JUMP L1_' + jsonList.label_1);
                            }
                            commandList.push('L0_' + jsonList.label_0);


                            break;
                        case 'else':
                            console.log('else', jsonList.label_1);
                            commandList.push('L1_' + jsonList.label_1);
                            break;
                        case 'whileUntil':
                            if (jsonList.label === 'added'){
                                if(jsonList.end_type === 'until'){
                                    commandList.push('not');
                                }
                                commandList.push('JUMPZ L1_' + jsonList.label_0);
                                jsonList.label = 'conditionAdded';
                                break;
                            }
                            if (jsonList.label === 'conditionAdded'){
                                commandList.push('JUMP L0_' + jsonList.label_0);
                                commandList.push('L1_' + jsonList.label_1);
                            }
                            break;
                        case 'repeat':
                            if (jsonList.label === 'added'){
                                commandList.push('set repeat_control_variable');
                                jsonList.label = 'variableAdded';
                                break;
                            }
                            if (jsonList.label === 'variableAdded'){
                                commandList.push('get repeat_control_variable', 'number 1', 'sub', 'number 0', 'cmple');
                                commandList.push('JUMPZ L1_' + jsonList.label_0);
                                commandList.push('JUMP L0_' + jsonList.label_0);
                                commandList.push('L1_' + jsonList.label_1);
                            }
                            break;

                    }
                    break;

            }

        }
    }
}

function addLabel(jsonList) {
    for (var [key, val] of Object.entries(jsonList)) {
        if (key === 'block_name' && val !== undefined) {
            var block_type = val.split('_')[0];
            var command = val.split('_')[2];
            switch (block_type) {
                case 'controls':
                    switch(command){
                        case 'ifelse':
                            if (!jsonList.label){
                                var branch_num = jsonList.structure.length;

                                for (var i = 0; i < branch_num-1; i++) {
                                    jsonList.structure[i].label_0 = L0;
                                    jsonList.structure[i].label_1 = L1;
                                    L0 += 1;
                                    L1 += 1;
                                }
                                if(jsonList.structure[branch_num-1].block_name === 'controls_statement_else'){
                                    jsonList.structure[branch_num-1].label_0 = L0-1;
                                    jsonList.structure[branch_num-1].label_1 = L1-1;
                                }
                                jsonList.label = "added";



                            }
                            break;
                        case 'whileUntil':
                            switch(jsonList.end_type){
                                case 'while':
                                    if (!jsonList.label){
                                        jsonList.label_0 = L0;
                                        jsonList.label_1 = L1;
                                        L0 += 1;
                                        L1 += 1;
                                        jsonList.label = "added";
                                        commandList.push('L0_' + jsonList.label_0);
                                    }
                                    break;
                                case 'until':
                                    if (!jsonList.label){
                                        jsonList.label_0 = L0;
                                        jsonList.label_1 = L1;
                                        L0 += 1;
                                        L1 += 1;
                                        jsonList.label = "added";
                                        commandList.push('L0_' + jsonList.label_0);
                                    }
                                    break;
                            }
                            break;
                        case 'repeat':
                            if (!jsonList.label){
                                jsonList.label_0 = L0;
                                jsonList.label_1 = L1;
                                L0 += 1;
                                L1 += 1;
                                jsonList.label = "added";
                                commandList.push('L0_' + jsonList.label_0);
                            }
                            break;
                    }
                    break;

            }
        }
    }
}




// For debugging


// var str0 = JSON.parse(`[{"block_name":"controls_statement_whileUntil","loop_style":"controls_whileUntil","repeat_condition":{"block_name":"logic_boolean_boolean","value":"TRUE"},"end_type":"while","branch":[{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"math_number_number","number":"1"}]}]}]
// `);
// var str1 = JSON.parse(`[{"block_name":"variables_statement_set","functionName":"variables_set","varName":"i","argument":[{"block_name":"math_number_number","number":"1"}]},{"block_name":"controls_statement_whileUntil","loop_style":"controls_whileUntil","repeat_condition":{"block_name":"logic_boolean_operator_compare","operator":"cmpg","argument":[{"block_name":"variables_statement_get","functionName":"variables_get","varName":"i"},{"block_name":"math_number_number","number":"10"}]},"end_type":"until","branch":[{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"variables_statement_get","functionName":"variables_get","varName":"i"}]},{"block_name":"variables_statement_set","functionName":"variables_set","varName":"i","argument":[{"block_name":"math_arithmetic_operator","operator":"add","argument":[{"block_name":"variables_statement_get","functionName":"variables_get","varName":"i"},{"block_name":"math_number_number","number":"1"}]}]}]}]
// `);
// var str2 = JSON.parse(`[{"block_name":"variables_statement_set","functionName":"variables_set","varName":"i","argument":[{"block_name":"math_number_number","number":"1"}]},{"block_name":"controls_statement_repeat","loop_style":"controls_repeat_ext","repeat_times":{"block_name":"controls_statement_repeatExt","operator":"math.floor","argument":{"block_name":"math_number_number","number":"10"}},"branch":[{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"variables_statement_get","functionName":"variables_get","varName":"i"}]},{"block_name":"variables_statement_set","functionName":"variables_set","varName":"i","argument":[{"block_name":"math_arithmetic_operator","operator":"add","argument":[{"block_name":"variables_statement_get","functionName":"variables_get","varName":"i"},{"block_name":"math_number_number","number":"1"}]}]}]}]
// `);
//
//
//
//
//
// for (var i =0; i<3; i++){
//     var vars_name = 'str' + i;
//     commandList = [];
//     addTypeField.addTypeField(eval(vars_name));
//     console.log("JSON: \n", JSON.stringify(eval(vars_name), null, 4));
//     console.log(generator(eval(vars_name)));
//     console.log("JSON_result: \n", JSON.stringify(eval(vars_name), null, 4));
//
//     console.log("\n\n#######################################\n\n")
// }



function savetxt(path){

    fs.readFile(path, "utf8", function(err, jsondata) {
        if (!err) {
            console.log(jsondata);
            jsondata = JSON.parse(jsondata);
            addTypeField.addTypeField(jsondata);
            commandList = [];
            var reslist = generator(jsondata);

            console.log(reslist);
            var restxt = "";
            for (var j in reslist){
                restxt += reslist[j] + '\n';
            }
            var savefile = path.split('/')[4].split('.')[0];
            fs.writeFile('../tests/nodejs/generator_outputs/' + savefile + '_result' + '.txt', restxt, (err) => {
                if (err) throw err;
                console.log('result is saved successfully!');
            });
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

var path = '../tests/nodejs/generator_test_jsons/';
travel(path, savetxt);
