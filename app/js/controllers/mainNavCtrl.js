///
/// Controllers
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />
var app;
(function (app) {
    (function (Controllers) {
        var MainNavCtrl = (function () {
            function MainNavCtrl($scope, $location) {
                this.scope = $scope;
                this.scope.navClass = function (page) {
                    var currentRoute = $location.path().substring(1);
                    return page === currentRoute ? 'active' : '';
                };
            }
            MainNavCtrl.$inject = ['$scope', '$location'];
            return MainNavCtrl;
        })();
        Controllers.MainNavCtrl = MainNavCtrl;
    })(app.Controllers || (app.Controllers = {}));
    var Controllers = app.Controllers;
})(app || (app = {}));

app.registerController('MainNavCtrl', ['$scope', '$location']);
//# sourceMappingURL=mainNavCtrl.js.map
