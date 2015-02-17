/// <reference path='../_all.ts' />
var app;
(function (app) {
    (function (Controllers) {
        var FlexOfferCtrl = (function () {
            function FlexOfferCtrl($scope, $http, wmFactory, dataFactory, Auth) {
                var _this = this;
                this.dataset = [];
                this.urlb = "http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=imperial&cnt=14&callback=JSON_CALLBACK&q=Aalborg";
                this.urlBase = 'http://api.neogrid.dk/arrowhead/trigger';
                this.urlf = 'http://api.neogrid.dk/arrowhead/flexoffers';
                this.http = $http;
                this.scope = $scope;
                this.wmFactory = wmFactory;
                this.Auth = Auth;

                this.dataFactory = dataFactory;
                this.getHPParam();

                this.scope.username = "arrowhead";
                this.scope.password = "bB#aal9oOo";
                this.scope.isFlexOfferAssigned = false;

                /* Fetch Heat Pump Data*/
                this.scope.getFlexOffer = function () {
                    _this.getFlexOffer();
                };
                this.scope.setParameters = function () {
                    _this.trigger();
                };
                this.scope.flexOffer = null;

                this.scope.temperatures = this.fetchTemperatures();

                $scope.modal = { title: 'Title', content: 'Hello Modal<br />This is a multiline message!' };

                /* Define Scope Functions */
                this.scope.updateSunEffect = function (value) {
                    _this.updateSunEffect(value);
                };
                this.scope.resetValues = function () {
                    _this.resetValues();
                };
                this.scope.incrementMin = function () {
                    _this.incrementMin();
                };
                this.scope.decrementMin = function () {
                    _this.decrementMin();
                };
                this.scope.decrementMax = function () {
                    _this.decrementMax();
                };
                this.scope.incrementMax = function () {
                    _this.incrementMax();
                };
                this.scope.decrementOut = function () {
                    _this.decrementOut();
                };
                this.scope.incrementOut = function () {
                    _this.incrementOut();
                };
            }
            FlexOfferCtrl.prototype.updateSunEffect = function (value) {
                this.scope.suneffect = value;
            };

            FlexOfferCtrl.prototype.resetValues = function () {
                this.scope.isFlexOfferAssigned = false;
                this.getHPParam();
            };

            FlexOfferCtrl.prototype.incrementMin = function () {
                if (this.scope.mintemp === this.scope.maxtemp) {
                    this.scope.maxtemp++;
                }
                this.scope.mintemp++;
            };

            FlexOfferCtrl.prototype.decrementMin = function () {
                this.scope.mintemp--;
            };

            FlexOfferCtrl.prototype.decrementMax = function () {
                if (this.scope.maxtemp === this.scope.mintemp) {
                    this.scope.mintemp--;
                }
                this.scope.maxtemp--;
            };

            FlexOfferCtrl.prototype.incrementMax = function () {
                this.scope.maxtemp++;
            };

            FlexOfferCtrl.prototype.decrementOut = function () {
                this.scope.outtemp--;
            };

            FlexOfferCtrl.prototype.incrementOut = function () {
                this.scope.outtemp++;
            };

            FlexOfferCtrl.prototype.getHPParam = function () {
                var _this = this;
                this.Auth.setCredentials("arrowhead", "bB#aal9oOo");
                this.dataFactory.getHPParam().success(function (custs) {
                    _this.dataset = custs;
                    console.debug("calling factory from getParam");

                    //console.debug(this.dataset);
                    _this.scope.maxtemp = custs.ti_high;
                    _this.scope.mintemp = custs.ti_low;
                    _this.scope.outtemp = custs.to_avg;
                    _this.scope.suneffect = _this.cloudCoverValToString(custs.cloud_cover);
                }).error(function (error) {
                    console.debug(_this.scope.status);
                    _this.scope.status = 'Unable to load customer data: ' + error.message;
                    console.debug(_this.scope.status);
                });
            };

            FlexOfferCtrl.prototype.trigger = function () {
                var _this = this;
                this.dataFactory.triggerFO(this.scope.mintemp, this.scope.maxtemp, this.scope.outtemp, this.cloudCoverStringToVal(this.scope.suneffect)).success(function (custs) {
                    _this.dataset = custs;
                    console.debug("calling factory from trigger");

                    //console.debug(this.dataset);
                    _this.scope.flexOffer = app.convertFlexOffer(_this.dataset);
                    //console.log(this.scope.flexOffer);
                }).error(function (error) {
                    console.debug(this.scope.status);
                    this.scope.status = 'Unable to load customer data: ' + error.message;
                    console.debug(this.scope.status);
                });
            };

            FlexOfferCtrl.prototype.getFlexOffer = function () {
                var _this = this;
                this.dataFactory.getFlexOffer().success(function (custs) {
                    _this.dataset = custs;
                    console.debug("calling factory from getFlexOffer");

                    //console.debug(this.dataset);
                    _this.scope.flexOffer = app.convertFlexOffer(_this.dataset);
                    console.log(_this.scope.flexOffer);
                }).error(function (error) {
                    console.debug(this.scope.status);
                    this.scope.status = 'Unable to load customer data: ' + error.message;
                    console.debug(this.scope.status);
                });
            };

            FlexOfferCtrl.prototype.cloudCoverValToString = function (val) {
                switch (val) {
                    case 100:
                        return 'N';
                    case 50:
                        return 'H';
                    case 0:
                        return 'B';
                }
            };

            FlexOfferCtrl.prototype.cloudCoverStringToVal = function (str) {
                if (str == 'B') {
                    return 100;
                } else if (str == 'H') {
                    return 50;
                } else if (str == 'N') {
                    return 0;
                }
            };

            FlexOfferCtrl.prototype.fetchTemperatures = function () {
                var rtn;
                rtn = [
                    {
                        'date': "October 13, 1975, 10:00:00",
                        'temperature': 9
                    },
                    {
                        'date': "October 13, 1975, 11:00:00",
                        'temperature': 4
                    },
                    {
                        'date': "October 13, 1975, 12:00:00",
                        'temperature': 7
                    },
                    {
                        'date': "October 13, 1975, 13:00:00",
                        'temperature': 10
                    },
                    {
                        'date': "October 13, 1975, 14:00:00",
                        'temperature': 9
                    },
                    {
                        'date': "October 13, 1975, 15:00:00",
                        'temperature': 8
                    },
                    {
                        'date': "October 13, 1975, 16:00:00",
                        'temperature': 4
                    },
                    {
                        'date': "October 13, 1975, 17:00:00",
                        'temperature': 5
                    },
                    {
                        'date': "October 13, 1975, 18:00:00",
                        'temperature': 7
                    },
                    {
                        'date': "October 13, 1975, 19:00:00",
                        'temperature': 15
                    },
                    {
                        'date': "October 13, 1975, 20:00:00",
                        'temperature': 9
                    },
                    {
                        'date': "October 13, 1975, 21:00:00",
                        'temperature': 19
                    },
                    {
                        'date': "October 13, 1975, 22:00:00",
                        'temperature': 16
                    },
                    {
                        'date': "October 13, 1975, 23:00:00",
                        'temperature': 7
                    },
                    {
                        'date': "October 13, 1975, 24:00:00",
                        'temperature': 8
                    },
                    {
                        'date': "October 14, 1975, 01:00:00",
                        'temperature': 5
                    },
                    {
                        'date': "October 14, 1975, 02:00:00",
                        'temperature': 9
                    },
                    {
                        'date': "October 14, 1975, 03:00:00",
                        'temperature': 10
                    },
                    {
                        'date': "October 14, 1975, 04:00:00",
                        'temperature': 7
                    },
                    {
                        'date': "October 14, 1975, 05:00:00",
                        'temperature': 7
                    },
                    {
                        'date': "October 14, 1975, 06:00:00",
                        'temperature': 5
                    },
                    {
                        'date': "October 14, 1975, 07:00:00",
                        'temperature': 9
                    },
                    {
                        'date': "October 14, 1975, 08:00:00",
                        'temperature': 10
                    },
                    {
                        'date': "October 14, 1975, 09:00:00",
                        'temperature': 7
                    }
                ];
                return rtn;
            };
            FlexOfferCtrl.$inject = ['$scope', '$http', 'wmFactory', 'dataFactory', 'Auth'];
            return FlexOfferCtrl;
        })();
        Controllers.FlexOfferCtrl = FlexOfferCtrl;
    })(app.Controllers || (app.Controllers = {}));
    var Controllers = app.Controllers;
})(app || (app = {}));

app.registerController('FlexOfferCtrl', ['$scope', '$http', 'wmFactory', 'dataFactory', 'Auth']);
