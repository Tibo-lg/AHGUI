/// 
/// Controllers
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />

module app.Controllers {
    export interface HeatPumpInputScope extends ng.IScope {
        maxtemp: number;
        settemp: number;
        mintemp: number;
        outtemp: number;
        suneffect: string;
        updateSunEffect: Function;
        resetValues: Function;
        incrementMin: Function;
        decrementMin: Function;
        incrementMax: Function;
        decrementMax: Function;
        incrementSet: Function;
        decrementSet: Function;
        incrementOut: Function;
        decrementOut: Function;
    }
    export class HeatPumpInputCtrl {
        private scope: HeatPumpInputScope;

        static $inject = ['$scope'];
        constructor($scope: HeatPumpInputScope) {
            this.scope = $scope;

            /* Fetch Heat Pump Data*/
            this.getHPParam();

            /* Define Scope Functions */
            this.scope.updateSunEffect = (value: string) => { this.updateSunEffect(value); };
            this.scope.resetValues = () => { this.resetValues(); };
            this.scope.incrementMin = () => { this.incrementMin(); };
            this.scope.decrementMin = () => { this.decrementMin(); };
            this.scope.decrementMax = () => { this.decrementMax(); };
            this.scope.incrementMax = () => { this.incrementMax(); };
            this.scope.decrementSet = () => { this.decrementSet(); };
            this.scope.incrementSet = () => { this.incrementSet(); };
            this.scope.decrementOut = () => { this.decrementOut(); };
            this.scope.incrementOut = () => { this.incrementOut(); };
        }

        public updateSunEffect(value: string) {
            console.debug(value);
            this.scope.suneffect = value;
        }

        public resetValues() {
            this.getHPParam();
        }

        public incrementMin() {
            if (this.scope.mintemp === this.scope.settemp) {
                this.scope.settemp++;
            }
            if (this.scope.mintemp === this.scope.maxtemp) {
                this.scope.maxtemp++;
            }
            this.scope.mintemp++;
        }

        public decrementMin() {
            this.scope.mintemp--;
        }

        public decrementMax() {
            if (this.scope.maxtemp === this.scope.settemp) {
                this.scope.settemp--;
            }
            if (this.scope.maxtemp === this.scope.mintemp) {
                this.scope.mintemp--;
            }
            this.scope.maxtemp--;
        }

        public incrementMax() {
            this.scope.maxtemp++;
        }

        public decrementSet() {
            if (this.scope.settemp === this.scope.mintemp) {
                this.scope.mintemp--;
            }
            this.scope.settemp--;
        }

        public incrementSet() {
            if (this.scope.settemp === this.scope.maxtemp) {
                this.scope.maxtemp++;
            }
            this.scope.settemp++;
        }

        public decrementOut() {
            this.scope.outtemp--;
        }

        public incrementOut() {
            this.scope.outtemp++;
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

app.registerController('HeatPumpInputCtrl', ['$scope']);  