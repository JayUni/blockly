// initialize global variables
var commandList = [];
var L0 = 0;
var L1 = 0;
var loop_val = 0;


function command_generator(jsonList){

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
            command_generator(val);
            addCommand(jsonList);// This statement runs more than one time
            hasChild = true;
        }
        else{
            jsonList = addLabel(jsonList);


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
                        case 'change':
                            commandList.push('change ' + jsonList.varName);
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
                            if(jsonList.statements === 'if'){
                                commandList.push('JUMPNZ L0_' + jsonList.label_0);

                                jsonList.statements = 'if_checked';
                            }
                            if(jsonList.statements ==='if_checked'){
                                jsonList.statements = 'if_branchCode';
                                break;
                            }
                            if(jsonList.statements ==='if_branchCode'){
                                commandList.push('JUMP L1_' + (parseInt(jsonList.label_num)+(parseInt(jsonList.label_0)-1)));
                                jsonList.label_num = parseInt(jsonList.label_num);
                            }
                            commandList.push('L0_' + jsonList.label_0);
                            break;
                        case 'elseif':
                            // commandList.push('L1_' + jsonList.label_0);
                            // console.log(jsonList.statements);
                            if(jsonList.statements === 'elseif'){
                                commandList.push('JUMPNZ L0_' + jsonList.label_0);
                                jsonList.statements = 'if_checked';
                            }
                            if(jsonList.statements ==='if_checked'){
                                jsonList.statements = 'if_branchCode';
                                break;
                            }
                            if(jsonList.statements ==='if_branchCode'){
                                commandList.push('JUMP L1_' + (parseInt(jsonList.label_num)+(parseInt(jsonList.label_0)-1)));
                            }
                            commandList.push('L0_' + jsonList.label_0);
                            break;
                        case 'else':
                            // console.log('else', jsonList.label_1);
                            commandList.push('L1_' + jsonList.label_1);
                            break;
                        case 'whileUntil':
                            if (jsonList.label === 'added'){
                                if(jsonList.end_type === 'until'){
                                    commandList.push('negate');
                                }
                                commandList.push('JUMPNZ L1_' + jsonList.label_1);
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
                                commandList.push('set repeat_control_variable_'+ jsonList.loop_val);
                                commandList.push('L0_' + jsonList.label_0);
                                jsonList.label = 'variableAdded';
                                break;
                            }
                            if (jsonList.label === 'variableAdded'){
                                commandList.push('get repeat_control_variable_'+ jsonList.loop_val, 'number 1', 'sub', 'set repeat_control_variable_' + jsonList.loop_val, 'get repeat_control_variable_' + jsonList.loop_val, 'number 0', 'cmpg');
                                commandList.push('JUMPNZ L1_' + jsonList.label_1);
                                commandList.push('JUMP L0_' + jsonList.label_0);
                                commandList.push('L1_' + jsonList.label_1);
                                jsonList.label = 'finished';
                            }
                            break;
                        case 'for':
                            if (jsonList.label === 'added'){
                                commandList.push('set for_start_variable_' + jsonList.loop_val);
                                commandList.push('boolean TRUE');
                                commandList.push('set for_control_variable_' + jsonList.loop_val);
                                jsonList.label = 'variableInit';
                                break;
                            }
                            if (jsonList.label === 'variableInit'){
                                commandList.push('set for_step_variable_' + jsonList.loop_val);
                                commandList.push('L0_' + jsonList.label_0);
                                commandList.push('get for_control_variable_' + jsonList.loop_val);
                                commandList.push('JUMPNZ L1_' + jsonList.loop_L1);
                                jsonList.label = 'jumpAdded';
                                break;
                            }
                            if (jsonList.label === 'jumpAdded'){

                                commandList.push('set for_end_variable_' + jsonList.loop_val);
                                commandList.push('get for_start_variable_' + jsonList.loop_val);
                                commandList.push('set for_i_variable_' + jsonList.loop_val);
                                commandList.push('get for_start_variable_' + jsonList.loop_val);
                                commandList.push('set ' + jsonList.variable);
                                commandList.push('boolean FALSE');
                                commandList.push('set for_control_variable_' + jsonList.loop_val);
                                commandList.push('JUMP L0_' + jsonList.loop_L0);
                                commandList.push('L1_' + jsonList.loop_L1);
                                commandList.push('get for_i_variable_' + jsonList.loop_val);
                                commandList.push('get for_step_variable_' + jsonList.loop_val);
                                commandList.push('add');
                                commandList.push('set for_i_variable_' + jsonList.loop_val);
                                commandList.push('get for_i_variable_' + jsonList.loop_val);
                                commandList.push('set ' + jsonList.variable);
                                commandList.push('L0_' + jsonList.loop_L0);
                                commandList.push('get for_i_variable_' + jsonList.loop_val);
                                commandList.push('get for_end_variable_' + jsonList.loop_val);
                                var loop_start = jsonList.start[0].number;
                                var loop_end = jsonList.end[0].number;
                                if(loop_start <= loop_end){
                                    commandList.push('cmple');
                                }
                                else{
                                    commandList.push('cmpge');
                                }
                                // commandList.push('cmple');
                                commandList.push('JUMPNZ L1_' + jsonList.label_1);
                                jsonList.label = 'variableChanged';
                                break;
                            }
                            if (jsonList.label === 'variableChanged'){
                                commandList.push('JUMP L0_' + jsonList.label_0);
                                commandList.push('L1_' + jsonList.label_1);
                                jsonList.label = 'finished';
                                break;
                            }

                            break;
                        case 'continue':
                            commandList.push('JUMP L0_' + jsonList.label_0);
                            break;
                        case 'break':
                            commandList.push('JUMP L1_' + jsonList.label_1);
                            break;
                    }
                case 'io':
                    switch (command) {
                        case 'dread':
                            commandList.push('dread ' + jsonList.arguments[0].varName);
                            break;
                        case 'dwrite':
                            if(jsonList.arguments[1].value === 'HIGH'){
                                commandList.push('number 0');
                            }else{
                                commandList.push('number 1');
                            }
                            commandList.push('dwrite ' + jsonList.arguments[0].varName);
                            break;
                        case 'aread':
                            commandList.push('aread ' + jsonList.arguments[0].varName);
                            break;
                        case 'awrite':
                            commandList.push('awrite ' + jsonList.arguments[0].varName);
                            break;
                        case 'pinmode':
                            if(jsonList.arguments[1].pinmode === 'INPUT'){
                                commandList.push('number 0');
                            }else{
                                commandList.push('number 1');
                            }
                            commandList.push('pinmode ' + jsonList.arguments[0].varName);
                            break;
                        case 'delay':
                            commandList.push('delay');
                            break;
                    }
                    break;
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
                                    jsonList.structure[i].label_num = branch_num - i;
                                    L0 += 1;
                                    L1 += 1;
                                }
                                if(jsonList.structure[branch_num-1].block_name === 'controls_statement_else'){
                                    jsonList.structure[branch_num-1].label_0 = L0;
                                    jsonList.structure[branch_num-1].label_1 = L1;
                                    jsonList.structure[branch_num-2].has_else = true;
                                    jsonList.structure[0].has_else = true;

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
                                        continueBreak(jsonList.branch, L0, L1);
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
                                        continueBreak(jsonList.branch, L0, L1);
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
                                continueBreak(jsonList.branch, L0, L1);
                                L0 += 1;
                                L1 += 1;
                                jsonList.label = "added";
                                jsonList.loop_val = loop_val;
                                loop_val += 1;
                            }
                            break;
                        case 'for':
                            if (!jsonList.label){
                                jsonList.label_0 = L0;
                                jsonList.label_1 = L1;
                                continueBreak(jsonList.branch, L0, L1);
                                L0 += 1;
                                L1 += 1;
                                jsonList.label = "added";
                                jsonList.loop_val = loop_val;
                                jsonList.loop_L0 = L0;
                                jsonList.loop_L1 =L1;
                                L0 += 1;
                                L1 += 1;
                                loop_val += 1;

                            }
                            break;
                    }
                    break;
            }
        }
    }
    return jsonList;
}

