// Ouput module
/*
* Requires jQuery
*/
var output = (function () {

    //console.debug("output_module.js found and executed");
 
    return {
        slideUpdateText: function ($object, text) {
            $object.slideUp();
            $object.queue(function () {
                $(this).text(text);
                $(this).dequeue();
            });
            $object.queue(function () {
                $(this).slideDown();
                $(this).dequeue();
            });
        }
    };

})()