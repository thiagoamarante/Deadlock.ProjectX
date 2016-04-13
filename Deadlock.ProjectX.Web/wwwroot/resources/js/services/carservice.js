System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
            exports_1("CarService", CarService);
        }
    }
});
//# sourceMappingURL=carservice.js.map