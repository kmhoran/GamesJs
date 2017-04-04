// JavaScript source code
var Main = {
    layout: {},
    page: {
        handlers: {},
        startUp:null
    },
    services:{ blogs:{}}
};

Main.layout.startUp = function () {
    if (Main.page.startUp) {
        console.debug("Main.layout.startUp has fired and found Main.page.startUp.");
        Main.page.startUp();
    }
}

$(document).ready(Main.layout.startUp);