/// <reference path='../_all.ts' />


module app.Controllers {

  
    export interface FlexOfferScope {
        maxtemp: number;
        settemp: number;
        mintemp: number;
        outtemp: number;
        suneffect: string;
        updateSunEffect: Function;
        resetValues: Function;
        incrementMin: Function;
        decrementMin: Function;
        incrementMax: Function;
        decrementMax: Function;
        incrementSet: Function;
        decrementSet: Function;
        incrementOut: Function;
        decrementOut: Function;

        flexOffer: FlexOffer;
        timeslices: Array<TimeSlice>;
        temperatures: Array<Temperature>;
        schedule: Array<Schedule>
        generateFlexOffer: Function;
        isFlexOfferGenerated: boolean;
    }


    export class FlexOfferCtrl {

        private scope: FlexOfferScope;

        static $inject = ['$scope'];
        constructor($scope: FlexOfferScope) {

            this.scope = $scope;
            this.scope.isFlexOfferGenerated = false;
            /* Fetch Heat Pump Data*/
            this.getHPParam();

            /* Define Scope Functions */
            this.scope.updateSunEffect = (value: string) => { this.updateSunEffect(value); };
            this.scope.resetValues = () => { this.resetValues(); };
            this.scope.incrementMin = () => { this.incrementMin(); };
            this.scope.decrementMin = () => { this.decrementMin(); };
            this.scope.decrementMax = () => { this.decrementMax(); };
            this.scope.incrementMax = () => { this.incrementMax(); };
            this.scope.decrementSet = () => { this.decrementSet(); };
            this.scope.incrementSet = () => { this.incrementSet(); };
            this.scope.decrementOut = () => { this.decrementOut(); };
            this.scope.incrementOut = () => { this.incrementOut(); };
            /* Generates a FlexOffer + data for showing flexoffer, temperature and schedule*/
            this.scope.generateFlexOffer = () => { this.generateFlexOffer(); };
            
        }
        public updateSunEffect(value: string) {
            console.debug(value);
            this.scope.suneffect = value;
        }

        public resetValues() {
            this.scope.isFlexOfferGenerated = false;
            this.getHPParam();
        }

        public incrementMin() {
            /*if (this.scope.mintemp === this.scope.settemp) {
                this.scope.settemp++;
            }*/
            if (this.scope.mintemp === this.scope.maxtemp) {
                this.scope.maxtemp++;
            }
            this.scope.mintemp++;
        }

        public decrementMin() {
            this.scope.mintemp--;
        }

        public decrementMax() {
            /*if (this.scope.maxtemp === this.scope.settemp) {
                this.scope.settemp--;
            }*/
            if (this.scope.maxtemp === this.scope.mintemp) {
                this.scope.mintemp--;
            }
            this.scope.maxtemp--;
        }

        public incrementMax() {
            this.scope.maxtemp++;
        }

        public decrementSet() {
            if (this.scope.settemp === this.scope.mintemp) {
                this.scope.mintemp--;
            }
            this.scope.settemp--;
        }

        public incrementSet() {
            if (this.scope.settemp === this.scope.maxtemp) {
                this.scope.maxtemp++;
            }
            this.scope.settemp++;
        }

        public decrementOut() {
            this.scope.outtemp--;
        }

        public incrementOut() {
            this.scope.outtemp++;
        }
        private getHPParam() {
            this.scope.settemp = 20;
            this.scope.maxtemp = 23;
            this.scope.mintemp = 18;
            this.scope.outtemp = 14;
            this.scope.suneffect = 'N';
        }
    
        public generateFlexOffer() {
            console.debug("Generate Flex Offer");
            this.scope.flexOffer = this.fetchFlexOffers();
            this.scope.timeslices = this.scope.flexOffer.timeslices;
            this.scope.temperatures = this.fetchTemperatures();
            this.scope.schedule = this.fetchSchedule();
            this.scope.isFlexOfferGenerated = true;
        }
        private fetchFlexOffers() : FlexOffer {
            var rtn : FlexOffer;
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
        }
        private fetchTemperatures() : Array<Temperature> {
            var rtn: Array<Temperature>;
            rtn = [{
                'date': "October 13, 1975, 10:00:00",
                'temperature': 9,
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
        }
        private fetchSchedule(): Array<Schedule> {
            var rtn: Array<Schedule>;
            rtn = [{
                'date': "October 13, 1975, 10:00:00",
                'consumption': 9,
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
        }
    }

}

app.registerController('FlexOfferCtrl', ['$scope']); 