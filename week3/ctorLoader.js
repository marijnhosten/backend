/*
 * constructor pattern for Loader
 *
 */

var Loader, module;

var events = require("events"),
    emitter = new events.EventEmitter();

Loader = function (array, elements) {

    //publieke eigenschappen voor initialisatie
    this.array = array;
    this.elements = elements;
    this.emitter = emitter;

    //pseudo-classe ( variabele zonder instantie/prototype)
    Loader.subject = "Gebruik van het constructor pattern";
};

Loader.prototype = {
    //instance properties
    //startTime: this.startTime? this.startTime: new Date().getTime(),
    self: this,

    _startTime: "",
    get startTime() { return _startTime ? _startTime:new Date().getTime(); },
    set startTime(value) { _startTime = value; },

    //instance methods
    duration: function () { return (new Date().getTime() - this.startTime); } ,
    loadAsync: function (element , cb) {
        if (element === "ERROR") {
            setTimeout(function () {
                cb("ERROR" , null);
            }, 1000);
        } else {
            setTimeout(function () { cb(null, element + " is loaded"); }, 1000);
        }
    },

    loadArrayAsync: function (arrayA , elements, cb) {
        this.startTime = new Date().getTime(); //reïnitialize
        var counter = 0;

        for (var element in elements) {
            if (element) {
                var sElement = elements[element];

                this.loadAsync(sElement, function (err, element) {
                    counter++;
                    if (err) {
                        arrayA[counter] = err;
                        emitter.emit("error", err);
                        cb(err, null);
                    } else {
                        arrayA[counter] = element; //undefined
                        emitter.emit("addedUser", element);
                    }
                    if (counter === elements.length) {
                        cb(null, arrayA , Loader.prototype.duration());
                    }
                });
            }
        }
    }
};

module.exports = Loader;  // het constructor object exporteren