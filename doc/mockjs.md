GitHub地址:
    https://github.com/nuysoft/Mock

Mockjs中文站:
    http://mockjs.com/

概述
Mock.js实现的功能
    基于 数据模板 生成数据
    基于 HTML模板 生成数据
    拦截并模拟 Ajax请求

用法
浏览器：
<!-- （必选）加载 Mock -->
<script src="http://mockjs.com/dist/mock.js"></script>
<script>
// 使用 Mock
var data = Mock.mock({
    'list|1-10': [{
        'id|+1': 1
    }]
});
$('<pre>').text(JSON.stringify(data, null, 4))
.appendTo('body')
</script>

返回值:
{
"list": [
    {
        "id": 1
    },
    {
        "id": 2
    },
    {
        "id": 3
    }
    ]
}

JQuery：
配置模拟数据：
Mock.mock('http://g.cn', {
    'name'     : '@name',
    'age|1-100': 100,
    'color'    : '@color'
});

发送Ajax请求：
$.ajax({
    url: 'http://g.cn',
    dataType:'json'
    }).done(function(data, status, xhr){
    console.log(
    JSON.stringify(data, null, 4)
    )
})；

返回数据：
// 结果1
{
"name": "Elizabeth Hall",
"age": 91,
"color": "#0e64ea"
}

// 结果2
{
"name": "Michael Taylor",
"age": 61,
"color": "#081086"
}

Node.js：
// 安装
npm install mockjs

// 使用
var Mock = require('mockjs');
var data = Mock.mock({
    'list|1-10': [{
        'id|+1': 1
    }]
});

console.log(JSON.stringify(data, null, 4))

mock数据mockData.js:
Mock.mock('http://www.baidu.com', {
    'name': '@name()',
    'age|1-100': 100,
    'color': '@color'
});

语法
Mock.js 的语法规范包括两部分：

数据模板定义（Data Temaplte Definition，DTD）
数据占位符定义（Data Placeholder Definition，DPD）


数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value

数据占位符定义 DPD
占位符 只是在属性值字符串中占个位置，并不出现在最终的属性值中。占位符 的格式为：

@占位符
@占位符(参数 [, 参数])

常用方法
Mock.mock( rurl?, rtype?, template|function(options) )
根据数据模板生成模拟数据。

参数的含义和默认值如下所示：

参数 rurl：可选。表示需要拦截的 URL，可以是 URL 字符串或 URL 正则。例如 /\/domain\/list.json/、'/domian/list.json'。
参数 rtype：可选。表示需要拦截的 Ajax 请求类型。例如 GET、POST、PUT、DELETE 等。
参数 template：可选。表示数据模板，可以是对象或字符串。例如 { 'data|1-10':[{}] }、'@EMAIL'。
参数 function(options)：可选。表示用于生成响应数据的函数。
参数 options：指向本次请求的 Ajax 选项集。
Mock.mockjax(library)
覆盖（拦截） Ajax 请求，目前内置支持 jQuery、Zepto、KISSY。

Mock.Random
Mock.Random 是一个工具类，用于生成各种随机数据。Mock.Random 的方法在数据模板中称为“占位符”，引用格式为 @占位符(参数 [, 参数]) 。

Mock.tpl(input, options, helpers, partials)
基于 Handlebars、Mustache 的 HTML 模板生成模拟数据。

方法使用详情请参考mock.js文档