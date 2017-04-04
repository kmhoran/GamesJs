// Main Common File //
console.debug("Main_Common.js is found and fired.");




// ## Utility Functions ## //

// > Misc

Main.page.runGame = function () {

    Main.isClockRunning = true;
    Main.clock = 0;
    Main.page.updateTimer()


    Main.flagsRemaining = Main.mineCount;
    
    Main.page.updateFlagsRemaining();

    $(Main.control.gameBoard).empty();

    Main.jQ.renderGrid(Main.gridSize, Main.control.gameBoard, Main.control.cellTemplate)
    
    Main.page.createMapArray();
    Main.page.plantMines();
    Main.page.finalDressup();
    Main.page.startClock();

}

Main.page.GloriousEnding = function () {

    // Stop clock
    Main.page.stopClock();
    

    // Set Win modal attributes
    $(Main.control.modWin.title).text(Main.control.modWin.titleText);
    $(Main.control.modWin.winTime).text(Main.page.formatClockDisplay((Main.clock - 1)));

    // Display Win Modal as static backdrop 
    $(Main.control.modWin.mod).modal({ backdrop: 'static', keyboard: false });

    // Reset Clock
    Main.clock = 0;
 
}

Main.page.checkForVictory = function () {
    if ($(".mine:not('.masked')").length > 0) {
        return false;
    }
    if ($(".masked").length <= Main.mineCount) {
        return true;
    }
    if ($(".mine:not('.flagged')").length <= 0) {
        return true;
    } else {
        return false;
    }
};

Main.page.getRandomCoordinates = function () {
    return [Math.floor(Math.random() * (Main.gridSize)), Math.floor(Math.random() * (Main.gridSize))];
}

Main.page.isItemInArray = function (array, item) {
    for (var i = 0; i < array.length; i++) {
        
        if (array[i][0] == item[0] && array[i][1] == item[1]) {
            return true;   // Found it
        }
    }
    return false;   // Not found
};

Main.page.getCellByID = function (coords) {
    return $("#" + coords[0] + "-" + coords[1]);
};


Main.page.finalDressup = function () {
    $(".splash").each(function dressUp() {
        var prox = "_" + $(this).data("prox").toString();
        $(this).addClass(prox);
    })
    $(Main.control.flagsRemainingFull).removeClass("oneFlagLeft");
};


Main.page.startClock = function () {
    setTimeout(function addSeconds() {
        if (Main.isClockRunning) {
            Main.clock += 1;
            Main.page.updateTimer();
            // console.log(Main.clock);
            setTimeout(arguments.callee, 1000);
        }

    }, 1000);
}

Main.page.stopClock = function () {
    Main.isClockRunning = false;
}

Main.page.formatClockDisplay = function (seconds) {
    var lessThan60 = seconds % 60;
    var minutes = Math.floor((seconds - lessThan60) / 60);
    return Main.page.zeroPad(minutes, 2).concat(":", Main.page.zeroPad(lessThan60, 2))
};

Main.page.zeroPad = function (num, size) {
    var str = num+"";
    while (str.length < size) {
        str = "0".concat(str);
    }
    return str;
}

// > Modal
Main.page.closeModal = function (modal) {
    $(modal.mod).modal("toggle");
};

Main.page.restartWithModal = function (modal) {
    var size = $(modal.gridSize).val();
    var mineCount = $(modal.mineCount).val();
    // console.log(size);
    // console.log(mineCount);
    // console.log(((size * size) - 1));

    if (mineCount > ((size * size) - 1)) {
        Main.page.resetModal(modal);
        alert("Too many mines for this paying field.");
        return false;
    }
    Main.gridSize = size;
    Main.mineCount = mineCount;
    Main.page.closeModal(modal);
    Main.page.resetModal(modal);

    Main.page.runGame();
};


Main.page.resetModal = function (modal) {
    $(modal.gridSize).val(9);
    $(modal.mineCount).val(10);
};


// > Map Array &c.
Main.page.createMapArray = function () {
    Main.mapArray = [];

    var size = Main.gridSize;

    for (var i = 0; i < size; i++) {
        var outerArray = [];
        for (var j = 0; j < size; j++) {
            var inner = 0;
            outerArray.push(inner);
        }
        Main.mapArray.push(outerArray);
    }

};

