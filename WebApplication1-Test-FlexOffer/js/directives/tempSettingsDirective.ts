/// 
/// Directives
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
            template: '<span class="glyphicon glyphicon-chevron-up" ng-click="decrement()"></span>' +
            '<div>{{ value }}</div>' +
            '<span class="glyphicon glyphicon-chevron-down" ng-click="increment()"></span>',
            link: function (scope: ItempSettingsScope, iElement, iAttrs) {
                scope.increment = function () {
                    scope.value++;
                }
            scope.decrement = function () {
                    scope.value--;
                }
        }
        };
    }
}
app.registerDirective('tempSettings');    