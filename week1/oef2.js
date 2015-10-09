(function () {'use strict';}());
// SYNCHROON

var users = [];
var usersIds = ["P0","P1","P2","ERROR","P3","P4"];
var delay = 1000;

/*
function loadSync(element, delay, cb) {

    var start = new Date().getTime();
    while (new Date().getTime() - start < delay) {
        //just wait

    }
    return "element: " + element + " loaded";
}

//monitoren van synchrone doorlooptijd
function loadArraySynchroon(array, elements, cb) {
    var start = new Date().getTime();

    for (var element in elements) {
        array[element] = loadSync(element, delay);
        console.log(array[element]); //informatie wanneer ingeladen
    }
    return (new Date().getTime() - start) + "\n";
}

console.log("synchronous load time: ", loadArraySynchroon(users, usersIds));
*/
// ASYNCHROON
var start = new Date().getTime();

var loadAsync = function(element, cb) {

    if(element === "ERROR"){
        cb("ERROR", null);
    } else {
        setTimeout(function (){
            cb(null, "element: " + element + " async loaded");
        }, delay);
    }


};

function loadArrayAsync(arrayA, elements, cb) {
    //var counter = 0;
    /*for (var element in elements) {
        loadAsync(element, function (err, element){

            if (err) {
                arrayA[counter] = element;
                cb(err, null);
            } else {
                arrayA[counter] = element; //undefined
                console.log(arrayA[counter]);

                if(++counter === elements.length) {
                    cb(arrayA);
                }
            }
        });
    }*/

    // is forEach sneller dan for? => ja, 2-5 ms
    // forEach returnt niet de index (1, 2, etc), maar wel het element ("P0", "P1", etc)
    elements.forEach(function(element, index){
        loadAsync(element, function (err, element){

            if (err) {
                arrayA[index] = element;
                cb(err, null);
            } else {
                arrayA[index] = element; //undefined
                console.log(arrayA[index]);

                if(++index === elements.length) {
                    cb(arrayA);
                }
            }
        });
    });
}

loadArrayAsync(users, usersIds, function (err, users) {
    if(err) {
        console.log(err);
    }
    console.log("async loadtime: " + (new Date().getTime() - start));
});