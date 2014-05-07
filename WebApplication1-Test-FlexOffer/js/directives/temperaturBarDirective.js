///
/// Directives
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />
var app;
(function (app) {
    (function (Directives) {
        'use strict';

        function ngTem($window) {
            return {
                restrict: 'A',
                scope: { temperatures: '=' },
                link: function (scope, element, attrs) {
                    // Add the svg element to the dom
                    var svg = d3.select(element[0]).append('svg:svg');

                    // Browser onresize event
                    window.onresize = function () {
                        scope.$apply();
                    };

                    // Watch for resize event
                    scope.$watch(function () {
                        return $window.innerWidth;
                    }, function () {
                        scope.render(scope.temperatures);
                    });

                    // Watch for newData event
                    scope.$watch('temperatures', function (newTemperaturesData) {
                        scope.render(newTemperaturesData);
                    });

                    scope.render = function (temperaturesData) {
                        // Delete old data
                        svg.selectAll('*').remove();
                        if (!temperaturesData)
                            return;

                        // Margin and paddings
                        var margin = { top: 20, right: 30, bottom: 20, left: 30 };

                        var yAxisPaddaing = 0;

                        // Calculate the height and width of elements
                        //var height = (<HTMLElement><any>d3.select(element[0]).node()).offsetHeight - margin.top - margin.bottom;
                        var height = 300 - margin.top - margin.bottom;

                        //TODO HACKY DI HACK RIKKE - Properly should get the div element with a angular selector query
                        var width = d3.select(element[0]).node().parentNode.parentNode.parentNode.offsetWidth - margin.right - margin.left;

                        //TODO This barwitdh giver ingen mening Rikke
                        var barWidth = width / temperaturesData.length;
                        console.debug('width:' + width + ' height:' + height + ' datalength:' + temperaturesData.length + ' barWidth:' + barWidth);

                        // Adding width and heigt to the svg
                        svg.attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                        // Modified data for the xScale function. ParseDate is need when d.date is parsed in xScale
                        var parseDate = d3.time.format("%B %d, %Y, %X").parse;
                        var date = [];
                        date = temperaturesData.map(function (d) {
                            return parseDate(d.date);
                        });

                        // Scales
                        var xScale = d3.time.scale().domain(d3.extent(date)).range([barWidth, width - barWidth / 2]);

                        var yScale = d3.scale.linear().domain([0, d3.max(temperaturesData, function (d) {
                                return d.temperature;
                            })]).rangeRound([height, 0]);

                        // Make Axis
                        var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(temperaturesData.length).tickFormat(d3.time.format("%H"));

                        var yAxis = d3.svg.axis().scale(yScale).orient("left");

                        svg.select('g').append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

                        svg.select('g').append("g").attr("class", "axis").attr('transform', 'translate(' + yAxisPaddaing + ',0)').call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Celsius");

                        // Make temperature area
                        var area = d3.svg.area().x(function (d) {
                            return (xScale(parseDate(d.date)) - barWidth / 2);
                        }).y0(height).y1(function (d) {
                            return yScale(d.temperature);
                        });

                        svg.select('g').append("path").datum(temperaturesData).attr("class", "area").attr("d", area);

                        // Make temerature outline
                        var valueline = d3.svg.line().x(function (d) {
                            return (xScale(parseDate(d.date)) - barWidth / 2);
                        }).y(function (d) {
                            return yScale(d.temperature);
                        });

                        svg.select('g').append("path").attr("class", "temp line").attr("d", valueline(temperaturesData));
                    };
                }
            };
        }
        Directives.ngTem = ngTem;
    })(app.Directives || (app.Directives = {}));
    var Directives = app.Directives;
})(app || (app = {}));

app.registerDirective('ngTem', ['$window']);
//# sourceMappingURL=temperaturBarDirective.js.map