Main.page.createPayloadArray = function () {
    var payload = [];

    while (payload.length < Main.mineCount) {

        var coords = Main.page.getRandomCoordinates();
        //console.log(coords); //********************************* DELETE
        if (!Main.page.isItemInArray(payload, coords)) {
            payload.push(coords);
        }
    }
    Main.payload = payload;
};

Main.page.plantMines = function () {
    Main.page.createPayloadArray();
    
    for (var i = 0; i < Main.payload.length; i++) {
        var $mineCell = Main.page.getCellByID(Main.payload[i]);
        if ($mineCell.is(".splash")) {
            $mineCell.removeClass("splash");
            $mineCell.find(".table-cell").text("");
        }
        $mineCell.data("prox", 9);
        $mineCell.addClass("mine");

        Main.page.setMineSplash(Main.payload[i]);
        }
};

Main.page.setMineSplash = function (mineCoords) {
    //var i = 0;
    for (var i = 0; i <= 7; i++) {
        var newCoords = Main.page.getSplashCoord(mineCoords, i);
        var $splashCell = Main.page.getCellByID(newCoords);
        if(!$splashCell.is(".mine")){
            var newData = $splashCell.data("prox") + 1;
            $splashCell.data("prox", newData);
            $splashCell.addClass("splash");
            
        }
        
    }

}

// >> special sort function for Main.page.setMineSplash
Main.page.getSplashCoord = function (mineCoords, zeroToSeven) {
    var result = $.extend({},mineCoords);
    if(zeroToSeven == 0) {
        result[1] -= 1;
    }
    if(zeroToSeven == 1) {
        result[1] -= 1;
        result[0] -=1;
    }
    if(zeroToSeven == 2) {
        result[0] -= 1;
    }
    if(zeroToSeven == 3) {
        result[1] += 1;
        result[0] -=1;
    }
    if(zeroToSeven == 4) {
        result[1] += 1;
    }
    if(zeroToSeven == 5) {
        result[1] += 1;
        result[0] += 1;
    }
    if(zeroToSeven == 6) {
        result[0] += 1;
    }
    if(zeroToSeven == 7) {
        result[1] -= 1;
        result[0] += 1;
    }
       
    //console.log(result);
    return result;
}

// > Grid Cells
Main.page.unmask = function ($cell) {
    if ($cell.is(".flagged") || $cell.is(".caution")) {
        return true;
    }

    var prox = $cell.data("prox");

    if (prox == 0) {
        // Empty Cell is clicked
        Main.page.flowerUnmask($cell);
    }
    else if (prox < 9) {
        // Proximity cell is clicked
        $cell.removeClass("masked");
        $cell.find(".table-cell").text(prox);
    } else {
        // Mine Cell is clicked
        $(".mine").each(function () {
            if (!$(this).is(".flagged") ) {
                
                $(this).removeClass("masked");
                $bombImg = Main.jQ.getTemplateClone(Main.control.bombTemplate);
                $(this).removeClass("caution");
                $(this).find(".table-cell").text("");
                $(this).find(".table-cell").append($bombImg);
            }
            });
        setTimeout(function () {
            Main.control.modWin.titleText = "KA-BOOM! You Lose!";
            Main.page.GloriousEnding();
        }, 900);
    }
    if(Main.page.checkForVictory())
    {
        $(".masked").each(function flagAllMines() {
            Main.page.uncautionCell($(this));
            Main.page.flagCell($(this));
            Main.flagsRemaining = 0;
            Main.page.updateFlagsRemaining()
        })
        setTimeout(function () {
            Main.control.modWin.titleText = "Pretty Slick! You Win!";
            Main.page.GloriousEnding();
        }, 1500);
    }
}


