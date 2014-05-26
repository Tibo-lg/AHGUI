///
/// Factory
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />
var app;
(function (app) {
    (function (Services) {
        'use strict';

        var DataService = (function () {
            function DataService($resource, $http) {
                this.urlBase = 'http://api.neogrid.dk/arrowhead/trigger';
                this.url = "http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=imperial&cnt=14&callback=JSON_CALLBACK&q=Aalborg";
                this.resource = $resource;
                this.http = $http;
                console.debug("This is our dummy function. $http is provided: " + (!!$http));

                this.Status = "Created";
                console.debug('Hello Service');
            }
            DataService.prototype.GetHeatPumpParams = function () {
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
            };
            DataService.$inject = ['$resource', '$http'];
            return DataService;
        })();
        Services.DataService = DataService;
    })(app.Services || (app.Services = {}));
    var Services = app.Services;
})(app || (app = {}));

app.registerService('DataService', ['$http']);
//# sourceMappingURL=dataService.js.map
