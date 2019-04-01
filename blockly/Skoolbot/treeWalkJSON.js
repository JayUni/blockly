
function printJsonTree(jsonlist, key) {
    if (key === ""|| key === undefined) {
        key = "root";
    }
    var element;
    for (element in jsonlist) {
        var k = key + ' -> ' + element;
        if ((jsonlist[element] instanceof Object)) {
            jsonlist[element].valueType = "\"\"";
            printJsonTree(jsonlist[element], k);
        }
        else {
            var t = k + " = " + jsonlist[element];
            console.log(t);
        }
    }
    return jsonlist
}


function hasChildJSON(){
    //TODO
    return false;
}


var str = JSON.parse(`[{"block_name":"procedures_defreturn","procedures_type":"procedures_defreturn","funcName":"print_colour","description":"--Describethisfunction...","argument":[],"branch":[{"block_name":"variables_set","functionName":"variables_set","varName":"colour","argument":[{"block_name":"colour_picker","colour":"#ff0000"}]},{"block_name":"text_print","functionName":"text_print","argument":[{"block_name":"variables_get","functionName":"variables_get","varName":"colour"}]}],"return_value":{"null":"NULL"}}]`);

console.log("jsonlist: \n", JSON.stringify(str));

console.log("result of tree walk: \n");

str = printJsonTree(str, "");
console.log("added_blanktypefield: \n", JSON.stringify(str));




