// Declare app level module which depends on filters, and services
/// <reference path='_all.ts' />

'use strict';

//modules:'app.controllers', 'app.directives', 'app.filters', 'app.services'
var modules = ['app.Controllers', 'app.Directives'];
modules.forEach(function (module) { angular.module(module, []); });
modules.push('ngRoute');
angular.module('app', modules);

angular.module('app').config(['$routeProvider',
    function ($routeProvider){
     $routeProvider.when('/flexoffer', {
            templateUrl: 'partials/flexOffer.html',
         controller: 'app.Controllers.FlexOfferCtrl'
        });
        $routeProvider.otherwise({
            redirectTo: '/flexoffer'
        });
    }]);

module app {
    export module Controllers { }
    export module Directives { }
    export module filters { }
    export module services { }

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

    export interface ComfortSettings {
        setTemp: number;
        upperTemp: number;
        lowerTemp: number;
    }
    export interface Schedule {
        date: string;
        consumption: number;
    }
    export interface Temperature {
        date: string;
        temperature: number;
    }
    export interface HeatPump {
        id: number;
        insideTemp: number;
        outsideTemp: number;
        comfort: ComfortSettings;
        sunIndex: number;
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
    //    export function registerService (className: string, services = []) {
    //        var service = className[0].toLowerCase() + className.slice(1);
    //        services.push(() => new app.services[className]());
    //        angular.module('app.services').factory(service, services);
    //    }
}