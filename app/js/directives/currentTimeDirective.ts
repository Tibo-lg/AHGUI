/// 
/// Directives
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />

module app.Directives {
    'use strict';
    interface currentTimeAttrs extends ng.IAttributes {
        currentTime: string;
    }

    export function currentTime($interval, dateFilter): ng.IDirective {
        return {
            restrict: 'A',
           
            link: function (scope, element, attrs: currentTimeAttrs, viewsCtrl) {
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
                }, 60*1000);
            }
        };
    }
}
app.registerDirective('currentTime', ['$interval', 'dateFilter']);   