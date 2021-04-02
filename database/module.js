
var mongoose = require("mongoose");



let dbURI = "mongodb+srv://nomanali:03112515630@cluster0.03qvu.mongodb.net/first?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });


mongoose.connection.on('connected', function () {
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});



var userSchema = new mongoose.Schema({
    "name": String,
    "email": String,
    "password": String,
    "phone": String,
    "facebookId":String,
    "role": { "type": String, "default": "user" },
    "createdOn": { "type": Date, "default": Date.now },
    "activeSince": Date
});
var foodModel = mongoose.model("foodUsers", userSchema);

var otpSchema = new mongoose.Schema({
    "email": String,
    "otpCode": String,
    "createdOn": { "type": Date, "default": Date.now },
});
var otpModel = mongoose.model("otps", otpSchema);

var itemOrderSchema = new mongoose.Schema({
    "name": String,
    "email": String,
    "phone": String,
    "address": String,
    "status": String,
    "total": String,
    "orders": Array,
    "createdOn": { "type": Date, "default": Date.now },
})
var itemOrderModel = mongoose.model("Orders",itemOrderSchema)

var addProductSchema = new mongoose.Schema({
    price:String,
    image:String,
    product:String,
    createdOn: { "type": Date, "default": Date.now },
})
var addProductModel = mongoose.model("addproduct",addProductSchema)

module.exports = {
    foodModel: foodModel,
    otpModel: otpModel,
    itemOrderModel:itemOrderModel,
    addProductModel:addProductModel
    
}