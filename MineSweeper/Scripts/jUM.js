// Grid Builder Module
console.debug("jQueryUtilitiesModule attached.");

var jQueryUtilitiesModule = (function ($) {

    // ## Render Grid ##

    function renderGrid (gridSize, appendTo, templateId ) {

        

        
        for (var i = 0; i < gridSize; i++) {

            for (var j = 0; j < gridSize; j++) {

                var $gridCell = getTemplateClone(templateId);

                // Set cell dimensions
                var dimension = ((100 / gridSize) - 1).toString() + "%";
                $gridCell.css({
                    "float": "left",
                    "position": "relative",
                    "padding-bottom": dimension,
                    "margin":"1px",
                    "width": dimension
                });

                // Set individual cell attributes
                $gridCell.data("prox", 0);

                $gridCell.addClass("masked");
                $gridCell.attr("id",i+"-"+j)
                $gridCell.addClass("div-normal");

                // Hadlers

                // disables right-click context menu
                $gridCell.contextmenu(function () {
                    return false;
                });

                //$gridCell.on("click", Main.page.handlers.onCellClick);
                $gridCell.mouseup(function (e) {
                    switch (e.which) {
                        case 1:
                            Main.page.handlers.onCellClick($(this));
                            break;
                        case 3:
                            Main.page.handlers.rightClickHandle($(this)); 
                        default:
                    }
                });

                // Append
                $(appendTo).append($gridCell);
                
            }
        }
        
    };


    // ## Get Template Clone ##

    function getTemplateClone(id) {
        return $($(id).clone().html());
    }

    return {
        renderGrid: renderGrid,
        getTemplateClone: getTemplateClone

};
    })(jQuery);
