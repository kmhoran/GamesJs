// Two Way Switch module
var twoSwitch = (function () {

    //console.debug("twoSwitch_module.js found and executed");

    var key0;
    var key1;
    var object0 = {};
    var object1 = {};

    return {
        getObject: function (theKey) {
            return theKey == key0 ? object0 : object1;
        },
        setObjects: function (objectArray) {
            //objectArray Format: [[key0,object0],[key1, object1]]
            key0 = objectArray[0][0];
            object0 = objectArray[0][1];
            key1 = objectArray[1][0];
            object1 = objectArray[1][1];
        }
    };
})()
