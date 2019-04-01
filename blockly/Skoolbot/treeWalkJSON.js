
function printJsonTree(jsonlist, key) {
    if (key === ""|| key === undefined) {
        key = "root";
    }
    var element;
    for (element in jsonlist) {
        var k = key + ' -> ' + element;
        if ((jsonlist[element] instanceof Object)) {
            jsonlist[element].valueType = "";
            printJsonTree(jsonlist[element], k);
        }
        else {
            var t = k + " = " + jsonlist[element];
            console.log(t);
        }
    }
    return jsonlist
}





var str = JSON.parse(`[{"block_name":"controls_statement_repeat","loop_style":"controls_repeat_ext","repeat_times":{"block_name":"controls_statement_repeatExt","operator":"math.floor","argument":{"block_name":"math_number_number","number":"10"}},"branch":[{"block_name":"controls_statement_ifStructure","structure":[{"block_name":"controls_statement_if","statements":"if","condition":{"block_name":"logic_boolean_compare","operator":">","argument":[{"block_name":"text_number_count","functionName":"text_count","argument":[{"block_name":"variables_statement_get","functionName":"variables_get","varName":"i"},{"block_name":"text_string_substring","substring":{"block_name":"text_string","text":"'Hi'"}}]},{"block_name":"math_number_number","number":"0"}]},"branchCode":[{"block_name":"variables_statement_set","functionName":"variables_set","varName":"i","argument":[{"block_name":"text_string_getSubstring","functionName":"text_getSubstring","argument":[{"block_name":"variables_variable_variable","varName":{"block_name":"variables_statement_get","functionName":"variables_get","varName":"text"}},{"block_name":"text_string_startWhere","start_where":"FROM_START"},{"block_name":"text_number_startAt","start_index":{"block_name":"math_number_number","number":"12"}},{"block_name":"text_string_endWhere","end_where":"FROM_END"},{"block_name":"text_number_endAt","end_index":{"block_name":"math_number_number","number":"3"}}]}]}]},{"block_name":"controls_statement_else","statements":"else","branchCode":{"block_name":"text_statement_print","functionName":"text_print","argument":[{"block_name":"math_arithmetic_arithmetic","operator":"+","argument":[{"block_name":"math_number_number","number":"1"},{"block_name":"math_number_number","number":"1"}]}]}}]}]}]
`);

console.log("jsonlist: \n", JSON.stringify(str));

console.log("result of tree walk: \n");

str = printJsonTree(str, "");
console.log("added_blanktypefield: \n", JSON.stringify(str));