Main.page.flowerUnmask = function ($cell) {
    if (!$cell.is(".masked") || $cell.is(".flagged") || $cell.is(".caution")) {
        return true;
    }
    $cell.removeClass("masked");

    var prox = $cell.data("prox");  
    if (prox > 0) {
        $cell.find(".table-cell").text(prox);
    }

    // If cell is empty 
    if ($cell.data("prox") == 0) {
        var coords = $cell.attr("id").split("-").map(Number);

        // unmask surrounding cells
        for (var i = 0; i < 8; i++) {
            var splashCoords = Main.page.getSplashCoord(coords, i);
            var $splashCell = Main.page.getCellByID(splashCoords);
            Main.page.flowerUnmask($splashCell);
        }
        //$(Main.control.gridCell+":not(.masked.splash)").removeClass
    }
}


// ## Handlers ## //

Main.page.handlers.onSettingsClick = function () {
    
    $(Main.control.modReset.mod).modal("toggle");
};

Main.page.handlers.onRestartWithModal = function () {
    var resetMod = Main.control.modReset.submitBtn;
    var winMod = Main.control.modWin.submitBtn;

    var buttonId = "#".concat($(this).attr("id"));

    if (buttonId == resetMod) {
        Main.page.restartWithModal(Main.control.modReset);
        return true;
    }
    if (buttonId = winMod) {
        Main.page.restartWithModal(Main.control.modWin);
        //$(Main.control.modWin).modal('toggle');
    }

}

Main.page.handlers.onModalReset = function () {
    var resetMod = Main.control.modReset.resetBtn;
    var winMod = Main.control.modWin.resetBtn;

    var buttonId = "#".concat($(this).attr("id"));
    if (buttonId == resetMod) {
        //console.log("onModalReset(reset)");
        Main.page.resetModal(Main.control.modReset);
        
        //return true;
    }
    if (buttonId == winMod) {
        // console.log("onModalReset(win)");
        Main.page.resetModal(Main.control.modWin);
        
        //return true;
    }
};

Main.page.handlers.onCellClick = function ($object) {
    Main.page.unmask($object);
}

Main.page.handlers.rightClickHandle = function ($object) {
    if (!$object.is(".masked")) {
        return true;
    }
    if ($object.is(".flagged")) {
        Main.page.unfalgCell($object);
        Main.page.cautionCell($object);
        Main.flagsRemaining += 1;
        Main.page.updateFlagsRemaining();

    } else if ($object.is(".caution")) {
        Main.page.uncautionCell($object);
    } else {
        
        Main.page.flagCell($object);
        Main.flagsRemaining -= 1;
        Main.page.updateFlagsRemaining();
    }
    if (Main.flagsRemaining == 1) {
        $(Main.control.flagsRemainingFull).addClass("oneFlagLeft");
    } else if (Main.flagsRemaining == 0) {
        if (Main.page.checkForVictory()) {
            setTimeout(function winFlags() {
                Main.control.modWin.titleText = "You Flagged all the Mines! You Win!";
                Main.page.GloriousEnding();
            }, 500);
            
        } else {
            setTimeout(function loseFlags() {
                Main.control.modWin.titleText = "You Flagged the Wrong Spots! You Lose!";
                Main.page.GloriousEnding();
            }, 500);
            
            
        }

        //Main.page.cautionCell($object);

        //Main.page.updateFlagsRemaining();
        return true;
    } else {
        $(Main.control.flagsRemainingFull).removeClass("oneFlagLeft");
    }
    
    
};


// DOM Manipulation

Main.page.updateTimer = function () {
    var clockDisplay = Main.page.formatClockDisplay(Main.clock);
    $(Main.control.gameTimer).text(clockDisplay);
};

Main.page.updateFlagsRemaining = function () {
    $(Main.control.flagsRemaining).text(Main.flagsRemaining);
};

Main.page.flagCell = function ($object) {
    $object.addClass("flagged");
    $object.find(".table-cell").addClass("glyphicon glyphicon-flag");
};

Main.page.unfalgCell = function ($object) {
    $object.removeClass("flagged ");
    $object.find(".table-cell").removeClass("glyphicon glyphicon-flag");
}

Main.page.cautionCell = function ($object) {
    $object.addClass("caution");
    $object.find(".table-cell").text("?");
};

Main.page.uncautionCell = function ($object) {
    $object.removeClass("caution");
    $object.find(".table-cell").text("");
};
