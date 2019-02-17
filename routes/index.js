/**
 * Created by zhaoyadong on 28/07/2014.
 */

module.exports = function(app){

    // Mockjs的测试程序
    var Mock = require('mockjs');
    var data = Mock.mock({
        'list|1-10': [{
            'id|+1': 1
        }]
    });

    console.log(JSON.stringify(data, null, 4));
    //--------------------------------------------

    var files = require('../utility/file');
    var bookCacheKey = "",
        signCookie = {
            'User-Agent' : 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
            'Cookie' : 'CookieGuid=818f5523-abce-4838-a49e-6f47460432c1; H5CookieId=95c8a4b9-e6d5-49b4-9229-6e0b6be9a52e; s_fid=752875663810FE51-36F1BA81CE53113D; ASP.NET_SessionId=0rlcgyekyrofv1vcpbo2lt55; SessionGuid=ed89c5d0-8867-46ee-90c4-527405771d1b; route=e18351f0e946ff4001a47a29c8b0218f; TLTCNT=DAA-OWEBFLT40000000000000004; FlightCondition=ArrName=%25E6%2588%2590%25E9%2583%25BD%7Cchengdu&DepName=%25E4%25B8%258A%25E6%25B5%25B7%7Cshanghai&DepDate=2017-01-30&ArrCode=ctu&DepCode=sha&FType=0&BackDate=2017-01-23&; Hm_lvt_a8cab4bd1a0039ff303b048b92b77538=1483937926,1484051592,1484113352,1484371104; Hm_lpvt_a8cab4bd1a0039ff303b048b92b77538=1484621802; s_cc=true; s_sq=%5B%5BB%5D%5D; s_visit=1; utoken=e2NYAbzbArasFddAlC7fh%2FGy1wSp5No3; JSESSIONID=BCFF85631AD1F376951E3310708BFBD2; com.eLong.CommonService.OrderFromCookieInfo="Status=1&Orderfromtype=1&Isusefparam=0&Pkid=50&Parentid=50000&Coefficient=0.0&Makecomefrom=0&Cookiesdays=0&Savecookies=0&Priority=8000"; member=15811173084; Esid=3c70ed8b-b130-4aa0-ad32-2038543c1e08; Lgid=LRpRtrsC3gsExwGXhEk%2flpaR3waA7McUH7SGryL5%2fSF1hQzJE1e5Zl2SvXXJsHdj4ro%2fa%2fbhhO3cG0MF6n0ccZSDEjzjvqZgRZSLvZyEvoVsGAXfs09EqtRkjbYWSHtrYEdZav1OBYL9ne48AdALVw%3d%3d'
        };
    var urls = {
        _htmlurl : "http://flight.elong.com/jbooking/cn_makeoworder?producttype=oneway&departcity=SHA&arrivecity=CTU&godays=13&flightnum=MU5415&uniquekey=I1017600.470&packids=&xpackids=&seatlevel=y",
        _htmlDelayTime : 30000,
        ajaxDescList : [
            '/jbooking/getContactInfos',
            '/jbooking/getRestRoomInfos',
            '/jbooking/checkRestRoomPassengerPro',
            '/jbooking/getVouncherInfos',
            '/jbooking/getPassangerHistoryInfos',
            '/jbooking/getPassangerHistoryInfosById',
            '/jbooking/getPassangerInfos',
            '/jbooking/getInsuranceInfos',
            '/jbooking/checkFlightPriceSeat',
            '/jbooking/getXpromotionInfos',
            '/jbooking/getPca',
            '/jbooking/save'
        ],
        ajaxUrlList  : [
            'getContactInfos',
            'getRestRoomInfos',
            'checkRestRoomPassengerPro',
            'getVouncherInfos',
            'getPassangerHistoryInfos',
            'getPassangerHistoryInfosById',
            'getPassangerInfos',
            'getInsuranceInfos',
            'checkFlightPriceSeat',
            'getXpromotionInfos',
            'getPca',
            'save'
        ],
        ajaxDelayTime : 30000
    };

    app.get('/', function(req, res){

        var httpHelper = require('../utility/httphelper');
        var htmlHelper = require('../utility/htmlhelper');

        var thatRes = res;

        httpHelper.get("http://flight.elong.com/", 1000, function (err, data) {
            if (err) {
                console.log("Got Err: "  + err);
            }
            //data = htmlHelper.removeHtml(data, "script");
            //console.log( data );
            data = htmlHelper.getBody(data,'index');
            thatRes.render('index', {title: '机票首页', content: data});
        }, 'utf-8',
            {'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36'}
        );

    });

    app.get('/clientapi/common/user_mask', function(req, res){

        var httpHelper = require('../utility/httphelper');
        var htmlHelper = require('../utility/htmlhelper');

        var thatRes = res;

        httpHelper.get("https://hotel.baidu.com" + req.url, 1000, function (err, data) {
            if (err) {
                console.log("Got Err: "  + err);
            }
            thatRes.send(data);
        }, 'utf-8',
            {'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36'}
        );

    });

    app.get('/book.html', function(req, res) {
        // console.log( req.params );
        var httpHelper = require('../utility/httphelper');
        var htmlHelper = require('../utility/htmlhelper');

        var thatRes = res;
        httpHelper.get(urls._htmlurl, urls._htmlDelayTime, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    var str = "cacheKey\":\"";
                    bookCacheKey = data.substring( data.indexOf("cacheKey\":\"")+str.length,data.indexOf("\",\"dateRange") );

                    //操作处理
                    links = htmlHelper.getLinkCss(data);
                    data = htmlHelper.ryanGetBody(data);
                    //创建文件
                    // files.createHTML("./html/book.html",data);
                    console.log( "book:",data.substr(0,2) );
                    thatRes.render('book', {title: '机票填写页', links:links, content: data});
                };
            }, 'utf-8',
            signCookie
            // {
            //     'User-Agent' : 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
            //     'Cookie' : 'ASP.NET_SessionId=4pdy3155ctly2jini5ovcrqr; CookieGuid=08328655-d3ac-4aea-858b-c065ffd02e37; SessionGuid=4dd03147-d7e5-40f1-8dcb-cf87c7f03633; member=9000; Esid=4a62c720-481c-42e6-aa7c-54dfa7117af6; Lgid=uEUq2J2xw%2fo99z%2bC6gp0Q2EnZ1VUZvw5xV8oLuJsc87CSgnROKtXy9QpPLODR%2bpht9NfL3WvSSxUnAP4UQrB4LHdmmdGm4Vhtt9OGuEUNNU%3d; JSESSIONID=944465AD267E9EAA79419DB9EB22DFD6; FlightCondition=ArrName=%25E4%25B8%258A%25E6%25B5%25B7%7Cshanghai&DepName=%25E5%258C%2597%25E4%25BA%25AC%7Cbeijing&DepDate=2016-12-15&ArrCode=sha&DepCode=bjs&FType=0&BackDate=&; Hm_lvt_a8cab4bd1a0039ff303b048b92b77538=1481254176; Hm_lpvt_a8cab4bd1a0039ff303b048b92b77538=1481265436; com.eLong.CommonService.OrderFromCookieInfo="Status=1&Orderfromtype=1&Isusefparam=0&Pkid=50&Parentid=50000&Coefficient=0.0&Makecomefrom=0&Cookiesdays=0&Savecookies=0&Priority=8000"; s_cc=true; s_visit=1; s_sq=%5B%5BB%5D%5D'
            // }
        );
    });

    // app.get('/submit.html',function(){
    //     //http://flight.elong.com/jbooking/cn_submitorder.html?key=yqoe11dCdFwa6loyCwS
    // });

    //node做中转 跨域请求数据  填写页
    (function(){
        var httpHelper = require('../utility/httphelper'),
            ajaxPublicUrl = "http://flight.elong.com/jbooking/";

        //get参数：req.originalUrl
        //post参数：req.body
        function getsAjax(urlDesc,urlAjax,delays){
            app.post(urlDesc, function(req, res) {
                var thatRes = res;
                var sreq = httpHelper.post(urlAjax, delays, req.body, function (err, data) {
                        if (err) {
                            console.log("Got Err: " + err);
                        }else{
                            // files.createHTML("./html/mock/getRestRoomInfos.js","module.exports="+data);
                            // var data = require("./html/mock/getRestRoomInfos.js");
                            thatRes.send( data );
                            thatRes.end();
                        };
                    }, 'utf-8',
                    signCookie
                );
            });
        };
        //ajax数据拦截
        for( var i=0; i<urls.ajaxDescList.length; i++ ){
            getsAjax( urls.ajaxDescList[i],ajaxPublicUrl+urls.ajaxUrlList[i],urls.ajaxDelayTime );
        };

        // app.post('/jbooking/getRestRoomInfos', function(req, res) {
        //     var thatRes = res;
        //     var sreq = httpHelper.post(ajaxPublicUrl+"getRestRoomInfos", urls.ajaxDelayTime, req.body, function (err, data) {
        //             if (err) {
        //                 console.log("Got Err: " + err);
        //             }else{
        //                 // files.createHTML("./html/mock/getRestRoomInfos.js","module.exports="+data);
        //                 // var data = require("./html/mock/getRestRoomInfos.js");
        //                 thatRes.send( data );
        //                 thatRes.end();
        //             };
        //         }, 'utf-8',
        //         signCookie
        //     );
        // });
        // app.post('/jbooking/checkRestRoomPassengerPro', function(req, res) {
        //     var thatRes = res;
        //     var sreq = httpHelper.post(ajaxPublicUrl+"checkRestRoomPassengerPro", urls.ajaxDelayTime, req.body, function (err, data) {
        //             if (err) {
        //                 console.log("Got Err: " + err);
        //             }else{
        //                 // files.createHTML("./html/mock/checkRestRoomPassengerPro.js","module.exports="+data);
        //                 // var data = require("./html/mock/checkRestRoomPassengerPro.js");
        //                 thatRes.send( data );
        //                 thatRes.end();
        //             };
        //         }, 'utf-8',
        //         signCookie
        //     );
        // });
        // app.post('/jbooking/getVouncherInfos', function(req, res) {
        //     var thatRes = res;
        //     var sreq = httpHelper.post(ajaxPublicUrl+"getVouncherInfos", urls.ajaxDelayTime, req.body, function (err, data) {
        //             if (err) {
        //                 console.log("Got Err: " + err);
        //             }else{
        //                 // files.createHTML("./html/mock/getVouncherInfos.js","module.exports="+data);
        //                 // var data = require("./html/mock/getVouncherInfos.js");
        //                 thatRes.send( data );
        //                 thatRes.end();
        //             };
        //         },
        //         'utf-8',
        //         signCookie
        //     );
        // });
        // app.post('/jbooking/getPassangerHistoryInfos', function(req, res) {
        //     var thatRes = res;
        //     var sreq = httpHelper.post(ajaxPublicUrl+"getPassangerHistoryInfos", urls.ajaxDelayTime, {
        //         "cacheKey" : bookCacheKey
        //     }, function (err, data) {
        //             if (err) {
        //                 console.log("Got Err: " + err);
        //             }else{
        //                 // files.createHTML("./html/mock/getPassangerHistoryInfos.js","module.exports = "+data);
        //                 // var data = require("./html/mock/getPassangerHistoryInfos.js");
        //                 thatRes.send( data );
        //                 thatRes.end();
        //             };
        //         }, 'utf-8',
        //         signCookie
        //     );
        // });
        // app.post('/jbooking/getPassangerHistoryInfosById', function(req, res) {
        //     // console.log( req.body );
        //     var thatRes = res;
        //     var sreq = httpHelper.post(ajaxPublicUrl+"getPassangerHistoryInfosById", urls.ajaxDelayTime, req.body, function (err, data) {
        //             if (err) {
        //                 console.log("Got Err: " + err);
        //             }else{
        //                 // files.createHTML("./html/mock/getPassangerHistoryInfosById.js","module.exports = "+data);
        //                 // var data = require("./html/mock/getPassangerHistoryInfosById.js");
        //                 thatRes.send( data );
        //                 thatRes.end();
        //             };
        //         }, 'utf-8',
        //         signCookie
        //     );
        // });
        // app.post('/jbooking/getPassangerInfos', function(req, res) {
        //     var thatRes = res;
        //     var sreq = httpHelper.post(ajaxPublicUrl+"getPassangerInfos", urls.ajaxDelayTime, {
        //         "cacheKey" : bookCacheKey
        //     }, function (err, data) {
        //             if (err) {
        //                 console.log("Got Err: " + err);
        //             }else{
        //                 // files.createHTML("./html/mock/getPassangerInfos.js","module.exports = "+data);
        //                 // var data = require("./html/mock/getPassangerInfos.js");
        //                 thatRes.send( data );
        //                 thatRes.end();
        //             };
        //         }, 'utf-8',
        //         signCookie
        //     );
        // });
        // app.post('/jbooking/getInsuranceInfos', function(req, res) {
        //     var thatRes = res;
        //     var sreq = httpHelper.post(ajaxPublicUrl+"getInsuranceInfos", urls.ajaxDelayTime, {
        //         "cacheKey" : bookCacheKey
        //     }, function (err, data) {
        //             if (err) {
        //                 console.log("Got Err: " + err);
        //             }else{
        //                 // files.createHTML("./html/mock/getInsuranceInfos.js","module.exports = "+data);
        //                 // var data = require("./html/mock/getInsuranceInfos.js");
        //                 thatRes.send( data );
        //                 thatRes.end();
        //             };
        //         }, 'utf-8',
        //         signCookie
        //     );
        // });
        // app.post('/jbooking/checkFlightPriceSeat', function(req, res) {
        //     var thatRes = res;
        //     var sreq = httpHelper.post(ajaxPublicUrl+"checkFlightPriceSeat", urls.ajaxDelayTime, req.body, function (err, data) {
        //             if (err) {
        //                 console.log("Got Err: " + err);
        //             }else{
        //                 // files.createHTML("./html/mock/checkFlightPriceSeat.js","module.exports = "+data);
        //                 // var data = require("./html/mock/checkFlightPriceSeat.js");
        //                 thatRes.send( data );
        //                 thatRes.end();
        //             };
        //         }, 'utf-8',
        //         signCookie
        //     );
        // });
        // app.post('/jbooking/getXpromotionInfos', function(req, res) {
        //     var thatRes = res;
        //     var sreq = httpHelper.post(ajaxPublicUrl+"getXpromotionInfos", urls.ajaxDelayTime, req.body, function (err, data) {
        //             if (err) {
        //                 console.log("Got Err: " + err);
        //             }else{
        //                 // files.createHTML("./html/mock/getInsuranceInfos.js","module.exports = "+data);
        //                 // var data = require("./html/mock/getInsuranceInfos.js");
        //                 thatRes.send( data );
        //                 thatRes.end();
        //             };
        //         }, 'utf-8',
        //         signCookie
        //     );
        // });
        // app.post('/jbooking/save', function(req, res) {
        //     var thatRes = res;
        //     var sreq = httpHelper.post(ajaxPublicUrl+"save", urls.ajaxDelayTime, req.body, function (err, data) {
        //             if (err) {
        //                 console.log("Got Err: " + err);
        //             }else{
        //                 // files.createHTML("./html/mock/getInsuranceInfos.js","module.exports = "+data);
        //                 // var data = require("./html/mock/getInsuranceInfos.js");
        //                 thatRes.send( data );
        //                 thatRes.end();
        //             };
        //         }, 'utf-8',
        //         signCookie
        //     );
        // });
    })();


    //单程
    ///list.html
    app.get(/\/[a-zA-Z]{3}\-[a-zA-Z]{3}\//, function(req, res) {

        var httpHelper = require('../utility/httphelper');
        var htmlHelper = require('../utility/htmlhelper');

        var thatRes = res;
        //var neworiginalUrl = "http://flight.elong.com" + req.originalUrl.replace('%22?','?');
        console.log(req.originalUrl.replace('%22?','?').replace('"?','?'));
        httpHelper.get("http://flight.elong.com" + req.originalUrl.replace('%22?','?'), 10000, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }
                //data = htmlHelper.removeHtml(data, "script");
                //console.log( data );
                data = htmlHelper.getBody(data);
                data = htmlHelper.upadteScript(data);
                thatRes.render('list', {title: '', content: data});
            }, 'utf-8'
        );
    });

 //ajax拦截转发/isajax/OneWay/GetPlaneType
    //单程S请求
    app.get('/isajax/OneWay/S', function(req, res) {
        //获取ajax get的url
        //console.log(req.originalUrl)
        var httpHelper = require('../utility/httphelper');
        var thatRes = res;

        httpHelper.get("http://flight.elong.com"+req.originalUrl, 1000, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });
    //返程S请求
    app.get('/isajax/RoundTrip/S1', function(req, res) {

        var httpHelper = require('../utility/httphelper');
        var thatRes = res;

        httpHelper.get("http://flight.elong.com"+req.originalUrl, 1000, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });
    app.post('/isajax/RoundTrip/S2', function(req, res) {

        var httpHelper = require('../utility/httphelper');
        var thatRes = res;

        httpHelper.post("http://flight.elong.com/isajax/RoundTrip/S2",  1000, req.body, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });
    app.get('/isajax/condition/GetLowestPrice', function(req, res) {

        var httpHelper = require('../utility/httphelper');
        var thatRes = res;

        httpHelper.get("http://flight.elong.com"+req.originalUrl, 1000, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });
    app.get('/isajax/OneWay/GetPlaneType', function(req, res) {

        var httpHelper = require('../utility/httphelper');
        var thatRes = res;

        httpHelper.get("http://flight.elong.com"+req.originalUrl, 1000, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });
    //更多舱位
    app.post('/isajax/OneWay/GetMorePrices', function(req, res) {
        //这样能获取到post的data
        //console.log(req.body);
        var httpHelper = require('../utility/httphelper');
        var thatRes = res;

        httpHelper.post("http://flight.elong.com/isajax/OneWay/GetMorePrices", 1000, req.body, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });
    //更多低价
    app.get('/isajax/OneWay/GetLowestPrice', function(req, res) {
        //这样能获取到post的data

        var httpHelper = require('../utility/httphelper');
        var thatRes = res;
        console.log('GetLowestPrice');
        var index = req.originalUrl.indexOf('?');

        httpHelper.get('http://flight.elong.com'+req.originalUrl, 1000, function (err, data) {
            console.log( data )
            if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });


    //往返
    app.get('/isajax/RoundTrip/S1', function(req, res) {

        var httpHelper = require('../utility/httphelper');
        var thatRes = res;

        httpHelper.get("http://flight.elong.com"+req.originalUrl, 1000, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });
    app.post('/isajax/RoundTrip/GetIsProvideInvoiceByPoid', function(req, res) {
        //这样能获取到post的data
        //console.log(req.body);
        var httpHelper = require('../utility/httphelper');
        var thatRes = res;

        httpHelper.post("http://flight.elong.com/isajax/RoundTrip/GetIsProvideInvoiceByPoid", 1000, req.body, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });
    app.post('/isajax/RoundTrip/GetPromotions', function(req, res) {
        //这样能获取到post的data
        //console.log(req.body);
        var httpHelper = require('../utility/httphelper');
        var thatRes = res;

        httpHelper.post("http://flight.elong.com/isajax/RoundTrip/GetPromotions", 1000, req.body, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });
    app.post('/isajax/RoundTrip/GetPromotInfo', function(req, res) {
        //这样能获取到post的data
        //console.log(req.body);
        var httpHelper = require('../utility/httphelper');
        var thatRes = res;

        httpHelper.post("http://flight.elong.com/isajax/RoundTrip/GetPromotInfo", 1000, req.body, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });
    app.post('/isajax/RoundTrip/GetMorePrices1', function(req, res) {
        //这样能获取到post的data
        //console.log(req.body);
        var httpHelper = require('../utility/httphelper');
        var thatRes = res;

        httpHelper.post("http://flight.elong.com/isajax/RoundTrip/GetMorePrices1", 1000, req.body, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });
    app.post('/isajax/RoundTrip/GetMorePrices2', function(req, res) {
        //这样能获取到post的data
        //console.log(req.body);
        var httpHelper = require('../utility/httphelper');
        var thatRes = res;

        httpHelper.post("http://flight.elong.com/isajax/RoundTrip/GetMorePrices2", 1000, req.body, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });
    app.post('/isajax/RoundTrip/BookingOrder1', function(req, res) {
        //这样能获取到post的data
        //console.log(req.body);
        var httpHelper = require('../utility/httphelper');
        var thatRes = res;

        httpHelper.post("http://flight.elong.com/isajax/RoundTrip/BookingOrder1", 1000, req.body, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });
    app.post('/isajax/RoundTrip/GetPlaneType', function(req, res) {
        //这样能获取到post的data
        //console.log(req.body);
        var httpHelper = require('../utility/httphelper');
        var thatRes = res;

        httpHelper.post("http://flight.elong.com/isajax/RoundTrip/GetPlaneType", 1000, req.body, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });
    app.post('/isajax/RoundTrip/ClassDescription', function(req, res) {
        //这样能获取到post的data
        //console.log(req.body);
        var httpHelper = require('../utility/httphelper');
        var thatRes = res;

        httpHelper.post("http://flight.elong.com/isajax/RoundTrip/ClassDescription", 1000, req.body, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });
    app.post('/isajax/RoundTrip/GetStopOverInfo', function(req, res) {
        //这样能获取到post的data
        //console.log(req.body);
        var httpHelper = require('../utility/httphelper');
        var thatRes = res;

        httpHelper.post("http://flight.elong.com/isajax/RoundTrip/GetStopOverInfo", 1000, req.body, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });
    app.post('/isajax/RoundTrip/GetMileageDescription', function(req, res) {
        //这样能获取到post的data
        //console.log(req.body);
        var httpHelper = require('../utility/httphelper');
        var thatRes = res;

        httpHelper.post("http://flight.elong.com/isajax/RoundTrip/GetMileageDescription", 1000, req.body, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });
    app.post('/isajax/RoundTrip/GetRoundPackage', function(req, res) {
        //这样能获取到post的data
        //console.log(req.body);
        var httpHelper = require('../utility/httphelper');
        var thatRes = res;

        httpHelper.post("http://flight.elong.com/isajax/RoundTrip/GetRoundPackage", 1000, req.body, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });
    app.post('/isajax/RoundTrip/GetStopOverInfo', function(req, res) {
        //这样能获取到post的data
        //console.log(req.body);
        var httpHelper = require('../utility/httphelper');
        var thatRes = res;

        httpHelper.post("http://flight.elong.com/isajax/RoundTrip/GetStopOverInfo", 1000, req.body, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });
    app.post('/isajax/RoundTrip/S1', function(req, res) {
        //这样能获取到post的data
        //console.log(req.body);
        var httpHelper = require('../utility/httphelper');
        var thatRes = res;

        httpHelper.post("http://flight.elong.com/isajax/RoundTrip/S1", 1000, req.body, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });
    app.post('/isajax/RoundTrip/S2', function(req, res) {
        //这样能获取到post的data
        //console.log(req.body);
        var httpHelper = require('../utility/httphelper');
        var thatRes = res;

        httpHelper.post("http://flight.elong.com/isajax/RoundTrip/S2", 1000, req.body, function (err, data) {
                if (err) {
                    console.log("Got Err: " + err);
                }else{
                    thatRes.send(data);
                    thatRes.end();
                }
            }, 'utf-8'
        );
    });
};
