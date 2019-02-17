define([
    'jquery'
], function ($) {

    // var tools = {
    //     stringToObj : function(strdata){
    //         if (typeof strdata === "string") {
    //             strdata = JSON.parse(strdata);
    //         };
    //         return strdata;
    //     }
    // };
    // var ajaxDatas = (function(){
    //     //ajax的请求链接
    //     var ajaxurl = {
    //         "getPassangerInfos"        : "/jbooking/getPassangerInfos",
    //         "getInsuranceInfos"        : "/jbooking/getInsuranceInfos",
    //         "getVouncherInfos"         : "/jbooking/getVouncherInfos",
    //         "getRestRoomInfos"         : "/jbooking/getRestRoomInfos",
    //         "getPassangerHistoryInfos" : "/jbooking/getPassangerHistoryInfos",
    //         "getPassangerHistoryInfosById" : "/jbooking/getPassangerHistoryInfosById",
    //         "checkRestRoomPassengerPro": "/jbooking/checkRestRoomPassengerPro"
    //     };
    //     //ajax用到的参数
    //     var ajaxArg = {
    //         "cacheKey" : pageController.productViewInfo.cacheKey
    //     };
    //
    //     //请求乘机人历史信息记录 (checkbox那堆)
    //     var getPassangerHistoryInfos = function(fnResolve,fnReject){
    //         $.post(ajaxurl.getPassangerHistoryInfos, ajaxArg.cacheKey).done(function (data) {
    //             data = tools.stringToObj(data);
    //             if ( !!data.success ) {
    //                 if( !!fnResolve ) fnResolve(data);
    //             } else {
    //                 if( !!fnReject ) fnReject();
    //             };
    //         }).fail(function () {
    //             if( !!fnReject ) fnReject();
    //         });
    //     };
    //     //点击乘机人请求对应乘机人信息
    //     var getPassangerHistoryInfosById = function(obj){
    //         var opt = {
    //             ajaxArg : {},
    //             fnResolve : function(){}
    //             fnReject : function(){}
    //         };
    //         for( var x in obj ){
    //             obj[x] = opt[x];
    //         };
    //
    //         opt.ajaxArg.cacheKey = ajaxArg.cacheKey;
    //         $.post(ajaxurl.getPassangerHistoryInfosById, opt.ajaxArg).done(function(data) {
    //             data = tools.stringToObj(data);
    //             if ( !!data.success ) {
    //                 opt.fnResolve();
    //             } else {
    //                 opt.fnReject();
    //             };
    //         }).fail(function() {
    //             opt.fnReject();
    //         });
    //     };
    //
    //     return {
    //         getPassangerHistoryInfos : getPassangerHistoryInfos,
    //         getPassangerHistoryInfosById : getPassangerHistoryInfosById
    //     };
    // })();
    //
    // return {
    //     tools : tools,
    //     ajaxDatas : ajaxDatas
    // };

});
