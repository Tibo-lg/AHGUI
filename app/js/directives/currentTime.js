///
/// Directives
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />
var app;
(function (app) {
    (function (Directives) {
        'use strict';

        function currentTime($interval, dateFilter) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs, viewsCtrl) {
                    var format;
                    var timeoutId;
                    function updateTime() {
                        element.text(dateFilter(new Date(), format));
                    }

                    scope.$watch(attrs.currentTime, function (value) {
                        console.debug(value);
                        format = value;
                        updateTime();
                    });

                    element.on('$destroy', function () {
                        $interval.cancel(timeoutId);
                    });

                    // start the UI update process; save the timeoutId for canceling
                    timeoutId = $interval(function () {
                        updateTime(); // update DOM
                    }, 60 * 1000);
                }
            };
        }
        Directives.currentTime = currentTime;
    })(app.Directives || (app.Directives = {}));
    var Directives = app.Directives;
})(app || (app = {}));
app.registerDirective('currentTime', ['$interval', 'dateFilter']);
//# sourceMappingURL=currentTime.js.map
