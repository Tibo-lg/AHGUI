/// 
/// Directives - Generic Button not currently used  
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />

module app.Directives {
    'use strict';
    interface genericButtonScope extends ng.IScope {
        value: number;
        increment: Function;
        decrement: Function;
    }

    export function genericButton(): ng.IDirective {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                value: '=ngModel',
            },
            templateUrl: 'partials/degreeInput.html',
            link: function (scope: genericButtonScope, iElement, iAttrs) {
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
app.registerDirective('genericButton');     
