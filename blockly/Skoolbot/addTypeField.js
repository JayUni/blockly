
function addTypeField(jsonlist){
    for (var element in jsonlist) {
        if ((jsonlist[element] instanceof Object)){
            addTypeField(jsonlist[element]);
        }
        else{
                        var hasChild = false;
            for (var k in jsonlist){
                if (jsonlist[k] instanceof Array){
                    hasChild = true;
                }
            }
            if(!hasChild) {
                var blockName = jsonlist.block_name;
                console.log('block_name: ', blockName);
                if(blockName!=undefined){
                    var block_type = blockName.split('_')[0];
                    console.log('block_type: ', block_type);
                    switch (block_type) {
                        case 'math':
                            jsonlist.valueType = "number";
                            break;
                        case 'colour':
                            jsonlist.valueType = "colour";
                            break;
                        default:
                            jsonlist.valueType = "null";
                            break;

                    }
                }
            }
            else{
                //TODO
            }
        }
    }
}

var str = JSON.parse(`[{"block_name":"procedures_defreturn","procedures_type":"procedures_defreturn","funcName":"print_colour","description":"--Describethisfunction...","argument":[],"branch":[{"block_name":"variables_set","functionName":"variables_set","varName":"colour","argument":[{"block_name":"colour_picker","colour":"#ff0000","valueType":""}],"valueType":""},{"block_name":"text_print","functionName":"text_print","argument":[{"block_name":"variables_get","functionName":"variables_get","varName":"colour","valueType":""}],"valueType":""}],"return_value":{"null":"NULL","valueType":""},"valueType":""},{"block_name":"colour_picker","colour":"#ff0000","valueType":""}]`);

console.log('jsonlist: \n', str);
addTypeField(str);
console.log("addTypeField: \n", JSON.stringify(str));