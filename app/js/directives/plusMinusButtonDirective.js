///
/// Directives - Generic Button not currently used
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />
var app;
(function (app) {
    (function (Directives) {
        'use strict';

        function genericButton() {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    value: '=ngModel'
                },
                templateUrl: 'partials/degreeInput.html',
                link: function (scope, iElement, iAttrs) {
                    var min, max;

                    min = iAttrs.min;
                    max = iAttrs.max;

                    scope.increment = function () {
                        if (scope.value < max) {
                            scope.value++;
                        }
                    };
                    scope.decrement = function () {
                        if (scope.value > min) {
                            scope.value--;
                        }
                    };
                }
            };
        }
        Directives.genericButton = genericButton;
    })(app.Directives || (app.Directives = {}));
    var Directives = app.Directives;
})(app || (app = {}));
app.registerDirective('genericButton');
