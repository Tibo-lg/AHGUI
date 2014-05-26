angular.module('app')
    .factory('dataFactory', ['$http', function ($http) {

        var url = "http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=imperial&cnt=14&callback=JSON_CALLBACK&q=Aalborg";
        var urlBase = 'http://api.neogrid.dk/arrowhead/trigger';
        var dataFactory = {};

        return {
            getHPParam: function () {
            return $http.jsonp(url);
        }
        }
 }]); 