var mongoose=require("mongoose")

var adminSchema = mongoose.Schema({
    "username": String,
    "password": String,

});
var Admin = mongoose.model("guanli",adminSchema);
exports.guanli = function(fields,callback){
    Admin.find({"username":fields.yonhuming},function (err,data) {
        callback(err,data)
    })
};

