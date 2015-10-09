var Loader = require('./ctorLoader.js');
var StringExtensions = require("./extension.js");


var users = [];
var usersIds = ["P1".encrypt(), "P2".encrypt(), "P3".encrypt(), "P4".encrypt(), "ERROR", "P6", "P7", "P8", "P9"];

var loader = new Loader();

loader.emitter.on("addedUser", function(element){
   console.log("emitter result: ", element);
});

loader.emitter.on("error", function(element){
    console.log("emitter error: ", element);
});

loader.loadArrayAsync(users, usersIds, function (err, arr, duration) {
    if (err) {
        console.log(err);
    } else {
        console.log("ctor doorlooptijd bedraagt :", duration);
    }
});

setTimeout(function () { process.exit() }, 15000 );