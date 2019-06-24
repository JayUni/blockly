module.exports = function (jsonList) {
    return add_type_field(jsonList);
};


function add_type_field(jsonList){
    for (var element in jsonList) {
        if ((jsonList[element] instanceof Object)){
            jsonList[element].valueType = "";
            add_type_field(jsonList[element]);
        }
        else{
            var blockName = jsonList.block_name;
            if(blockName!==undefined){
                var block_type = blockName.split('_')[1];

                switch (block_type) {
                    case 'arithmetic':
                        var type_list = [];
                        for (var j in jsonList.argument){
                            type_list.push(jsonList.argument[j].valueType);
                        }
                        jsonList.valueType = checkTypeList(type_list);
                        break;
                    default:
                        jsonList.valueType = block_type;
                        break;
                }
            }
        }
    }
    return jsonList;
}

// type inference, not finished cause currently only have integer type
function checkTypeList(typeList){
    var type = typeList[0];
    for (var i in typeList){
        if(typeList[i] !== type && typeList[i] !== undefined){
            return '';
        }
    }
    return type;
}
