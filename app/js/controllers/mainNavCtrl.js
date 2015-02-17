///
/// Controllers
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />
var app;
(function (app) {
    (function (Controllers) {
        var MainNavCtrl = (function () {
            function MainNavCtrl($scope, $location, wmFactory, aggFactory) {
                var _this = this;
                this.wmFactory = wmFactory;
                this.aggFactory = aggFactory;
                this.scope = $scope;
                this.scope.navClass = function (page) {
                    var currentRoute = $location.path().substring(1);
                    return page === currentRoute ? 'active' : '';
                };
                this.scope.reset = function () {
                    _this.reset();
                };
            }
            MainNavCtrl.prototype.reset = function () {
                this.wmFactory.delete();
                this.aggFactory.delete();
            };
            MainNavCtrl.$inject = ['$scope', '$location', 'wmFactory', 'aggFactory'];
            return MainNavCtrl;
        })();
        Controllers.MainNavCtrl = MainNavCtrl;
    })(app.Controllers || (app.Controllers = {}));
    var Controllers = app.Controllers;
})(app || (app = {}));

app.registerController('MainNavCtrl', ['$scope', '$location', 'wmFactory', 'aggFactory']);
