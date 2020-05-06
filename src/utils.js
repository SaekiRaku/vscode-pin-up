const os = require("os");

exports.fixedPath = function(thepath){
    if(os.type() == "Windows_NT"){
        if(thepath[0]==="/"){
            return thepath.slice(1, thepath.length);
        }
    }
    return thepath;
}