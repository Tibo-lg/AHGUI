/// 
/// Directives - Button that handles input in the heatpumpinputctrl.  
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />

module app.Directives {
    'use strict';
    interface degreeInputScope extends ng.IScope {
        value: number;
        increment: Function;
        decrement: Function;
    }

    export function degreeInput(): ng.IDirective {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                value: '=ngModel',
                increment: '&onIncrement',
                decrement: '&onDecrement'
            },
            templateUrl: 'partials/degreeInput.html'
        }
    };
}

app.registerDirective('degreeInput');    
