var path = require("path");
var formidable = require("formidable");
var Admin = require("../model/Admin.js")
var db=require('../model/db.js')
var cai=require('../model/cai.js')
var crypto = require("crypto");
var fs = require("fs");
var url=require('url')

var df = require("date-format");


//显示首页，就是/这个路由，它有两个作用，如果学生用户登录了，显示选课表单了，如果没有登录，就显示登录界面
exports.showIndex=function(req,res){
    res.render("index")
}
exports.checkLogin=function(req,res){
    var form = new formidable.IncomingForm()
    form.parse(req,function (err, fields) {
        Admin.guanli(fields,function (err,data) {
            if(err){
                res.send({"result":-1});
                return
            }
            if(data.length==0){
                res.send({"result":-2});
                return
            }
            var jiamiMiMa= crypto.createHmac('SHA256',fields.mima).digest('hex');
            if(jiamiMiMa==data[0].password){
                req.session.login = true;
                res.send({"result":1});
            }
            else{
                res.send({"result":-3});
            }
        })
    })

}

// exports.showClass=function (req,res) {
//     res.render('classfig')
//
// }
exports.showClass=function(req,res){
    if(req.session.login){
        res.render('classfig')
    }else{
        res.send("<a href='/'>请先登录</a>")
    }


}
exports.getAllclass=function(req,res){
        db.getAll(function(results){
            // console.log(results)
            res.json({"results" : results});
        })


}
exports.dopost=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        //保存！直接把fomidable拿到的表单JSON提交给数据库保存！不变形！
        db.add(fields,function(err,r){
            if(err){
                res.send("提交失败！");
            }else{
                res.send("提交成功");
            }
        })
    });

}

exports.classDelete=function(req,res){
    //得到要删除的数组
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        //HTTP请求的POST参数不能传数组，只能传递字符串。所以前台会把数组stringify
        //后台parse()
        var needToDelete = JSON.parse(fields.needToDelete);

        //调用模块的方法
        db.delete(needToDelete,function(err,n){
            if(err){
                res.send("-1");
            }else{
                res.send(n.toString());
            }
        });
    });

}

exports.getAllcai=function (req,res) {
    var page=url.parse(req.url,true).query.page-1||0;
    console.log(page)
    var pagenuber=5
    cai.count(function (err,count) {
        cai.page(pagenuber,page,function (err,result) {
            res.json({
                "pageAmount":Math.ceil(count/pagenuber),
                "result":result

            })

        })

    })


}

exports.showList=function(req,res){
    if(req.session.login){
        res.render('list')
    }else{
        res.send("<a href='/'>请先登录</a>")
    }


}


exports.showAdd=function(req,res){
    if(req.session.login){
        res.render('add')

    }else{
        res.send("<a href='/'>请先登录</a>")
    }

}
exports.caipost=function(req,res){
    var form = new formidable.IncomingForm();
    form.uploadDir = "./upload";
    form.parse(req, function(err, fields, files) {
        // console.log(1);
        var newname = df('yyyyMMddhhmmssSSS', new Date());
        // console.log(fields)
        fs.rename(files.tupian.path , "./upload/" + newname + ".jpg",function(err){
            if(err){
                res.end("error");
                return;
            }
            // console.log(newname)
            cai.add(fields.classfig,fields.name,fields.money,fields.paixu,newname,fields.areal,fields.states,fields.quality,fields.hot,function(err,r){
                if(err){
                    // res.json({results:-1})
                    res.send("<a href='/add'>提交失败</a>");
                }else{
                    // res.json({results:1})
                    res.send("<a href='/list'>提交成功</a>");

                }
            })

        });
    });

}

exports.delcai=function(req,res){
    var sid=req.params.sid;
    cai.del(sid,function (err,results) {
        if(err||results.length==0){
            res.json({"result":-1});
        }
        res.json({"result":1})

    })

}
exports.showUpdate=function(req,res){
    var sid=req.params.sid;
    cai.getone(sid,function (err,results) {
        if(results.length==0){
            res.send('查找此菜，请检查网址')
            return;
        }
        res.json({"info":results[0]})


    })

}

exports.updataClient=function(req,res){
    var id=req.params.sid;
    console.log(id)
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(fields);
        cai.updatecont({"_id":id},fields,function(data){
            res.json({"result":1});
        })
    });

}

exports.getall=function(req,res){
    cai.getAll(function (err,results) {
        res.jsonp(results);
    })

}

exports.getsou=function(req,res){

}


//搜索
exports.getsou = function(req,res,next){
    var yonghuming = url.parse(req.url,true).query.aaa;
    console.log(214456)
    console.log(yonghuming)

    cai.sousou(yonghuming,function (err,results) {
        console.log(results)


    })


}






















exports.gousou=function(req,res){
        var classfig = url.parse(req.url,true).query.aaa;
        var allresult = [];

}

exports.tuchu=function(req,res){
    req.session.login=false;
    res.redirect('/')
}








//显示404
exports.show404 = function(req,res){
    res.status(404).send("没有这个页面，请检查网址！");
}
