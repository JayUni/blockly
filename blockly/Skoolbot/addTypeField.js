module.exports.addTypeField = function addTypeField(jsonList){
    for (var element in jsonList) {
        if ((jsonList[element] instanceof Object)){
            jsonList[element].valueType = "";
            addTypeField(jsonList[element]);
        }
        else{
            var blockName = jsonList.block_name;
            if(blockName!==undefined){
                var block_type = blockName.split('_')[1];

                switch (block_type) {
                    case 'arithmetic':
                        var type_list = [];
                        for (var j in jsonList.argument){
                            // console.log(jsonList.argument[j]);
                            type_list.push(jsonList.argument[j].valueType);
                        }
                        // console.log(type_list);
                        jsonList.valueType = checkTypeList(type_list);
                        break;
                    default:
                        jsonList.valueType = block_type;
                        break;
                }
            }
        }
    }
};

function checkTypeList(typeList){
    var type = typeList[0];
    for (var i in typeList){
        if(typeList[i] !== type && typeList[i] !== undefined){
            return '';
        }
    }
    return type;
}
