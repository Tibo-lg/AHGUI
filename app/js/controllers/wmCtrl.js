/// <reference path='../_all.ts' />
var app;
(function (app) {
    (function (Controllers) {
        var WMCtrl = (function () {
            function WMCtrl($scope, $http, wmFactory) {
                var _this = this;
                this.dataset = [];
                this.http = $http;
                this.scope = $scope;
                this.wmFactory = wmFactory;
                var earlystart = new Date();
                earlystart.setMinutes(0);
                earlystart.setSeconds(0);
                earlystart.setHours(earlystart.getHours() + 1);
                this.scope.earlystart = earlystart;
                console.log(this.scope.earlystart);
                this.scope.lateend = new Date(earlystart.getTime() + 5 * 3600 * 1000);

                this.scope.isFlexOfferGenerated = false;

                /* Fetch Heat Pump Data*/
                this.scope.getFlexOffer = function () {
                    _this.getWmFo();
                };
                this.scope.postSchedule = function () {
                    _this.postSchedule();
                };
                this.scope.earlyStartChange = function () {
                    _this.earlyStartChange();
                };
                this.scope.lateEndChange = function () {
                    _this.lateEndChange();
                };
                this.scope.setLongProgram = function () {
                    _this.setLongProgram();
                };
                this.scope.setShortProgram = function () {
                    _this.setShortProgram();
                };

                this.scope.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                this.scope.minuteStep = 15;

                this.programType = 'SHORT';
                this.scope.xSelect = 130;
                this.scope.ySelect = 60;
            }
            WMCtrl.prototype.postSchedule = function () {
                var _this = this;
                this.wmFactory.postSchedule(this.scope.earlystart, this.scope.lateend).success(function () {
                    _this.getWmFo();
                });
            };

            WMCtrl.prototype.getWmFo = function () {
                var _this = this;
                this.wmFactory.getWmFos().success(function (custs) {
                    _this.dataset = custs;
                    console.debug("calling factory from getWmFos");

                    //console.debug(this.dataset);
                    if (_this.dataset.length > 0) {
                        _this.scope.flexOffer = app.convertFlexOffer(_this.dataset[0]);
                        //console.log(this.scope.flexOffer);
                    }
                }).error(function (error) {
                    console.debug(this.scope.status);
                    this.scope.status = 'Unable to load customer data: ' + error.message;
                    console.debug(this.scope.status);
                });
            };

            WMCtrl.prototype.earlyStartChange = function () {
                console.log('Time changed to: ' + this.scope.earlystart);
            };

            WMCtrl.prototype.lateEndChange = function () {
                console.log('Time changed to: ' + this.scope.lateend);
            };

            WMCtrl.prototype.setLongProgram = function () {
                this.programType = 'LONG';
                console.debug(this.programType);
                this.scope.xSelect = 155;
                this.scope.ySelect = 95;
            };

            WMCtrl.prototype.setShortProgram = function () {
                this.programType = 'SHORT';
                console.debug(this.programType);
                this.scope.xSelect = 130;
                this.scope.ySelect = 60;
            };
            WMCtrl.$inject = ['$scope', '$http', 'wmFactory'];
            return WMCtrl;
        })();
        Controllers.WMCtrl = WMCtrl;
    })(app.Controllers || (app.Controllers = {}));
    var Controllers = app.Controllers;
})(app || (app = {}));

app.registerController('WMCtrl', ['$scope', '$http', 'wmFactory']);
