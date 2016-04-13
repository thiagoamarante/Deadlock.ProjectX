System.register(['jquery', './services/carservice'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var $, carservice_1;
    var App;
    return {
        setters:[
            function ($_1) {
                $ = $_1;
            },
            function (carservice_1_1) {
                carservice_1 = carservice_1_1;
            }],
        execute: function() {
            App = (function () {
                function App(el) {
                    //el.innerHTML = "teste";
                    $(el).text("teste");
                    var service = new carservice_1.CarService(el);
                }
                return App;
            }());
            exports_1("App", App);
        }
    }
});
//# sourceMappingURL=app.js.map