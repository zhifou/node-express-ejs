/**
 * @fileOverview html操作集，内容处理,内容编码
 * @author zhaoyadong
 * @module utility/htmlhelper
 */

var htmlHelper = {

    removeHtml: function (content, element) {
        var reg = new RegExp("<script>(.*)<\/script>|<script\/>");
        var a = content.replace(reg, "");
        return a;
    },
    /*getHtml: function (content, element) {
        var reg = new RegExp("/^<" + element + ".*" + "<\/" + element + ">$/");
        content.replace(reg, "");
        return content;
    },*/
    removeScirpt: function (content,index) {
        //var regex = "<script[^>]*?>.*?<\/script>";
        //var result = Regex.Replace(content, regex, "");
        //return result;
        //var reg = new RegExp(regex);
        //删除script的匹配是这样写滴
        //var result = content.match(/<script[^>]*?>[\s\S]*?<\/script>/gi,"");
        var result = content.replace(/(data-main)+[a-zA-Z0-9\s\-\=\"\:\.\/\?]+(">)*/gi,"");    //去掉require.js
        return result;
    },
    getLinkCss : function(content){ //获取link标签
        var linkRegExp = content.match(/(\<link)+[\d\w\s\"\:\.\?\-\=\/\\]*?(\>)/gi);
        if( !linkRegExp ) return false;
        // console.log( linkRegExp );
        return linkRegExp.join("");
    },
    //引用本地js
    upadteScript : function( content ){
        var result = content.replace(/src\=\"http\:\/\/www\.elongstatic\.com\/[\/\.\-\_a-zA-Z]+\.js/gi,
            function($1){
                return $1.replace('http://www.elongstatic.com/','https://localhost:3000/flight/src/js/list/')
            }
        );
        return result;
    },

    getBody: function (content , index ) {
        var idx = content.indexOf("<body");
        var idxEnd = content.indexOf("</body>");
        var a = content.substring(idx, idxEnd);
        if(index){
            a = this.removeScirpt(a, "script");
        };
        return a;
    },
    ryanGetBody : function(content , index){
        var idx = content.indexOf("<body");
        var idxEnd = content.indexOf("</body>");

        var a = content.substring(idx, idxEnd);
        a = a.replace(/(data-main)+[a-zA-Z0-9\s\-\=\"\:\.\/\?]+(">)*/gi,"");
        // console.log( a );
        return a;
    }
};


module.exports = htmlHelper;
