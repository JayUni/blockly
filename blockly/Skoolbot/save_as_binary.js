function save_as_binary(hex_commands) {
    const BIN_SIZE = 1024;
    var resultList = [];

    for (var i in hex_commands){
        var row = hex_commands[i].split(' ');
        for (var j in row){
            if(row[j] !== '' && row[j] !== undefined){
                resultList.push(parseInt(row[j].substr(2, 2), 16));
            }
        }

    }
    var bin_content = new Int8Array(BIN_SIZE);
    for (var j in resultList){
        bin_content[j] = resultList[j];
    }
    return bin_content;
}
