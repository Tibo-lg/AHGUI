///
/// Controllers
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />
var app;
(function (app) {
    (function (Controllers) {
        var ChartCtrl = (function () {
            function ChartCtrl($scope) {
                this.scope = $scope;

                //TODO Should be more generic input
                this.scope.getChart = function (chart) {
                    if (chart === 'flexoffer') {
                        return 'partials/flexOfferBarChart.html';
                    }
                };
            }
            ChartCtrl.$inject = ['$scope'];
            return ChartCtrl;
        })();
        Controllers.ChartCtrl = ChartCtrl;
    })(app.Controllers || (app.Controllers = {}));
    var Controllers = app.Controllers;
})(app || (app = {}));

app.registerController('ChartCtrl', ['$scope']);
//# sourceMappingURL=chartCtrl.js.map
