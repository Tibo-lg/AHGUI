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
modules.push('ui.router');
modules.push('ui.bootstrap');

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

angular.module('app').config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/home");
  $urlRouterProvider.when("/heatpump", "/heatpump/getfo");
  $urlRouterProvider.when("/aggregator", "/aggregator/aggflex");
  $urlRouterProvider.when("/washingmachine", "/washingmachine/flex");
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'partials/home.html'
  })
  .state('about', {
    url: '/about',
    templateUrl: 'partials/about.html'
  })
  .state('washingmachine', {
    url: '/washingmachine',
    templateUrl: 'partials/washingmachine.html',
    controller: 'app.Controllers.WMCtrl',
    abstract: true
  })
  .state('washingmachine.flex', {
    url: '/flex',
    templateUrl: 'partials/flex.html'
  })
  .state('washingmachine.temperature', {
    url: '/temperature',
    templateUrl: 'partials/temperature.html'
  })
  .state('washingmachine.schedule', {
    url: '/schedule',
    templateUrl: 'partials/schedule.html'
  })
  .state('heatpump', {
    url: '/heatpump',
    templateUrl: 'partials/heatPump.html',
    controller: 'app.Controllers.FlexOfferCtrl',
    abstract: true
  })
  .state('heatpump.getfo', {
    url: '/getfo',
    templateUrl: 'partials/getFo.html'
  })
  .state('heatpump.flex', {
    url: '/flex',
    templateUrl: 'partials/flex.html'
  })
  .state('heatpump.temperature', {
    url: '/temperature',
    templateUrl: 'partials/temperature.html'
  })
  .state('heatpump.schedule', {
    url: '/schedule',
    templateUrl: 'partials/schedule.html'
  })
  .state('aggMain', {
    url: '/aggregator', 
    abstract: true,
    controller: 'app.Controllers.AggCtrl',
    templateUrl: 'partials/agg.html'
  })
  .state('aggMain.aggFlex', {
    url: '/aggflex',
    templateUrl: 'partials/aggFO.html'
  })
  .state('aggMain.aggSch', {
    url: '/aggsch',
    templateUrl: 'partials/aggSch.html'
  })
});

module app {
    export module Controllers { null; }
    export module Directives { null; }
    export module Services { null; }

    export function convertFlexOffer(original){
      console.debug("Generate Flex Offer ");
      console.debug(original);
      var fo = new FlexOffer();
      fo.startAfterTime = new Date(original.startAfterInterval*1000);
      fo.startBeforeTime = new Date(original.startBeforeInterval*1000);
      /** Get end time */
      fo.id = original.id;
      fo.energyFlexibility = 0;
      fo.timeFlexibility = (original.startBeforeInterval/3600 - original.startAfterInterval/3600);
      /**TODO take care of schedule */
      //fo.schedule = original.flexOfferSchedule;
      var sliceDelay=0;
      for(var i=0; i<original.slices.length; i++){
	var timeSlice = new TimeSlice();
	timeSlice.minConsumption = original.slices[i].energyConstraint.lower;
	timeSlice.maxConsumption = original.slices[i].energyConstraint.upper;
	fo.energyFlexibility += Math.round(timeSlice.maxConsumption - timeSlice.minConsumption);
	if(original.flexOfferSchedule == null || original.flexOfferSchedule.startInterval == 0){
	  timeSlice.date = new Date((original.startAfterInterval + sliceDelay )*1000);
	}else{
	  timeSlice.date = new Date((original.flexOfferSchedule.startInterval + sliceDelay )*1000);
	}
	sliceDelay += 3600/original.slices[i].duration;
	timeSlice.duration = original.slices[i].duration;
	if(original.flexOfferSchedule != null){
	  timeSlice.schedule = original.flexOfferSchedule.energyAmounts[i];
	}else{
	  timeSlice.schedule = null;
	}
	fo.timeslices.push(timeSlice);
      }
      fo.endTime = new Date((original.startBeforeInterval + sliceDelay)*1000);
      return fo;
    }
    export class FlexOffer {
        id: number;
	startAfterTime: Date;
	startBeforeTime: Date;
	endTime: Date;
        timeslices: Array<TimeSlice>;
	energyFlexibility: number;
	timeFlexibility: number;
	constructor(){
	  this.timeslices = new Array<TimeSlice>();
	}
    }

    export class AggFlexOffer {
      aggFlexOffer: FlexOffer;
      flexOffers: Array<FlexOffer>;
      constructor(){
	this.flexOffers = new Array<FlexOffer>();
      }
    }
    
    // barValues is a needed for manipulated data. 
    export class TimeSlice {
        date: Date;
	duration: number;
        minConsumption: number;
        maxConsumption: number;
	schedule: number;
        barValues: any;
	constructor(){}
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
