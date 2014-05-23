﻿/// <reference path='../_all.ts' />


module app.Controllers {

  
    export interface FlexOfferScope {
        flexOffer: FlexOffer;
        timeslices: Array<TimeSlice>;
        temperatures: Array<Temperature>;
        schedule: Array<Schedule>
        generateFlexOffer: Function;

    }


    export class FlexOfferCtrl {

        private scope: FlexOfferScope;
        
        constructor($scope: FlexOfferScope) {

            this.scope = $scope;

            /* Generates a FlexOffer + data for showing flexoffer, temperature and schedule*/
            this.scope.generateFlexOffer = () => { this.generateFlexOffer(); };
            
        }

        public generateFlexOffer() {
            console.debug("Generate Flex Offer");
            this.scope.flexOffer = this.fetchFlexOffers();
            this.scope.timeslices = this.scope.flexOffer.timeslices;
            this.scope.temperatures = this.fetchTemperatures();
            this.scope.schedule = this.fetchSchedule();
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