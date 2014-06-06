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
modules.push('ui.router');

modules.push('mgcrea.ngStrap');

//modules.push('ui.bootstrap');
angular.module('app', modules);

//angular.module('app').config(['$routeProvider',
//    function ($routeProvider){
//        $routeProvider.when('/home', {
//            templateUrl: 'partials/home.html'
//        });
//        $routeProvider.when('/about', {
//            templateUrl: 'partials/about.html'
//        });
//        $routeProvider.when('/washingmachine', {
//            templateUrl: 'partials/washingmachine.html'
//        });
//        $routeProvider.when('/heatpump', {
//            templateUrl: 'partials/heatPump.html',
//            controller: 'app.Controllers.FlexOfferCtrl'
//        });
//        $routeProvider.otherwise({
//            redirectTo: '/home'
//        });
//    }]);
angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    $urlRouterProvider.when("/heatpump", "/heatpump/getfo");
    $urlRouterProvider.when("/aggregator", "/aggregator/aggflex");
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'partials/home.html'
    }).state('about', {
        url: '/about',
        templateUrl: 'partials/about.html'
    }).state('washingmachine', {
        url: '/washingmachine',
        templateUrl: 'partials/washingmachine.html',
        controller: 'app.Controllers.WashingMachineFlexOfferCtrl'
    }).state('heatpump', {
        url: '/heatpump',
        templateUrl: 'partials/heatPump.html',
        controller: 'app.Controllers.FlexOfferCtrl',
        abstract: true
    }).state('heatpump.getfo', {
        url: '/getfo',
        templateUrl: 'partials/getFo.html'
    }).state('heatpump.flex', {
        url: '/flex',
        templateUrl: 'partials/flex.html'
    }).state('heatpump.temperature', {
        url: '/temperature',
        templateUrl: 'partials/temperature.html'
    }).state('heatpump.schedule', {
        url: '/schedule',
        templateUrl: 'partials/schedule.html'
    }).state('aggMain', {
        url: '/aggregator',
        abstract: true,
        controller: 'app.Controllers.AggCtrl',
        templateUrl: 'partials/agg.html'
    }).state('aggMain.aggFlex', {
        url: '/aggflex',
        templateUrl: 'partials/aggFO.html'
    }).state('aggMain.aggSch', {
        url: '/aggsch',
        templateUrl: 'partials/aggSch.html'
    });
});

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

    function convertFlexOffer(original) {
        console.debug("Generate Flex Offer ");
        console.debug(original);
        var fo = new FlexOffer();
        fo.startAfterTime = new Date(original.startAfterInterval * 1000);
        fo.startBeforeTime = new Date(original.startBeforeInterval * 1000);

        /** Get end time */
        fo.id = original.id;

        /**TODO take care of schedule */
        //fo.schedule = original.flexOfferSchedule;
        var sliceDelay = 0;
        for (var i = 0; i < original.slices.length; i++) {
            var timeSlice = new TimeSlice();
            timeSlice.minConsumption = original.slices[i].energyConstraint.lower;
            timeSlice.maxConsumption = original.slices[i].energyConstraint.upper;
            if (original.flexOfferSchedule == null || original.flexOfferSchedule.startInterval == 0) {
                timeSlice.date = new Date((original.startAfterInterval + sliceDelay) * 1000);
            } else {
                timeSlice.date = new Date((original.flexOfferSchedule.startInterval + sliceDelay) * 1000);
            }
            sliceDelay += 3600 / original.slices[i].duration;
            timeSlice.duration = original.slices[i].duration;
            if (original.flexOfferSchedule != null) {
                timeSlice.schedule = original.flexOfferSchedule.energyAmounts[i];
            } else {
                timeSlice.schedule = null;
            }
            fo.timeslices.push(timeSlice);
        }
        fo.endTime = new Date((original.startBeforeInterval + sliceDelay) * 1000);
        console.debug(fo);
        return fo;
    }
    app.convertFlexOffer = convertFlexOffer;
    var FlexOffer = (function () {
        function FlexOffer() {
            this.timeslices = new Array();
        }
        return FlexOffer;
    })();
    app.FlexOffer = FlexOffer;

    var AggFlexOffer = (function () {
        function AggFlexOffer() {
            this.flexOffers = new Array();
        }
        return AggFlexOffer;
    })();
    app.AggFlexOffer = AggFlexOffer;

    // barValues is a needed for manipulated data.
    var TimeSlice = (function () {
        function TimeSlice() {
        }
        return TimeSlice;
    })();
    app.TimeSlice = TimeSlice;

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
