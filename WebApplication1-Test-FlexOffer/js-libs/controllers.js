///
/// Controllers
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='_all.ts' />
var app;
(function (app) {
    (function (Controllers) {
        var NavCtrl = (function () {
            function NavCtrl($scope, $location) {
                this.scope = $scope;
                console.debug("hej controller");
                $scope.navClass = function (page) {
                    console.debug('in navClassfunction');
                    var currentRoute = $location.path().substring(1) || 'home';
                    console.debug("currentroute" + currentRoute);
                    return page === currentRoute ? 'active' : '';
                };
            }
            return NavCtrl;
        })();
        Controllers.NavCtrl = NavCtrl;
    })(app.Controllers || (app.Controllers = {}));
    var Controllers = app.Controllers;
})(app || (app = {}));

app.registerController('NavCtrl', ['$scope', '$location']);
//# sourceMappingURL=controllers.js.map
