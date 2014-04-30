///
/// Controllers
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />
var app;
(function (app) {
    (function (Controllers) {
        var NavCtrl = (function () {
            function NavCtrl($scope, $location) {
                this.scope = $scope;
                $scope.navClass = function (page) {
                    var currentRoute = $location.path().substring(1);
                    return page === currentRoute ? 'active' : '';
                };
            }
            NavCtrl.$inject = ['$scope', '$location'];
            return NavCtrl;
        })();
        Controllers.NavCtrl = NavCtrl;
    })(app.Controllers || (app.Controllers = {}));
    var Controllers = app.Controllers;
})(app || (app = {}));

app.registerController('NavCtrl', ['$scope', '$location']);
//# sourceMappingURL=navCtrl.js.map
