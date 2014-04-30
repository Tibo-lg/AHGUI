/// 
/// Controllers
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />

module app.Controllers {
    export interface INavScope extends ng.IScope {
        navClass: Function;
    }
    export class NavCtrl {

        private scope: INavScope;
        static $inject = ['$scope', '$location'];
        constructor($scope: INavScope, $location) {
            this.scope = $scope;
            $scope.navClass = function (page) {
                var currentRoute = $location.path().substring(1);
                return page === currentRoute ? 'active' : '';
            };
        }
    }
}

app.registerController('NavCtrl', ['$scope', '$location']); 