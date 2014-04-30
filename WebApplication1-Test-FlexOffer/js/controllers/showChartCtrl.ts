/// 
/// Controllers
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />

module app.Controllers {
    export interface IChartScope extends ng.IScope {
        getChart: Function;
    }
    export class ChartCtrl {

        private scope: IChartScope;
        static $inject = ['$scope'];
        constructor($scope: IChartScope) {
            this.scope = $scope;
            //TODO Should be more generic input
            this.scope.getChart = function (chart) {
                if (chart === 'flexoffer') {
                    alert(chart);
                    return 'partials/flexOfferBarChart.html';
                }
            }
        }
    }
}

app.registerController('ChartCtrl', ['$scope']);  