/// 
/// Factory
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />

module app.Services {
    'use strict';

    export interface IDataService {
        GetHeatPumpParams(): Function;
        Status: string;
    }

    export class DataService {
        private urlBase = 'http://api.neogrid.dk/arrowhead/trigger';
        private url = "http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=imperial&cnt=14&callback=JSON_CALLBACK&q=Aalborg";
        private http: ng.IHttpService;
        private location: ng.ILocationService;
        private resource;
        public Status;

        static $inject = ['$resource', '$http'];
        constructor($resource, $http) {
            this.resource = $resource;
            this.http = $http;
            console.debug("This is our dummy function. $http is provided: " + (!!$http));

            this.Status = "Created";
            console.debug('Hello Service');
        }



        public GetHeatPumpParams() {
            return this.http.jsonp(this.url);

            //this.http({
            //    method: 'JSONP',
            //    url: this.urlb,
            //    headers: { 'X-Parse-Application-Id': 'XXXXX', 'X-Parse-REST-API-Key': 'YYYYY' }
            //}).success(function (data) {
            //        var weather = [];
            //        angular.forEach(data.list, function (value) {
            //            weather.push(value);
            //        });
            //        console.debug('in http');
            //        console.debug(data);
            //        this.dataset = weather;
            //    }).error(function (error) { console.debug(error); });
         
        }
    }
}

app.registerService('DataService', ['$http']);    