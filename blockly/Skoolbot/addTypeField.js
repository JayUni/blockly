function addTypeField(jsonlist){
    for (var element in jsonlist) {
        if ((jsonlist[element] instanceof Object)){
            jsonlist[element].valueType = "";
            addTypeField(jsonlist[element]);
        }
        else{
            var blockName = jsonlist.block_name;
            if(blockName!==undefined){
                var block_type = blockName.split('_')[1];

                switch (block_type) {
                    case 'arithmetic':
                        console.log(jsonlist.argument);
                        var type_list = [];
                        for (var j in jsonlist.argument){
                            type_list.push(jsonlist.argument[j].valueType);
                        }
                        jsonlist.valueType = checkTypeList(type_list);
                        break;
                    default:
                        jsonlist.valueType = block_type;
                        break;
                }
            }
        }
    }
}


function checkTypeList(typeList){
    var type = typeList[0];
    for (var i in typeList){
        if(typeList[i] != type){
            return '';
        }
    }
    return type;
}


// function hasChild(jsonlist) {
//     var hasChild = false;
//     for (var k in jsonlist){
//         if (jsonlist[k] instanceof Array){
//             hasChild = true;
//         }
//     }
// }


var str = `[{"block_name":"procedures_statement_defreturn","funcName":"print_colour","description":"--Describethisfunction...","argument":[],"branch":[{"block_name":"variables_statement_set","functionName":"variables_set","varName":"colour","argument":[{"block_name":"colour_colour_picker","colour":"#ff0000"}]},{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"variables_statement_get","functionName":"variables_get","varName":"colour"}]},{"block_name":"variables_statement_set","functionName":"variables_set","varName":"colour","argument":[{"block_name":"text_string","text":"'random'"}]},{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"variables_statement_get","functionName":"variables_get","varName":"colour"}]},{"block_name":"variables_statement_set","functionName":"variables_set","varName":"colour","argument":[{"block_name":"colour_colour_rgb","argument":[{"block_name":"math_number_randomInt","functionName":"math_randomInt","argument":[{"block_name":"math_number_number","number":"1"},{"block_name":"math_number_number","number":"100"}]},{"block_name":"math_number_randomInt","functionName":"math_randomInt","argument":[{"block_name":"math_number_number","number":"1"},{"block_name":"math_number_number","number":"100"}]},{"block_name":"math_number_randomInt","functionName":"math_randomInt","argument":[{"block_name":"math_number_number","number":"1"},{"block_name":"math_number_number","number":"100"}]}]}]},{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"variables_statement_get","functionName":"variables_get","varName":"colour"}]},{"block_name":"variables_statement_set","functionName":"variables_set","varName":"colour","argument":[{"block_name":"colour_colour_blend","argument":[{"block_name":"colour_picker","colour1":{"block_name":"colour_colour_picker","colour":"#ff0000"}},{"block_name":"colour_picker","colour2":{"block_name":"colour_colour_picker","colour":"#3333ff"}},{"block_name":"math_number_constant","value":[{"block_name":"math_mathOperation_arithmetic","operator":"/","argument":[{"block_name":"math_mathOperation_arithmetic","operator":"+","argument":[{"block_name":"math_number_number","number":"1"},{"block_name":"math_operator_sqrt","operator":"math.sqrt","argument":[{"block_name":"math_number_number","number":"5"}]}]},{"block_name":"math_number_number","number":"2"}]}]}]}]},{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"variables_statement_get","functionName":"variables_get","varName":"colour"}]}],"return_value":{"null":"NULL"}}]`;

str = JSON.parse(str);

addTypeField(str);
console.log("addTypeField: \n", JSON.stringify(str, null, 4));
