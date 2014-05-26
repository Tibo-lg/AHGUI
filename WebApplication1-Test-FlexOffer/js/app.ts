// Declare app level module which depends on filters, and services
/// <reference path='_all.ts' />

'use strict';

//modules:'app.controllers', 'app.directives', 'app.filters', 'app.services'
var modules = ['app.Controllers', 'app.Directives', 'app.Services'];
modules.forEach(function (module) { angular.module(module, []); });
modules.push('ngRoute');
modules.push('ngAnimate');
modules.push('ngSanitize');
modules.push('ngResource');
modules.push('ngCookies');

modules.push('mgcrea.ngStrap');
//modules.push('ui.bootstrap');

angular.module('app', modules);

angular.module('app').config(['$routeProvider',
    function ($routeProvider){
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

module app {
    export module Controllers { null; }
    export module Directives { null; }
    export module Services { null; }

    export interface FlexOffer {
        id: number;
        timeslices: Array<TimeSlice>;
    }
    
    // barValues is a needed for manipulated data. 
    export interface TimeSlice {
        date: string;
        minConsumption: number;
        maxConsumption: number;
        barValues: any;
    }

    export interface Schedule {
        date: string;
        consumption: number;
    }
    export interface Temperature {
        date: string;
        temperature: number;
    }

    export interface Values {
        [name: string]: Array<number>;
    }

    /**
     * Register new controller.
     *
     * @param className
     * @param services
     */
    export function registerController(className: string, services = []) {
        var controller = 'app.Controllers.' + className;
        services.push(app.Controllers[className]);
        angular.module('app.Controllers').controller(controller, services);
    }

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
    export function registerDirective(directive: string, services = []) {
        services.push(app.Directives[directive]);
        angular.module('app.Directives').directive(directive, services);
    }
    
    /**
     * Register new service.
     *
     * @param className
     * @param services
     */
        export function registerService (className: string, services = []) {
            var service = className[0].toLowerCase() + className.slice(1);
            services.push(() => new app.Services[className]());
            console.debug(service, services);
            angular.module('app.Services').factory(service, services);
        }
     /**
     * Register new factory.
     *
     * @param className
     * @param services
     */
        //export function registerFactory(className: string, services = []) {
        //    var factory = className[0].toLowerCase() + className.slice(1);
        //    services.push(() => new app.Factories[className]());
        //    angular.module('app.Factories').factory(factory, services);
        //}
}