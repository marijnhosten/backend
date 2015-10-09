(function (){"use strict"})();

var Loader = (function () {

    //private vars
    var startTime = startTime ? startTime : new Date().getTime();
    // de callback dient enkel nog om database call te emuleren
    var delay = 1000;


    //instance vars
    var duration = function () {
        return (new Date().getTime() - startTime);
    };

    var loadAsync = function (element, cb) {
        if(element === "ERROR"){
            cb("ERROR", null);
        } else {
            setTimeout(function (){
                cb(null, "element: " + element + " async loaded");
            }, delay);
        }
    };

    var loadArrayAsync = function (arrayA, elements, cb) {
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
    };

    return {
        loadArrayAsync: loadArrayAsync, //geen this
        duration: duration
    }

})();

// HELPER
function sleep (time){
    var start = new Date().getTime();
    while(new Date().getTime() - start < time){
        //just wait
    }
}

module.exports = Loader;