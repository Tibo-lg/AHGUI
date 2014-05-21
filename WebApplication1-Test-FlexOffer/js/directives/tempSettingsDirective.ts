/// 
/// Directives - Obsolete as functionality is handled in the heatpumpinputctrl.  
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />

module app.Directives {
    'use strict';
    interface ItempSettingsScope extends ng.IScope {
        value: number;
        increment: Function;
        decrement: Function;
    }

    export function tempSettings(): ng.IDirective {
        return {
            restrict: 'A',
            scope: {
                value: '=ngModel'
            },
            templateUrl: '../../partials/tempSettings.html',
            link: function (scope: ItempSettingsScope, iElement, iAttrs) {
                var min, max;

                min = iAttrs.min;
                max = iAttrs.max; 

                scope.increment = function () {
                    if (scope.value < max) {
                        scope.value++;
                    }
                    
                }
                scope.decrement = function () {
                    if (scope.value > min) {
                        scope.value--;
                    }
                }
        }
        };
    }
}
app.registerDirective('tempSettings');    