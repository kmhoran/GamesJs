// --> Tic Tac Toe Functionality <--
//var Element = ticTacToe.controllers;


// ## Top-level properties ##

ticTacToe.grid = {

    render: function () {
        var $gameBox = $(ticTacToe.controllers.gameBox);
        //console.log(Element.gameBox);
        console.log(ticTacToe.controllers.gameBox)
        var $divCell;
        var count = 0;
        for (var i = 0; i < ticTacToe.gridsize; i++) {

            for (var j = 0; j < ticTacToe.gridsize; j++) {
                count += 1;
                $divCell = $($(ticTacToe.controllers.divCell).clone().html());
                $divCell.attr("id", "cell-" + count);
                $divCell.data("id", count);
                $divCell.addClass("div-normal");
                $gameBox.append($divCell);
            }
        }
    }
}

// ## ticTacToe.Page Methods ##

// To be built on HTML; specific to grid size 
ticTacToe.page.addToScoreCard = function () { console.debug("scoring not linked correctly"); };

ticTacToe.page.nextTurn = function (turnName) {
    ticTacToe.currentTurn = turnName;
    var XorO = ticTacToe.services.XorO.getObject(ticTacToe.currentTurn);
    $(ticTacToe.controllers.body).attr("class", turnName);
    var notification;

    ticTacToe.services.output.slideUpdateText($(ticTacToe.controllers.messageBoard), XorO.turnNotification);
};

ticTacToe.page.onOpenCellClick = function () {
    var XorO = ticTacToe.services.XorO.getObject(ticTacToe.currentTurn);
    var nextUp = XorO.nextUp;
    var scoreCard = XorO.scoreCard;
    var $marker = $($(ticTacToe.controllers.marker).clone().html());
    $marker.attr("src", XorO.imgSource);
    var thisIndex = $(this).data("id");
    $(this).removeClass("open");
    $(this).off();


    ticTacToe.page.addToScoreCard(thisIndex, scoreCard);
    
    $(this).find(".content").append($marker);
    ticTacToe.turnsRemaining -= 1;
    
    if (ticTacToe.page.isVictory(scoreCard)) {
        ticTacToe.page.displayVicotyScreen();
        return true;
    }
    if (ticTacToe.page.isCatsGame()) {
        $(ticTacToe.controllers.body).removeClass();
        $(ticTacToe.controllers.messageBoard).text("Cat's Game...");
        return true;
    }

    ticTacToe.page.nextTurn(nextUp);
};

ticTacToe.page.isVictory = function (scoreCard) {
    for (var i = 0; i < scoreCard.length; i++) {
        var arrayProduct =  scoreCard[i].reduce(function (a,b) {
            return a * b;
        });
        if (arrayProduct != 0) {
            ticTacToe.winningArray = scoreCard[i];
            return true
        }
    } return false;
};

ticTacToe.page.displayVicotyScreen = function () {
    var XorO = ticTacToe.services.XorO.getObject(ticTacToe.currentTurn);
    var notification = XorO.victoryNotification;

    $(ticTacToe.controllers.body).attr("class", "body-victory");
    for (var i = 0; i < ticTacToe.winningArray.length; i++) {
        var $thisCell = $("#cell-" + ticTacToe.winningArray[i]);
        $thisCell.addClass("cell-victory");
        $thisCell.removeClass("div-normal")
    }
    $(".div-normal.open").off();
    $(".div-normal.open").removeClass("open");
    

    ticTacToe.services.output.slideUpdateText($(ticTacToe.controllers.messageBoard), notification);
};

ticTacToe.page.isCatsGame = function () {
    return ticTacToe.turnsRemaining <= 0;

};

