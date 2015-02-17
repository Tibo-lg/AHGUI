///
/// Directives - Obsolete - an example of Angularjs and do#
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />
var app;
(function (app) {
    (function (Directives) {
        'use strict';

        function ngSparkline() {
            var url = "http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=imperial&cnt=14&callback=JSON_CALLBACK&q=";
            return {
                restrict: 'A',
                require: '^ngCity',
                transclude: true,
                scope: {
                    ngCity: '@'
                },
                template: '<div class="sparkline"><div ng-transclude></div><h4>Weather for {{ngCity}}</h4><div class="graph"></div><div class="chart-two"></div><div class="chart"></div></div>',
                controller: [
                    '$scope', '$http', function ($scope, $http) {
                        $scope.getTemp = function (city) {
                            $http({
                                method: 'JSONP',
                                url: url + city
                            }).success(function (data) {
                                var weather = [];
                                angular.forEach(data.list, function (value) {
                                    weather.push(value);
                                });
                                $scope.weather = weather;
                            });
                        };
                    }
                ],
                link: function (scope, iElement, iAttrs, ctrl) {
                    scope.getTemp(iAttrs.ngCity);
                    scope.$watch('weather', function (newVal) {
                        // the `$watch` function will fire even if the
                        // weather property is undefined, so we'll
                        // check for it
                        if (newVal) {
                            var highs = [];

                            angular.forEach(scope.weather, function (value) {
                                var celcius = Math.ceil((value.temp.max - 32) * (5 / 9) * 10) / 10;
                                highs.push(celcius);
                            });
                            chartGraphOne(iElement, highs, iAttrs);
                            chartGraphTwo(iElement, highs, iAttrs);
                            chartGraphThree(iElement, highs, iAttrs);
                        }
                    });
                }
            };
        }
        Directives.ngSparkline = ngSparkline;

        var chartGraphTwo = function (element, data, attrs) {
            var margin = {
                top: 20, right: 30, bottom: 30, left: 30
            };

            var width = 600 - margin.right - margin.left, height = 400 - margin.top - margin.bottom, barpadding = 2;

            var barwidth = Math.round(width / data.length);

            var xScale = d3.scale.linear().domain([0, data.length]).range([0, width]);

            var yScale = d3.scale.linear().domain([0, d3.max(data, function (d) {
                    return d;
                })]).range([height, 0]);

            var svg = d3.select('.chart-two').append('svg:svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg.selectAll('rect').data(data).enter().append('rect').attr('class', 'bar').attr("x", function (d, i) {
                return xScale(i);
            }).attr('y', function (d) {
                return yScale(d);
            }).attr('width', barwidth - barpadding).attr('height', function (d, i) {
                return height - yScale(d);
            }).attr("fill", function (d) {
                return "rgb(0, 0, " + (d * 10) + ")";
            });

            svg.selectAll('text').data(data).enter().append('text').text(function (d) {
                return d;
            }).attr('x', function (d, i) {
                return xScale(i) + 20;
            }).attr('y', function (d) {
                return yScale(d) + 15;
            }).attr("dy", ".71em");

            var xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(data.length);

            var yAxis = d3.svg.axis().scale(yScale).orient('left');

            svg.append('g').attr('class', 'axis').attr('transform', 'translate(0,' + (height + 5) + ')').call(xAxis);

            svg.append('g').attr('class', 'axis').attr('transform', 'translate(-10,0)').call(yAxis);
        };

        var chartGraphOne = function (element, data, opts) {
            var width = opts.width || 420, height = opts.height || 250, padding = opts.padding || 30;
            var svg = d3.select(element[0]).append('svg:svg').attr('width', width).attr('height', height).attr('class', 'sparkline').append('g').attr('transform', 'translate(' + padding + ', ' + padding + ')');
            svg.selectAll('*').remove();

            var maxY = d3.max(data), x = d3.scale.linear().domain([0, data.length]).range([0, width]), y = d3.scale.linear().domain([0, maxY]).range([height, 0]), yAxis = d3.svg.axis().scale(y).orient('left').ticks(5);

            svg.append('g').attr('class', 'axis').call(yAxis);

            var line = d3.svg.line().interpolate('linear').x(function (d, i) {
                return x(i);
            }).y(function (d, i) {
                return y(d);
            });
            var path = svg.append('svg:path').data([data]).attr('d', line).attr('fill', 'none').attr('stroke', 'black').attr('stroke-width', '1');
        };
        var chartGraphThree = function (element, data, attrs) {
            var chartwidth = 420, barHeight = 20;

            var x = d3.scale.linear().domain([0, d3.max(data)]).range([0, chartwidth]);

            var chart = d3.select(".chart").append('svg:svg').attr("width", chartwidth).attr("height", barHeight * data.length);

            var bar = chart.selectAll("g").data(data).enter().append("g").attr("transform", function (d, i) {
                return "translate(0," + i * barHeight + ")";
            });

            bar.append("rect").attr("width", x).attr("height", barHeight - 1);

            bar.append("text").attr("x", function (d) {
                return x(d) - 3;
            }).attr("y", barHeight / 2).attr("dy", ".35em").text(function (d) {
                return d;
            });
        };

        function type(d) {
            d.value = +d.value; // coerce to number
            return d;
        }
        function ngCity() {
            return {
                controller: function ($scope) {
                }
            };
        }
        Directives.ngCity = ngCity;
    })(app.Directives || (app.Directives = {}));
    var Directives = app.Directives;
})(app || (app = {}));
app.registerDirective('ngCity', []);
app.registerDirective('ngSparkline', []);
