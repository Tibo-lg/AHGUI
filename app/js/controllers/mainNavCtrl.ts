/// 
/// Controllers
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />

module app.Controllers {
    export interface IMainNavScope extends ng.IScope {
        navClass: Function;
        reset: Function;
    }
    export class MainNavCtrl {

        private scope: IMainNavScope;
	private wmFactory;
	private aggFactory;
        static $inject = ['$scope', '$location', 'wmFactory', 'aggFactory'];
        constructor($scope: IMainNavScope, $location, wmFactory, aggFactory) {
	  this.wmFactory = wmFactory;
	  this.aggFactory = aggFactory;
            this.scope = $scope;
            this.scope.navClass = function (page) {
                var currentRoute = $location.path().substring(1);
                return page === currentRoute ? 'active' : '';
            };
	    this.scope.reset = () => {this.reset();};
        }

	private reset(){
	  this.wmFactory.delete();
	  this.aggFactory.delete();
	}
    }
}

app.registerController('MainNavCtrl', ['$scope', '$location', 'wmFactory', 'aggFactory']); 
