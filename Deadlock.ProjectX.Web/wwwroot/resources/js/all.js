System.register("models/icar", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("services/carservice", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var CarService;
    return {
        setters:[],
        execute: function() {
            CarService = (function () {
                function CarService(el) {
                    el.innerHTML = "teste2";
                }
                CarService.prototype.ListCars = function () {
                    return null;
                };
                return CarService;
            }());
            exports_2("CarService", CarService);
        }
    }
});
System.register("app", ['jquery', "services/carservice"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
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
            exports_3("App", App);
        }
    }
});
//# sourceMappingURL=all.js.map