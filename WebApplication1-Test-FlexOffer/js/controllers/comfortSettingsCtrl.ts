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
        suneffect: string;
        incrementMin: Function;
        decrementMin: Function;
        incrementMax: Function;
        decrementMax: Function;
        incrementSet: Function;
        decrementSet: Function;
        incrementOut: Function;
        decrementOut: Function;
        updateSunEffect: Function;
    }
    export class ComfortSettingsCtrl {
        private scope: IComfortSettingsScope;

        static $inject = ['$scope'];
        constructor($scope: IComfortSettingsScope) {
            this.scope = $scope;
            this.getHPParam();
            this.scope.updateSunEffect = function(value) {
                this.suneffect = value;
            }
            this.scope.incrementMin = function () {
                if (this.mintemp === this.settemp) {
                    this.settemp++;
                }
                if (this.mintemp === this.maxtemp) {
                    this.maxtemp++;
                }
                this.mintemp++;
            };
            this.scope.decrementMin = function () {
                this.mintemp--;
            };

            this.scope.decrementMax = function () {
                if (this.maxtemp === this.settemp) {
                    this.settemp--;
                }
                if (this.maxtemp === this.mintemp) {
                    this.mintemp--;
                }
                this.maxtemp--;
            };
            this.scope.incrementMax = function () {
                this.maxtemp++;
            };
            this.scope.decrementSet = function () {
                if (this.settemp === this.mintemp) {
                    this.mintemp--;
                }
                this.settemp--;
            };
            this.scope.incrementSet = function () {
                if (this.settemp === this.maxtemp) {
                    this.maxtemp++;
                }
                this.settemp++;
            };
            this.scope.decrementOut = function () {
                this.outtemp--;
            };
            this.scope.incrementOut = function () {
                this.outtemp++;
            };

        }

        private getHPParam() {
            this.scope.settemp = 20;
            this.scope.maxtemp = 23;
            this.scope.mintemp = 18;
            this.scope.outtemp = 14;
            this.scope.suneffect = 'N';
        }
    }
}

app.registerController('ComfortSettingsCtrl', ['$scope']);  