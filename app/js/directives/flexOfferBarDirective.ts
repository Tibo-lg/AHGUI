/// 
/// Directives
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />

module app.Directives {
    'use strict';

  
    export function ngBar($window: Window): ng.IDirective {

        return {
            restrict: 'A',
            scope: { flexoffer: '=', height: '=', width: '='},
            link(scope, element: JQuery, attrs: ng.IAttributes) {

            // Add the svg element to the dom
            var svg = d3.select(element[0])
                    .append('svg:svg');
                // Browser onresize event
                window.onresize = function () {
                    scope.$apply();
                };

                // Watch for resize event
                scope.$watch(
                    function () {
                        return $window.innerWidth;
                    },
                    function () {
                        scope.render(scope.flexoffer);
                    });

                // Watch for newData event
                scope.$watch('flexoffer', function (newFlexoffer: Array<FlexOffer>) {
                    scope.render(newFlexoffer);
                });

                scope.render = function (flexoffer: FlexOffer) {

		  var timesliceData: Array<TimeSlice> = flexoffer.timeslices;
                    // Delete old data
                    svg.selectAll('*').remove();
                    if (!timesliceData) return;

                    //TODO These should really be attributes input
                    // Margin and paddings
                    var margin = { top: 20, right: 40, bottom: 20, left: 60 };
                    var barPadding = 2;
                    var yAxisPadding = -5;
                  
                    // Colours
                    var flex = "#64BE45";
                    var minimum = "#BEBEBE";

                    // Calculate the height and width of elements
                    //var height = (<HTMLElement><any>d3.select(element[0]).node().parentNode.parentNode).offsetHeight - margin.top - margin.bottom;
                    var height = 400 - margin.top - margin.bottom;
                    //TODO HAcky di hack Rikke!
                    var width = element[0].clientWidth != 0 ? element[0].clientWidth : $window.innerWidth;
		    width -= (margin.right + margin.left);
		    var start = +flexoffer.startAfterTime;
		    var lateStart = +flexoffer.startBeforeTime;
		    var end = +flexoffer.endTime;
		    /** Divide the width by the flex offer "duration" in hours */
		    console.debug(end-lateStart);
                    var timeTicks = width / ( (end-start) / 3600000) ;
		    console.debug("HEY " + timeTicks);
		    var barWidth = timeTicks;
		    console.debug( ( (end-lateStart) / 3600000 ));
		    console.debug(flexoffer);

                    console.debug('width:' + width + ' height:' + height + ' data-length:' + timesliceData.length + ' barWidth:' + barWidth);
		    console.debug('test ' + element[0].clientWidth); 

                    // Adding width and height to the svg
                    svg.attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .append('g')
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    // Modified data for the xScale function. ParseDate is need when d.date is parsed in xScale
                    var parseDate = d3.time.format("%B %d, %Y, %X").parse;
           
                    var date = [];
                    date.push(flexoffer.startAfterTime, flexoffer.endTime); 

                    // Scales
                    var xScale = d3.time.scale()
                        .domain(d3.extent(date))
                        .range([0, width]);

                    var yScale = d3.scale.linear()
                        .domain([0, d3.max(timesliceData, function (d) { return d.maxConsumption; })])
                        .rangeRound([height, 0]);

                    // The color scale will set the stacked bar. The range decides the colors. The domain is computed from the timeslice model.
                    var color = d3.scale.ordinal()
                        .range([minimum, flex])
                        .domain(d3.keys(timesliceData[0]).filter(function (key) { return key !== "date" && key !== "barValues" && key !== "duration"; }));

                    timesliceData.forEach(function (d) {
                        var y0 = 0;
                        d.barValues = color.domain().map(function (name) { return { name: name, y0: y0, y1: +d[name], duration: d.duration }; });
                        //TODO Hacky di hack: have to adjust y0 for the second mapping as the map function is funkieee
                        d.barValues[1].y0 += d.barValues[0].y1;
                    });

                    // Make svg Axis
                    var xAxis = d3.svg.axis()
                        .scale(xScale)
                        .orient("bottom")
                        .ticks((end-start)/3600000)
                        .tickFormat(d3.time.format("%H"));

                    var yAxis = d3.svg.axis()
                        .scale(yScale)
                        .orient("left");
                    
                    svg.select('g')
                        .append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis);

                    svg.select('g')
                        .append("g")
                        .attr("class", "axis")
                        .attr('transform', 'translate('+ yAxisPadding +',0)')
                        .call(yAxis)
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end")
                        .text("kWh");

                    // Make bars
                    var consumption = svg.select('g').selectAll(".consumption")
                        .data(timesliceData)
                        .enter().append("g")
                        .attr("class", "g")
                        .attr("transform", function (d) { console.debug(d);return "translate(" + (xScale(d.date)) + ",0)";});

                    consumption.selectAll("rect")
                        .data(function (d) { return d.barValues; })
                        .enter().append("rect")
                        .attr("width", function (d) { return (barWidth/d.duration - barPadding); })
                        .attr("y", function (d) { return yScale(d.y1); })
                        .attr("height", function (d) { return yScale(d.y0) - yScale(d.y1); })
                        .style("fill", function (d) { return color(d.name); });

                    // Make schedule line

                    //var line = d3.svg.line()
                    //    .x(function (d) {return (xScale(parseDate(d.date)));})
                    //    .y(function (d) {return yScale(d.consumption);});

                    //svg.select('g').append("path")
                    //    .datum(scheduleData)
                    //    .attr("class", "line")
                    //    .attr("d", line);

		    //Make arrow if time flexibility
		    
                  

                    // Make Legend
                    var legend = svg.selectAll(".legend")
                        .data(color.domain().slice().reverse())
                        .enter().append("g")
                        .attr("class", "legend")
                        .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

                    legend.append("rect")
                        .attr("x", width - 18)
                        .attr("width", 18)
                        .attr("height", 18)
                        .style("fill", color);

                    legend.append("text")
                        .attr("x", width - 24)
                        .attr("y", 9)
                        .attr("dy", ".35em")
                        .style("text-anchor", "end")
                        .text(function (d) { return d; });
                }
            

            }
        }
    }
}

app.registerDirective('ngBar', ['$window']);
