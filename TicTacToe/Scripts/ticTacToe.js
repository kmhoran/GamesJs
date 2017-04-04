var ticTacToe = {
  layout: {},
  controllers: {},
  page: {
    handlers: {},
    startUp: null
  },
  services: { blogs: {} }
};

ticTacToe.layout.startUp = function () {
    if(ticTacToe.page.startUp){
      console.debug("ticTacToe.layout.startUp has fired and found ticTacToe.page.startUp.");
      ticTacToe.page.startUp();
    }
};

$(document).ready(ticTacToe.layout.startUp);