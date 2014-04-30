///
/// Directives
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />
var app;
(function (app) {
    (function (Directives) {
        'use strict';

        function ngBar($window) {
            return {
                restrict: 'A',
                scope: { timeslices: '=', schedule: '=' },
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
                        scope.render(scope.timeslices, scope.schedule);
                    });

                    // Watch for newData event
                    scope.$watch('timeslices', function (newTimeslices) {
                        scope.render(newTimeslices, scope.schedule);
                    });

                    scope.render = function (timesliceData, scheduleData) {
                        // Delete old data
                        svg.selectAll('*').remove();
                        if (!timesliceData)
                            return;

                        // Margin and paddings
                        var margin = { top: 20, right: 30, bottom: 20, left: 30 };
                        var barPadding = 5;
                        var yAxisPaddaing = -5;

                        // Calculate the height and width of elements
                        //var height = (<HTMLElement><any>d3.select(element[0]).node()).offsetHeight - margin.top - margin.bottom;
                        var height = 300 - margin.top - margin.bottom;
                        var width = d3.select(element[0]).node().offsetWidth - margin.right - margin.left;
                        var barWidth = width / timesliceData.length;
                        console.debug('width:' + width + ' height:' + height + ' datalength:' + timesliceData.length + ' barWidth:' + barWidth);

                        // Adding width and heigt to the svg
                        svg.attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                        // Modified data for the xScale function. ParseDate is need when d.date is parsed in xScale
                        var parseDate = d3.time.format("%B %d, %Y, %X").parse;

                        var date = [];
                        date = timesliceData.map(function (d) {
                            return parseDate(d.date);
                        });

                        // Scales
                        var xScale = d3.time.scale().domain(d3.extent(date)).range([barWidth / 2, width - barWidth / 2]);

                        var yScale = d3.scale.linear().domain([0, d3.max(timesliceData, function (d) {
                                return d.maxConsumption;
                            })]).rangeRound([height, 0]);

                        // The color scale will set the stacked bar. The range decides the colors. The domain is computed from the timeslice model.
                        var color = d3.scale.ordinal().range(["#FF4040", "#00AF64"]).domain(d3.keys(timesliceData[0]).filter(function (key) {
                            return key !== "date" && key !== "barValues";
                        }));

                        timesliceData.forEach(function (d) {
                            var y0 = 0;
                            d.barValues = color.domain().map(function (name) {
                                return { name: name, y0: y0, y1: +d[name] };
                            });

                            //TODO HAcky di hack: have to adjust y0 for the second mapping as the map function is funkieee
                            d.barValues[1].y0 += d.barValues[0].y1;
                        });

                        // Make svg Axis
                        var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(timesliceData.length).tickFormat(d3.time.format("%H"));

                        var yAxis = d3.svg.axis().scale(yScale).orient("left");

                        svg.select('g').append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

                        svg.select('g').append("g").attr("class", "axis").attr('transform', 'translate(' + yAxisPaddaing + ',0)').call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("kWh");

                        // Make bars
                        var consumption = svg.select('g').selectAll(".consumption").data(timesliceData).enter().append("g").attr("class", "g").attr("transform", function (d) {
                            return "translate(" + (xScale(parseDate(d.date)) - barWidth / 2) + ",0)";
                        });

                        consumption.selectAll("rect").data(function (d) {
                            return d.barValues;
                        }).enter().append("rect").attr("width", barWidth - barPadding).attr("y", function (d) {
                            return yScale(d.y1);
                        }).attr("height", function (d) {
                            return yScale(d.y0) - yScale(d.y1);
                        }).style("fill", function (d) {
                            return color(d.name);
                        });

                        // Make schedule line
                        var line = d3.svg.line().x(function (d) {
                            return (xScale(parseDate(d.date)));
                        }).y(function (d) {
                            return yScale(d.consumption);
                        });

                        svg.select('g').append("path").datum(scheduleData).attr("class", "line").attr("d", line);

                        // Make Legend
                        var legend = svg.selectAll(".legend").data(color.domain().slice().reverse()).enter().append("g").attr("class", "legend").attr("transform", function (d, i) {
                            return "translate(0," + i * 20 + ")";
                        });

                        legend.append("rect").attr("x", width - 18).attr("width", 18).attr("height", 18).style("fill", color);

                        legend.append("text").attr("x", width - 24).attr("y", 9).attr("dy", ".35em").style("text-anchor", "end").text(function (d) {
                            return d;
                        });
                    };
                }
            };
        }
        Directives.ngBar = ngBar;
    })(app.Directives || (app.Directives = {}));
    var Directives = app.Directives;
})(app || (app = {}));

app.registerDirective('ngBar', ['$window']);
//# sourceMappingURL=flexOfferBarDirective.js.map
