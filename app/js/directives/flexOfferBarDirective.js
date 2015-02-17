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
                scope: { flexoffer: '=', drawschedule: '=' },
                link: function (scope, element, attrs) {
                    var dirWidth = element[0].clientWidth != 0 ? element[0].clientWidth : $window.innerWidth;

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
                        if (scope.flexoffer != null) {
                            scope.render(scope.flexoffer);
                        }
                    });

                    // Watch for newData event
                    scope.$watch('flexoffer', function (newFlexoffer) {
                        if (newFlexoffer != null) {
                            scope.render(newFlexoffer);
                        }
                    });

                    scope.render = function (flexoffer) {
                        var timesliceData = flexoffer.timeslices;

                        // Delete old data
                        svg.selectAll('*').remove();
                        if (!timesliceData)
                            return;

                        //TODO These should really be attributes input
                        // Margin and paddings
                        var margin = { top: 40, right: 40, bottom: 50, left: 60 };
                        var barPadding = 2;
                        var yAxisPadding = -5;

                        // Colours
                        var flex = "#64BE45";
                        var minimum = "#BEBEBE";
                        var sch = "#3914AF";

                        // Calculate the height and width of elements
                        //var height = (<HTMLElement><any>d3.select(element[0]).node().parentNode.parentNode).offsetHeight - margin.top - margin.bottom;
                        var height = 400 - margin.top - margin.bottom;

                        //TODO HAcky di hack Rikke!
                        var width = dirWidth;
                        width -= (margin.right + margin.left);
                        var start = +flexoffer.startAfterTime;
                        var lateStart = +flexoffer.startBeforeTime;
                        var end = +flexoffer.endTime;

                        /** Divide the width by the flex offer "duration" in hours */
                        var timeTicks = width / ((end - start) / 3600000);
                        var pixelTime = (end - start) / width;
                        var barWidth = timeTicks;

                        //console.debug('width:' + width + ' height:' + height + ' data-length:' + timesliceData.length + ' barWidth:' + barWidth);
                        //console.debug('test ' + element[0].clientWidth);
                        // Adding width and height to the svg
                        svg.attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                        // Modified data for the xScale function. ParseDate is need when d.date is parsed in xScale
                        var date = [];
                        date.push(flexoffer.startAfterTime, flexoffer.endTime);

                        // Scales
                        var yMax = d3.max(timesliceData, function (d) {
                            return d.maxConsumption;
                        });
                        var xScale = d3.time.scale().domain(d3.extent(date)).range([0, width]);

                        var yScale = d3.scale.linear().domain([0, yMax]).rangeRound([height, 0]);

                        // The color scale will set the stacked bar. The range decides the colors. The domain is computed from the timeslice model.
                        var color;

                        color = d3.scale.ordinal().range([minimum, flex]).domain(d3.keys(timesliceData[0]).filter(function (key) {
                            return key !== "date" && key !== "barValues" && key !== "duration" && key !== "schedule";
                        }));
                        timesliceData.forEach(function (d) {
                            var y0 = 0;
                            d.barValues = color.domain().map(function (name) {
                                return { name: name, y0: y0, y1: +d[name], duration: d.duration };
                            });

                            //TODO Hacky di hack: have to adjust y0 for the second mapping as the map function is funkieee
                            d.barValues[1].y0 += d.barValues[0].y1;
                        });

                        // Make svg Axis
                        var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks((end - start) / 3600000);
                        if (barWidth > 100) {
                            xAxis.tickFormat(d3.time.format("%H:%M"));
                        } else {
                            xAxis.tickFormat(d3.time.format("%H"));
                        }

                        var yAxis = d3.svg.axis().scale(yScale).orient("left");

                        svg.select('g').append("g").attr("class", "axis").attr("transform", "translate(0," + height + ")").call(xAxis);

                        svg.select('g').append("g").attr("class", "axis").attr('transform', 'translate(' + yAxisPadding + ',0)').call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("kWh");

                        // Make bars
                        var barGroup = svg.select('g').selectAll('.consumption').data(timesliceData);

                        //.data(timesliceData);
                        var consumption = barGroup.enter().append("g").attr("class", "g ").attr("transform", function (d) {
                            return "translate(" + (xScale(d.date)) + ",0)";
                        });

                        consumption.selectAll("rect").data(function (d) {
                            return d.barValues;
                        }).enter().append("rect").attr("width", function (d) {
                            return (barWidth / d.duration - barPadding);
                        }).attr("y", function (d) {
                            return yScale(d.y1);
                        }).attr("height", function (d) {
                            return yScale(d.y0) - yScale(d.y1);
                        }).style("fill", function (d) {
                            return color(d.name);
                        });

                        // Make schedule line
                        if (scope.drawschedule == true) {
                            var end = new app.TimeSlice();
                            var last = timesliceData[timesliceData.length - 1];
                            end.date = new Date(+last.date + 3600 * 1000 / last.duration);
                            end.schedule = last.schedule;
                            var line = d3.svg.line().x(function (d, i) {
                                return xScale(d.date);
                            }).y(function (d) {
                                return yScale(d.schedule);
                            }).interpolate("step-after");

                            svg.select('g').append("path").attr("class", "line").attr("d", line(timesliceData.concat(end))).style("stroke", sch).style("stroke-width", 3);
                            color.range([minimum, flex, sch]).domain(d3.keys(timesliceData[0]).filter(function (key) {
                                return key !== "date" && key !== "barValues" && key !== "duration";
                            }));
                        }

                        // Make Legend
                        var lWidth = 150 * color.range().length;
                        var lX = (width + margin.left + margin.right) / 2 - lWidth / 2;
                        var legend = svg.selectAll(".legend").data(color.domain().slice().reverse()).enter().append("g").attr("class", "legend").attr("transform", function (d, i) {
                            return "translate(" + i * 150 + ", 0)";
                        });

                        legend.append("rect").attr("x", lX).attr("y", 380).attr("width", 18).attr("height", 18).style("fill", color);

                        legend.append("text").attr("x", 20 + lX).attr("y", 390).attr("dy", ".35em").text(function (d) {
                            return d;
                        });

                        //Drag
                        if (scope.drawschedule == false) {
                            var drag = d3.behavior.drag().on("drag", function () {
                                /** Filter weird dx that create jumps */
                                if (d3.event.dx < 50) {
                                    var delta = d3.event.dx * pixelTime;
                                    if (+scope.flexoffer.timeslices[0].date + delta > +scope.flexoffer.startBeforeTime) {
                                        delta = +scope.flexoffer.startBeforeTime - +scope.flexoffer.timeslices[0].date;
                                    }
                                    if (+scope.flexoffer.timeslices[0].date + delta < +scope.flexoffer.startAfterTime) {
                                        delta = +scope.flexoffer.startAfterTime - +scope.flexoffer.timeslices[0].date;
                                    }
                                    if (delta != 0) {
                                        scope.flexoffer.timeslices.forEach(function (e) {
                                            e.date = new Date(+e.date + delta);
                                        });
                                    }
                                    scope.render(scope.flexoffer);
                                }
                            });
                            barGroup.call(drag);
                        }
                    };
                }
            };
        }
        Directives.ngBar = ngBar;
    })(app.Directives || (app.Directives = {}));
    var Directives = app.Directives;
})(app || (app = {}));

app.registerDirective('ngBar', ['$window']);
app.registerDirective('ngBarSchedule', ['$window']);
