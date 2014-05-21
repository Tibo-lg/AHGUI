/// 
/// Controllers
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />

module app.Controllers {
    export interface IMainNavScope extends ng.IScope {
        navClass: Function;
    }
    export class MainNavCtrl {

        private scope: IMainNavScope;
        static $inject = ['$scope', '$location'];
        constructor($scope: IMainNavScope, $location) {
            this.scope = $scope;
            this.scope.navClass = function (page) {
                var currentRoute = $location.path().substring(1);
                return page === currentRoute ? 'active' : '';
            };
        }
    }
}

app.registerController('MainNavCtrl', ['$scope', '$location']); 