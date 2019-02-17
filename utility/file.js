var path = require("path");
var fs = require("fs"); //fs模块
var srcDir = path.resolve(process.cwd(), "html");    //process.cwd:返回运行当前脚本工作目录的路径


var oFile = {
    getFileSync : function(){
        var data = fs.readFileSync('views/book.ejs');
        console.log("同步读取: " + data.toString());

    },
    createHTML : function(paths,cont){
        fs.writeFileSync(paths, cont, { //appendFile
            encoding: "utf8",
            flags: "a",
            mode: 438
        });
    }
};

module.exports = oFile;
// oFile.getFileSync();