function continueBreak(jsonList, L0, L1) {
    for(var j in jsonList){
        if(jsonList[j].block_name === 'controls_statement_continue' || jsonList[j].block_name === 'controls_statement_break'){
            jsonList[j].label_0 = L0;
            jsonList[j].label_1 = L1;
        }

        if(jsonList[j].block_name === 'controls_statement_ifelse') {
            continueBreak(jsonList[j].structure[0].branchCode, L0, L1);
        }

    }
}


//
// // For debugging
//
//
// var str0 = JSON.parse(`[{"block_name":"controls_statement_for","loop_style":"controls_for","variable":"i","start":[{"block_name":"math_number_number","number":"1"}],"step":[{"block_name":"math_number_number","number":"1"}],"end":[{"block_name":"math_number_number","number":"10"}],"step":[{"block_name":"math_number_number","number":"1"}],"branch":[{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"variables_statement_get","functionName":"variables_get","varName":"i"}]}]}]
// `);
// // var str1 = JSON.parse(`[{"block_name":"controls_statement_ifelse","structure":[{"block_name":"controls_statement_if","statements":"if","condition":{"block_name":"logic_boolean_operator_compare","operator":"cmpe","argument":[{"block_name":"math_number_number","number":"2"},{"block_name":"math_number_number","number":"1"}]},"branchCode":[{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"text_string_text","text":"'-1'"}]}]},{"block_name":"controls_statement_elseif","statements":"elseif","condition":{"block_name":"logic_boolean_operator_compare","operator":"cmpe","argument":[{"block_name":"math_number_number","number":"2"},{"block_name":"math_number_number","number":"1"}]},"branchCode":[{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"text_string_text","text":"'-1'"}]}]},{"block_name":"controls_statement_else","statements":"else","branchCode":[{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"text_string_text","text":"'0'"}]}]}]}]
// // `);
// // var str2 = JSON.parse(`[{"block_name":"controls_statement_ifelse","structure":[{"block_name":"controls_statement_if","statements":"if","condition":{"block_name":"logic_boolean_operator_compare","operator":"cmpe","argument":[{"block_name":"math_number_number","number":"2"},{"block_name":"math_number_number","number":"1"}]},"branchCode":[{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"text_string_text","text":"'-1'"}]}]},{"block_name":"controls_statement_elseif","statements":"elseif","condition":{"block_name":"logic_boolean_operator_compare","operator":"cmpe","argument":[{"block_name":"math_number_number","number":"1"},{"block_name":"math_number_number","number":"1"}]},"branchCode":[{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"text_string_text","text":"'0'"}]}]},{"block_name":"controls_statement_else","statements":"else","branchCode":[{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"text_string_text","text":"'-1'"}]}]}]}]
// // `);
//
// var add_type_field = require('./module_add_type_field.js');
//
//
// for (var i = 0; i<1; i++){
//     L0 = 0;
//     L1 = 0;
//     loop_val = 0
//     var vars_name = 'str' + i;
//     commandList = [];
//     add_type_field(eval(vars_name));
//     // console.log("JSON: \n", JSON.stringify(eval(vars_name), null, 4));
//     var res = command_generator(eval(vars_name));
//     for(var i in res){
//         console.log(res[i]);
//     }
//
//     // console.log("JSON_result: \n", JSON.stringify(eval(vars_name), null, 4));
//
//     console.log("\n\n#######################################\n\n")
// }


//
//
// // save as text file
//
// const fs = require('fs');
//
// function savetxt(path){
//
//     fs.readFile(path, "utf8", function(err, jsondata) {
//         if (!err) {
//             // console.log(jsondata);
//             jsondata = JSON.parse(jsondata);
//             // jsondata = add_type_field(jsondata);
//             commandList = [];
//             L0 = 0;
//             L1 = 0;
//             loop_val = 0;
//             var reslist = command_generator(jsondata);
//
//             // console.log(reslist);
//             var restxt = "";
//             for (var j in reslist){
//                 restxt += reslist[j] + '\n';
//             }
//             var savefile = path.split('/')[4].split('.')[0];
//             fs.writeFile('../tests/nodejs/symbolic_generator_outputs/' + savefile + '.txt', restxt, (err) => {
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
// var path = '../tests/nodejs/addTypeFieldToGenerator_test_cases/';
// travel(path, savetxt);
//
//
//
