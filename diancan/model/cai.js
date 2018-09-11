var mongoose=require("mongoose")

var adminSchema = mongoose.Schema({
    "classfig": String,
    "name": String,
    "money": Number,
    "paixu": Number,
    "tupian":String,
    "areal": String,
    "hot" : String,
    "quality" :String,
    "states" : String

});
var cai = mongoose.model("menushops",adminSchema);

exports.getAll = function(callback){
    cai.find({}).sort({"moeny":1}).exec(function(err,results){
        callback(err,results);
    });
};
exports.page=function(pagenuber,page,callback){
    cai.find({}).sort({"_id":1}).limit(pagenuber).skip(pagenuber*page).exec(function (err,reuslts) {
        callback(err,reuslts)
    })
}
exports.count=function(callback){
        cai.count({},function (err,count) {
            callback(err,count)
            
        })



}
exports.add=function(classfig,name,money,paixu,newname,areal,states,quality,hot,callback){
    cai.create({"classfig":classfig,"name":name,"money":money,"paixu":paixu,"tupian":newname,"areal":areal,"states":states,"quality":quality,"hot":hot},function (err,data) {
        callback(err,data)
    })
}

exports.del=function (sid,callback) {
    console.log(sid)
    cai.remove({"_id":sid},function (err,results) {
        callback(err,results)


    })

}

exports.getone=function (sid,callback) {
    cai.find({"_id":sid}).exec(function(err,results){
        callback(err,results);
    });


}

exports.updatecont=function(tj,set,callback){
    cai.update(tj,set,function(err,data){
        console.log(data)
        callback(data);
    })
}


exports.sousou = function(err,callback){
    cai.find({'classfig':err},function (err,results) {
        console.log(results)
     callback(err,results)
    });
}



// exports.delete=function(arr,callback){
//     var _arr = [];
//     arr.forEach(function(item){
//         _arr.push({"_id" : item});
//     });
//     //删除_id为这个，或者那个的。所以用$or引导！
//     classfig.remove({$or : _arr},function(err,r){
//         callback(err,r.n);
//     });
// }

