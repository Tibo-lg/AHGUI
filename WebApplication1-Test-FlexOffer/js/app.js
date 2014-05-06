// Declare app level module which depends on filters, and services
/// <reference path='_all.ts' />
'use strict';
//modules:'app.controllers', 'app.directives', 'app.filters', 'app.services'
var modules = ['app.Controllers', 'app.Directives'];
modules.forEach(function (module) {
    angular.module(module, []);
});
modules.push('ngRoute');
modules.push('ngAnimate');
angular.module('app', modules);

angular.module('app').config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'partials/home.html'
        });
        $routeProvider.when('/heatpump', {
            templateUrl: 'partials/heatpump.html',
            controller: 'app.Controllers.FlexOfferCtrl'
        });
        $routeProvider.otherwise({
            redirectTo: '/home'
        });
    }]);

var app;
(function (app) {
    

    /**
    * Register new controller.
    *
    * @param className
    * @param services
    */
    function registerController(className, services) {
        if (typeof services === "undefined") { services = []; }
        var controller = 'app.Controllers.' + className;
        services.push(app.Controllers[className]);
        angular.module('app.Controllers').controller(controller, services);
    }
    app.registerController = registerController;

    /**
    * Register new filter.
    *
    * @param className
    * @param services
    */
    //    export function registerFilter (className: string, services = []) {
    //        var filter = className.toLowerCase();
    //        services.push(() => (new app.filters[className]()).filter);
    //        angular.module('app.filters').filter(filter, services);
    //    }
    /**
    * Register new directive.
    *
    * @param className
    * @param services
    */
    function registerDirective(directive, services) {
        if (typeof services === "undefined") { services = []; }
        services.push(app.Directives[directive]);
        angular.module('app.Directives').directive(directive, services);
    }
    app.registerDirective = registerDirective;
})(app || (app = {}));
//# sourceMappingURL=app.js.map
