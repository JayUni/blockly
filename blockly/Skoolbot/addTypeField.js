
function addTypeField(jsonlist){
    for (var element in jsonlist) {
        if ((jsonlist[element] instanceof Object)){
            addTypeField(jsonlist[element]);
        }
        else{
            var blockName = jsonlist.block_name;
            // console.log('block_name: ', blockName);
            if(blockName!=undefined){
                var block_type = blockName.split('_')[1];
                // console.log('block_type: ', block_type);

                //add value type to bottom level of block in JSON
                switch (block_type) {
                    case 'arithmetic':
                        console.log(jsonlist.argument);
                        var type_list = [];
                        for (var j in jsonlist.argument){
                            type_list.push(jsonlist.argument[j].valueType);
                        }
                        console.log(type_list);

                        jsonlist.valueType = checkTypeList(type_list);
                        break;
                    default:
                        jsonlist.valueType = block_type;
                        break;
                }
            }

            //TODO
            // add type field based on the operation type and its direct children's value type.
        }
    }
}

// function hasChild(jsonlist) {
//     var hasChild = false;
//     for (var k in jsonlist){
//         if (jsonlist[k] instanceof Array){
//             hasChild = true;
//         }
//     }
// }


function checkTypeList(typeList){
    var type = typeList[0];
    for (var i in typeList){
        if(typeList[i] != type){
            return '';
        }
    }
    return type;
}



var str = JSON.parse(`[{"block_name":"controls_statement_repeat","loop_style":"controls_repeat_ext","repeat_times":{"block_name":"controls_statement_repeatExt","operator":"math.floor","argument":{"block_name":"math_number_number","number":"10","valueType":""},"valueType":""},"branch":[{"block_name":"controls_statement_ifStructure","structure":[{"block_name":"controls_statement_if","statements":"if","condition":{"block_name":"logic_boolean_compare","operator":">","argument":[{"block_name":"text_number_count","functionName":"text_count","argument":[{"block_name":"variables_statement_get","functionName":"variables_get","varName":"i","valueType":""},{"block_name":"text_string_substring","substring":{"block_name":"text_string","text":"'Hi'","valueType":""},"valueType":""}],"valueType":""},{"block_name":"math_number_number","number":"0","valueType":""}],"valueType":""},"branchCode":[{"block_name":"variables_statement_set","functionName":"variables_set","varName":"i","argument":[{"block_name":"text_string_getSubstring","functionName":"text_getSubstring","argument":[{"block_name":"variables_variable_variable","varName":{"block_name":"variables_statement_get","functionName":"variables_get","varName":"text","valueType":""},"valueType":""},{"block_name":"text_string_startWhere","start_where":"FROM_START","valueType":""},{"block_name":"text_number_startAt","start_index":{"block_name":"math_number_number","number":"12","valueType":""},"valueType":""},{"block_name":"text_string_endWhere","end_where":"FROM_END","valueType":""},{"block_name":"text_number_endAt","end_index":{"block_name":"math_number_number","number":"3","valueType":""},"valueType":""}],"valueType":""}],"valueType":""}],"valueType":""},{"block_name":"controls_statement_else","statements":"else","branchCode":{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"math_arithmetic_arithmetic","operator":"+","argument":[{"block_name":"math_number_number","number":"1","valueType":""},{"block_name":"math_number_number","number":"1","valueType":""}],"valueType":""}],"valueType":""},"valueType":""}],"valueType":""}],"valueType":""}]
`);

console.log('jsonlist: \n', JSON.stringify(str));
addTypeField(str);
console.log("addTypeField: \n", JSON.stringify(str));
