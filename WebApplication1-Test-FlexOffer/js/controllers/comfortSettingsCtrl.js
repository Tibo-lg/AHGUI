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

                this.scope.settemp = 20;
                this.scope.maxtemp = 23;
                this.scope.mintemp = 18;
                this.scope.outtemp = 14;
            }
            ComfortSettingsCtrl.$inject = ['$scope'];
            return ComfortSettingsCtrl;
        })();
        Controllers.ComfortSettingsCtrl = ComfortSettingsCtrl;
    })(app.Controllers || (app.Controllers = {}));
    var Controllers = app.Controllers;
})(app || (app = {}));

app.registerController('ComfortSettingsCtrl', ['$scope']);
//# sourceMappingURL=comfortSettingsCtrl.js.map
