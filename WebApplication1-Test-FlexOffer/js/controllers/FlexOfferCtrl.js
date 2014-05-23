/// <reference path='../_all.ts' />
var app;
(function (app) {
    (function (Controllers) {
        var FlexOfferCtrl = (function () {
            function FlexOfferCtrl($scope) {
                var _this = this;
                this.scope = $scope;
                this.scope.isFlexOfferGenerated = false;

                /* Fetch Heat Pump Data*/
                this.getHPParam();

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
                this.scope.decrementSet = function () {
                    _this.decrementSet();
                };
                this.scope.incrementSet = function () {
                    _this.incrementSet();
                };
                this.scope.decrementOut = function () {
                    _this.decrementOut();
                };
                this.scope.incrementOut = function () {
                    _this.incrementOut();
                };

                /* Generates a FlexOffer + data for showing flexoffer, temperature and schedule*/
                this.scope.generateFlexOffer = function () {
                    _this.generateFlexOffer();
                };
            }
            FlexOfferCtrl.prototype.updateSunEffect = function (value) {
                console.debug(value);
                this.scope.suneffect = value;
            };

            FlexOfferCtrl.prototype.resetValues = function () {
                this.scope.isFlexOfferGenerated = false;
                this.getHPParam();
            };

            FlexOfferCtrl.prototype.incrementMin = function () {
                /*if (this.scope.mintemp === this.scope.settemp) {
                this.scope.settemp++;
                }*/
                if (this.scope.mintemp === this.scope.maxtemp) {
                    this.scope.maxtemp++;
                }
                this.scope.mintemp++;
            };

            FlexOfferCtrl.prototype.decrementMin = function () {
                this.scope.mintemp--;
            };

            FlexOfferCtrl.prototype.decrementMax = function () {
                /*if (this.scope.maxtemp === this.scope.settemp) {
                this.scope.settemp--;
                }*/
                if (this.scope.maxtemp === this.scope.mintemp) {
                    this.scope.mintemp--;
                }
                this.scope.maxtemp--;
            };

            FlexOfferCtrl.prototype.incrementMax = function () {
                this.scope.maxtemp++;
            };

            FlexOfferCtrl.prototype.decrementSet = function () {
                if (this.scope.settemp === this.scope.mintemp) {
                    this.scope.mintemp--;
                }
                this.scope.settemp--;
            };

            FlexOfferCtrl.prototype.incrementSet = function () {
                if (this.scope.settemp === this.scope.maxtemp) {
                    this.scope.maxtemp++;
                }
                this.scope.settemp++;
            };

            FlexOfferCtrl.prototype.decrementOut = function () {
                this.scope.outtemp--;
            };

            FlexOfferCtrl.prototype.incrementOut = function () {
                this.scope.outtemp++;
            };
            FlexOfferCtrl.prototype.getHPParam = function () {
                this.scope.settemp = 20;
                this.scope.maxtemp = 23;
                this.scope.mintemp = 18;
                this.scope.outtemp = 14;
                this.scope.suneffect = 'N';
            };

            FlexOfferCtrl.prototype.generateFlexOffer = function () {
                console.debug("Generate Flex Offer");
                this.scope.flexOffer = this.fetchFlexOffers();
                this.scope.timeslices = this.scope.flexOffer.timeslices;
                this.scope.temperatures = this.fetchTemperatures();
                this.scope.schedule = this.fetchSchedule();
                this.scope.isFlexOfferGenerated = true;
            };
            FlexOfferCtrl.prototype.fetchFlexOffers = function () {
                var rtn;
                rtn = {
                    'id': 2,
                    'timeslices': [
                        {
                            'date': "October 13, 1975, 10:00:00",
                            'minConsumption': 7,
                            'maxConsumption': 24,
                            'barValues': {}
                        },
                        {
                            'date': "October 13, 1975, 11:00:00",
                            'minConsumption': 2,
                            'maxConsumption': 16,
                            'barValues': {}
                        },
                        {
                            'date': "October 13, 1975, 12:00:00",
                            'minConsumption': 6,
                            'maxConsumption': 17,
                            'barValues': {}
                        },
                        {
                            'date': "October 13, 1975, 13:00:00",
                            'minConsumption': 7,
                            'maxConsumption': 14,
                            'barValues': {}
                        },
                        {
                            'date': "October 13, 1975, 14:00:00",
                            'minConsumption': 8,
                            'maxConsumption': 13,
                            'barValues': {}
                        },
                        {
                            'date': "October 13, 1975, 15:00:00",
                            'minConsumption': 9,
                            'maxConsumption': 15,
                            'barValues': {}
                        },
                        {
                            'date': "October 13, 1975, 16:00:00",
                            'minConsumption': 2,
                            'maxConsumption': 11,
                            'barValues': {}
                        },
                        {
                            'date': "October 13, 1975, 17:00:00",
                            'minConsumption': 3,
                            'maxConsumption': 4,
                            'barValues': {}
                        },
                        {
                            'date': "October 13, 1975, 18:00:00",
                            'minConsumption': 3,
                            'maxConsumption': 5,
                            'barValues': {}
                        },
                        {
                            'date': "October 13, 1975, 19:00:00",
                            'minConsumption': 7,
                            'maxConsumption': 14,
                            'barValues': {}
                        },
                        {
                            'date': "October 13, 1975, 20:00:00",
                            'minConsumption': 6,
                            'maxConsumption': 20,
                            'barValues': {}
                        },
                        {
                            'date': "October 13, 1975, 21:00:00",
                            'minConsumption': 14,
                            'maxConsumption': 24,
                            'barValues': {}
                        },
                        {
                            'date': "October 13, 1975, 22:00:00",
                            'minConsumption': 13,
                            'maxConsumption': 28,
                            'barValues': {}
                        },
                        {
                            'date': "October 13, 1975, 23:00:00",
                            'minConsumption': 5,
                            'maxConsumption': 14,
                            'barValues': {}
                        },
                        {
                            'date': "October 13, 1975, 24:00:00",
                            'minConsumption': 7,
                            'maxConsumption': 8,
                            'barValues': {}
                        },
                        {
                            'date': "October 14, 1975, 01:00:00",
                            'minConsumption': 3,
                            'maxConsumption': 14,
                            'barValues': {}
                        },
                        {
                            'date': "October 14, 1975, 02:00:00",
                            'minConsumption': 7,
                            'maxConsumption': 14,
                            'barValues': {}
                        },
                        {
                            'date': "October 14, 1975, 03:00:00",
                            'minConsumption': 8,
                            'maxConsumption': 21,
                            'barValues': {}
                        },
                        {
                            'date': "October 14, 1975, 04:00:00",
                            'minConsumption': 4,
                            'maxConsumption': 18,
                            'barValues': {}
                        },
                        {
                            'date': "October 14, 1975, 05:00:00",
                            'minConsumption': 6,
                            'maxConsumption': 19,
                            'barValues': {}
                        },
                        {
                            'date': "October 14, 1975, 06:00:00",
                            'minConsumption': 4,
                            'maxConsumption': 21,
                            'barValues': {}
                        },
                        {
                            'date': "October 14, 1975, 07:00:00",
                            'minConsumption': 7,
                            'maxConsumption': 12,
                            'barValues': {}
                        },
                        {
                            'date': "October 14, 1975, 08:00:00",
                            'minConsumption': 9,
                            'maxConsumption': 11,
                            'barValues': {}
                        },
                        {
                            'date': "October 14, 1975, 09:00:00",
                            'minConsumption': 4,
                            'maxConsumption': 14,
                            'barValues': {}
                        }
                    ]
                };
                return rtn;
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
            FlexOfferCtrl.prototype.fetchSchedule = function () {
                var rtn;
                rtn = [
                    {
                        'date': "October 13, 1975, 10:00:00",
                        'consumption': 9
                    },
                    {
                        'date': "October 13, 1975, 11:00:00",
                        'consumption': 4
                    },
                    {
                        'date': "October 13, 1975, 12:00:00",
                        'consumption': 7
                    },
                    {
                        'date': "October 13, 1975, 13:00:00",
                        'consumption': 10
                    },
                    {
                        'date': "October 13, 1975, 14:00:00",
                        'consumption': 9
                    },
                    {
                        'date': "October 13, 1975, 15:00:00",
                        'consumption': 8
                    },
                    {
                        'date': "October 13, 1975, 16:00:00",
                        'consumption': 4
                    },
                    {
                        'date': "October 13, 1975, 17:00:00",
                        'consumption': 5
                    },
                    {
                        'date': "October 13, 1975, 18:00:00",
                        'consumption': 7
                    },
                    {
                        'date': "October 13, 1975, 19:00:00",
                        'consumption': 15
                    },
                    {
                        'date': "October 13, 1975, 20:00:00",
                        'consumption': 9
                    },
                    {
                        'date': "October 13, 1975, 21:00:00",
                        'consumption': 19
                    },
                    {
                        'date': "October 13, 1975, 22:00:00",
                        'consumption': 16
                    },
                    {
                        'date': "October 13, 1975, 23:00:00",
                        'consumption': 7
                    },
                    {
                        'date': "October 13, 1975, 24:00:00",
                        'consumption': 8
                    },
                    {
                        'date': "October 14, 1975, 01:00:00",
                        'consumption': 5
                    },
                    {
                        'date': "October 14, 1975, 02:00:00",
                        'consumption': 9
                    },
                    {
                        'date': "October 14, 1975, 03:00:00",
                        'consumption': 10
                    },
                    {
                        'date': "October 14, 1975, 04:00:00",
                        'consumption': 7
                    },
                    {
                        'date': "October 14, 1975, 05:00:00",
                        'consumption': 7
                    },
                    {
                        'date': "October 14, 1975, 06:00:00",
                        'consumption': 5
                    },
                    {
                        'date': "October 14, 1975, 07:00:00",
                        'consumption': 9
                    },
                    {
                        'date': "October 14, 1975, 08:00:00",
                        'consumption': 10
                    },
                    {
                        'date': "October 14, 1975, 09:00:00",
                        'consumption': 7
                    }
                ];

                return rtn;
            };
            FlexOfferCtrl.$inject = ['$scope'];
            return FlexOfferCtrl;
        })();
        Controllers.FlexOfferCtrl = FlexOfferCtrl;
    })(app.Controllers || (app.Controllers = {}));
    var Controllers = app.Controllers;
})(app || (app = {}));

app.registerController('FlexOfferCtrl', ['$scope']);
//# sourceMappingURL=flexOfferCtrl.js.map
