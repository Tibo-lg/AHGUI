/// 
/// Controllers
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />

module app.Controllers {
    export interface IComfortSettingsScope extends ng.IScope {
        maxtemp: number;
        settemp: number;
        mintemp: number;
        outtemp: number;

    }
    export class ComfortSettingsCtrl {
        private scope: IComfortSettingsScope;
        static $inject = ['$scope'];
        constructor($scope: IComfortSettingsScope) {
            this.scope = $scope;

            this.scope.settemp = 20;
            this.scope.maxtemp = 23;
            this.scope.mintemp = 18;
            this.scope.outtemp = 14;
        }
    }
}

app.registerController('ComfortSettingsCtrl', ['$scope']);  