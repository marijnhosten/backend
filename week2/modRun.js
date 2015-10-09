var Loader = require("./modLoader.js");

var usersIds = ["P0","P1","P2","ERROR","P3","P4"];
var users = [];

Loader.loadArrayAsync(users, usersIds, function(err, arr, duration){
    if(err === "ERROR"){
        console.log("er is een error " + new Date().getMilliseconds());
    }else {
        console.log("De laadtijd is: " + Loader.duration());
    }

});