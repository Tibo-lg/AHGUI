///
/// Directives - Button that handles input in the heatpumpinputctrl.
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />
var app;
(function (app) {
    (function (Directives) {
        'use strict';

        function degreeInput() {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    value: '=ngModel',
                    increment: '&onIncrement',
                    decrement: '&onDecrement'
                },
                templateUrl: '../../partials/degreeInput.html'
            };
        }
        Directives.degreeInput = degreeInput;
        ;
    })(app.Directives || (app.Directives = {}));
    var Directives = app.Directives;
})(app || (app = {}));

app.registerDirective('degreeInput');
//# sourceMappingURL=degreeInputDirective.js.map
