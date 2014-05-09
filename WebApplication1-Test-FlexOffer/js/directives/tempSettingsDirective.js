///
/// Directives
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />
var app;
(function (app) {
    (function (Directives) {
        'use strict';

        function tempSettings() {
            return {
                restrict: 'A',
                scope: {
                    value: '=ngModel'
                },
                templateUrl: '../../partials/tempSettings.html',
                link: function (scope, iElement, iAttrs) {
                    scope.increment = function () {
                        scope.value++;
                    };
                    scope.decrement = function () {
                        scope.value--;
                    };
                }
            };
        }
        Directives.tempSettings = tempSettings;
    })(app.Directives || (app.Directives = {}));
    var Directives = app.Directives;
})(app || (app = {}));
app.registerDirective('tempSettings');
//# sourceMappingURL=tempSettingsDirective.js.map
