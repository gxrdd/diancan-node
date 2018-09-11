//引用模块
var express = require("express");
var session = require('express-session')
var mongoose = require("mongoose")
//路由
var common_router = require("./router/common-router.js");
//创建APP
var app = express();
mongoose.connect('mongodb://localhost:27017/diancanxitong');
//设置session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'diancan', //加密字符串，我们下发的随机乱码都是依靠这个字符串加密的
    resave: false,
    saveUninitialized: true
}));

//设置默认模板引擎
app.set("view engine","ejs");
app.use ("/public",express.static("public"));//建立静态资源路由映射
app.use("/upload",express.static("upload"));


app.get ("/"                                ,common_router.showIndex);          //首页
app.post("/checklogin"                      ,common_router.checkLogin);         //Ajax接口，检查登录是否成功，能够返回{result:-2}
app.get('/classfig'                         ,common_router.showClass)//显示分类
app.get('/clasFigall'                       ,common_router.getAllclass)//得到多有类
app.post('/dopost'                          ,common_router.dopost)//添加菜类
app.post("/classDelete"                     ,common_router.classDelete);        //Ajax的接口，删除课程


app.get('/list'                             ,common_router.showList)//显示列表
app.get('/cais'                             ,common_router.getAllcai)
app.get('/add'                              ,common_router.showAdd)//显示分类
app.post ("/caipost"                        ,common_router.caipost);      //加载上传表单

app.delete('/del/:sid'                      ,common_router.delcai)//删除
app.get('/cai/:sid'                         ,common_router.showUpdate)//更新
app.post('/updata/:sid'                     ,common_router.updataClient)//提交更新页

app.get('/getall'                           ,common_router.getall)//所有的菜

app.get('/sou',common_router.getsou)//搜索
app.get('/tuichu'                           ,common_router.tuchu)



//监听
app.listen(3000);