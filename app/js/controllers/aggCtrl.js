/// <reference path='../_all.ts' />
var app;
(function (app) {
    (function (Controllers) {
        var AggCtrl = (function () {
            function AggCtrl($scope, $http, aggFactory) {
                var _this = this;
                this.dataset = [];
                this.http = $http;
                this.scope = $scope;
                this.aggFactory = aggFactory;

                aggFactory.aggregate().success(function () {
                    _this.getAggFos();
                });

                this.scope.isFlexOfferGenerated = false;

                /* Fetch Heat Pump Data*/
                this.scope.aggFlexOffers = new Array();
                this.scope.curAggFlexOffer = 0;
                this.scope.nextAggFO = function () {
                    _this.nextAggFO();
                };
                this.scope.prevAggFO = function () {
                    _this.prevAggFO();
                };
                this.scope.schedule = function () {
                    _this.schedule();
                };
                this.scope.getAggFlexOffers = function () {
                    _this.getAggFos();
                };
            }
            AggCtrl.prototype.getAggFos = function () {
                var _this = this;
                this.aggFactory.getAggFos().success(function (custs) {
                    _this.dataset = custs;
                    _this.scope.aggFlexOffers.length = 0;
                    _this.dataset.forEach(function (entry) {
                        var aggFO = new app.AggFlexOffer();
                        aggFO.aggFlexOffer = app.convertFlexOffer(entry);
                        entry.subFoMetas.forEach(function (subFO) {
                            aggFO.flexOffers.push(app.convertFlexOffer(subFO.subFlexOffer));
                        });
                        _this.scope.aggFlexOffers.push(aggFO);
                    });
                }).error(function (error) {
                    this.scope.status = 'Unable to load customer data: ' + error.message;
                });
            };

            AggCtrl.prototype.schedule = function () {
                var _this = this;
                this.aggFactory.schedule().success(function () {
                    _this.getAggFos();
                });
            };

            AggCtrl.prototype.nextAggFO = function () {
                if (this.scope.curAggFlexOffer + 1 < this.scope.aggFlexOffers.length) {
                    this.scope.curAggFlexOffer++;
                } else {
                    this.scope.curAggFlexOffer = 0;
                }
            };

            AggCtrl.prototype.prevAggFO = function () {
                if (this.scope.curAggFlexOffer > 0) {
                    this.scope.curAggFlexOffer--;
                } else {
                    this.scope.curAggFlexOffer = this.scope.aggFlexOffers.length - 1;
                }
            };
            AggCtrl.$inject = ['$scope', '$http', 'aggFactory'];
            return AggCtrl;
        })();
        Controllers.AggCtrl = AggCtrl;
    })(app.Controllers || (app.Controllers = {}));
    var Controllers = app.Controllers;
})(app || (app = {}));

app.registerController('AggCtrl', ['$scope', '$http', 'aggFactory']);
