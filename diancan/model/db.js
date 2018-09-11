var mongoose=require("mongoose")

var adminSchema = mongoose.Schema({
    "sid": Number,
    "name": String

});
var classfig = mongoose.model("classfig",adminSchema);

exports.getAll = function(callback){
    classfig.find({}).sort({"sid":1}).exec(function(err,results){
        // console.log(results)
        callback(results);
    });
};
exports.add=function(json,callback){
    classfig.create(json,function (err,r) {

        callback(err,r);
    })
}
exports.delete=function(arr,callback){
    var _arr = [];
    arr.forEach(function(item){
        _arr.push({"_id" : item});
    });
    //删除_id为这个，或者那个的。所以用$or引导！
    classfig.remove({$or : _arr},function(err,r){
        callback(err,r.n);
    });
}

// courseSchema.statics.delete = function(arr,callback){
//     var _arr = [];
//     arr.forEach(function(item){
//         _arr.push({"_id" : item});
//     });
//
//     //删除_id为这个，或者那个的。所以用$or引导！
//     this.remove({$or : _arr},function(err,r){
//         callback(err,r.n);
//     });
// };

