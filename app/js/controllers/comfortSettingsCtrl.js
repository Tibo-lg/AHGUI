///
/// Controllers
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />
var app;
(function (app) {
    (function (Controllers) {
        var ComfortSettingsCtrl = (function () {
            function ComfortSettingsCtrl($scope) {
                this.scope = $scope;
                this.getHPParam();
                this.scope.updateSunEffect = function (value) {
                    this.suneffect = value;
                };
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
            ComfortSettingsCtrl.prototype.getHPParam = function () {
                this.scope.settemp = 20;
                this.scope.maxtemp = 23;
                this.scope.mintemp = 18;
                this.scope.outtemp = 14;
                this.scope.suneffect = 'N';
            };
            ComfortSettingsCtrl.$inject = ['$scope'];
            return ComfortSettingsCtrl;
        })();
        Controllers.ComfortSettingsCtrl = ComfortSettingsCtrl;
    })(app.Controllers || (app.Controllers = {}));
    var Controllers = app.Controllers;
})(app || (app = {}));

app.registerController('ComfortSettingsCtrl', ['$scope']);
//# sourceMappingURL=comfortSettingsCtrl.js.map
