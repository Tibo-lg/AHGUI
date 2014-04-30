///
/// Directives
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='_all.ts' />
var app;
(function (app) {
    (function (Directives) {
        var NavCtrlss = (function () {
            function NavCtrlss($scope, $location) {
                this.scope = $scope;
                this.scope.navClass = function (page) {
                    console.debug("hej directive");
                    var currentRoute = $location.path().substring(1) || 'timed-usage';
                    return page === currentRoute ? 'active' : '';
                };
            }
            return NavCtrlss;
        })();
        Directives.NavCtrlss = NavCtrlss;
    })(app.Directives || (app.Directives = {}));
    var Directives = app.Directives;
})(app || (app = {}));
//# sourceMappingURL=directives.js.map
