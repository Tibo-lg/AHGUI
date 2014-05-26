// Declare app level module which depends on filters, and services
/// <reference path='_all.ts' />
'use strict';
//modules:'app.controllers', 'app.directives', 'app.filters', 'app.services'
var modules = ['app.Controllers', 'app.Directives', 'app.Services'];
modules.forEach(function (module) {
    angular.module(module, []);
});
modules.push('ngRoute');
modules.push('ngAnimate');
modules.push('ngSanitize');
modules.push('ngResource');
modules.push('ngCookies');

modules.push('mgcrea.ngStrap');

//modules.push('ui.bootstrap');
angular.module('app', modules);

angular.module('app').config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'partials/home.html'
        });
        $routeProvider.when('/about', {
            templateUrl: 'partials/about.html'
        });
        $routeProvider.when('/washingmachine', {
            templateUrl: 'partials/washingmachine.html'
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
    (function (Controllers) {
        null;
    })(app.Controllers || (app.Controllers = {}));
    var Controllers = app.Controllers;
    (function (Directives) {
        null;
    })(app.Directives || (app.Directives = {}));
    var Directives = app.Directives;
    (function (Services) {
        null;
    })(app.Services || (app.Services = {}));
    var Services = app.Services;

    

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

    /**
    * Register new service.
    *
    * @param className
    * @param services
    */
    function registerService(className, services) {
        if (typeof services === "undefined") { services = []; }
        var service = className[0].toLowerCase() + className.slice(1);
        services.push(function () {
            return new app.Services[className]();
        });
        console.debug(service, services);
        angular.module('app.Services').factory(service, services);
    }
    app.registerService = registerService;
})(app || (app = {}));
//# sourceMappingURL=app.js.map
