/// <reference path='../_all.ts' />


module app.Controllers {


  export interface AggScope {

    /* Bool that decides if buttons is to be shown*/
    isFlexOfferGenerated: boolean;

    aggFlexOffers: Array<AggFlexOffer>;
    curAggFlexOffer: number;
    getAggFlexOffers: Function;
    nextAggFO: Function;
    prevAggFO: Function;
    schedule: Function;

    /* Scope specifics */
    status: string;
  }


  export class AggCtrl {

    private scope: AggScope;
    private http;
    private aggFactory;
    private dataset = [];

    static $inject = ['$scope', '$http', 'aggFactory'];
    constructor($scope: AggScope, $http, aggFactory) {
      this.http = $http;
      this.scope = $scope;
      this.aggFactory = aggFactory;

      aggFactory.aggregate().success(()=>{this.getAggFos();});

      this.scope.isFlexOfferGenerated = false;
      /* Fetch Heat Pump Data*/
      this.scope.aggFlexOffers = new Array<AggFlexOffer>();
      this.scope.curAggFlexOffer = 0;
      this.scope.nextAggFO = () => {this.nextAggFO()};
      this.scope.prevAggFO = () => {this.prevAggFO()};
      this.scope.schedule = () => {this.schedule()};
      this.scope.getAggFlexOffers = () => {this.getAggFos()};
    }

    private getAggFos() {
      this.aggFactory.getAggFos()
      .success( (custs) => {
	this.dataset = custs;
	this.scope.aggFlexOffers.length = 0;
	this.dataset.forEach((entry) => {
	  var aggFO: AggFlexOffer= new AggFlexOffer();
	  aggFO.aggFlexOffer = convertFlexOffer(entry);
	  entry.subFoMetas.forEach((subFO) => { aggFO.flexOffers.push(convertFlexOffer(subFO.subFlexOffer)); });
	  this.scope.aggFlexOffers.push(aggFO);
	});
      })
      .error(function (error) {
	this.scope.status = 'Unable to load customer data: ' + error.message;
      });
    }

    private schedule(){
      this.aggFactory.schedule().success(()=>{this.getAggFos();});
    }

    private nextAggFO(){
      if(this.scope.curAggFlexOffer + 1 < this.scope.aggFlexOffers.length){
	this.scope.curAggFlexOffer++;
      }
      else{
	this.scope.curAggFlexOffer = 0;
      }
    }

    private prevAggFO(){
      if(this.scope.curAggFlexOffer > 0){
	this.scope.curAggFlexOffer--;
      }
      else{
	this.scope.curAggFlexOffer = this.scope.aggFlexOffers.length - 1;
      }
    }
//        private fetchFlexOffers() : FlexOffer {
//            var rtn : FlexOffer;
//            rtn = {
//                'id': 2,
//                'timeslices': [
//                    {
//                        'date': "October 13, 1975, 10:00:00",
//                        'minConsumption': 7,
//                        'maxConsumption': 24,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 13, 1975, 11:00:00",
//                        'minConsumption': 2,
//                        'maxConsumption': 16,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 13, 1975, 12:00:00",
//                        'minConsumption': 6,
//                        'maxConsumption': 17,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 13, 1975, 13:00:00",
//                        'minConsumption': 7,
//                        'maxConsumption': 14,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 13, 1975, 14:00:00",
//                        'minConsumption': 8,
//                        'maxConsumption': 13,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 13, 1975, 15:00:00",
//                        'minConsumption': 9,
//                        'maxConsumption': 15,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 13, 1975, 16:00:00",
//                        'minConsumption': 2,
//                        'maxConsumption': 11,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 13, 1975, 17:00:00",
//                        'minConsumption': 3,
//                        'maxConsumption': 4,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 13, 1975, 18:00:00",
//                        'minConsumption': 3,
//                        'maxConsumption': 5,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 13, 1975, 19:00:00",
//                        'minConsumption': 7,
//                        'maxConsumption': 14,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 13, 1975, 20:00:00",
//                        'minConsumption': 6,
//                        'maxConsumption': 20,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 13, 1975, 21:00:00",
//                        'minConsumption': 14,
//                        'maxConsumption': 24,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 13, 1975, 22:00:00",
//                        'minConsumption': 13,
//                        'maxConsumption': 28,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 13, 1975, 23:00:00",
//                        'minConsumption': 5,
//                        'maxConsumption': 14,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 13, 1975, 24:00:00",
//                        'minConsumption': 7,
//                        'maxConsumption': 8,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 14, 1975, 01:00:00",
//                        'minConsumption': 3,
//                        'maxConsumption': 14,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 14, 1975, 02:00:00",
//                        'minConsumption': 7,
//                        'maxConsumption': 14,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 14, 1975, 03:00:00",
//                        'minConsumption': 8,
//                        'maxConsumption': 21,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 14, 1975, 04:00:00",
//                        'minConsumption': 4,
//                        'maxConsumption': 18,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 14, 1975, 05:00:00",
//                        'minConsumption': 6,
//                        'maxConsumption': 19,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 14, 1975, 06:00:00",
//                        'minConsumption': 4,
//                        'maxConsumption': 21,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 14, 1975, 07:00:00",
//                        'minConsumption': 7,
//                        'maxConsumption': 12,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 14, 1975, 08:00:00",
//                        'minConsumption': 9,
//                        'maxConsumption': 11,
//                        'barValues': {}
//                    },
//                    {
//                        'date': "October 14, 1975, 09:00:00",
//                        'minConsumption': 4,
//                        'maxConsumption': 14,
//                        'barValues': {}
//                    }
//                ]
//            };
//            return rtn;
//        }
//        private fetchTemperatures() : Array<Temperature> {
//            var rtn: Array<Temperature>;
//            rtn = [{
//                'date': "October 13, 1975, 10:00:00",
//                'temperature': 9,
//            },
//                {
//                    'date': "October 13, 1975, 11:00:00",
//                    'temperature': 4
//                },
//                {
//                    'date': "October 13, 1975, 12:00:00",
//                    'temperature': 7
//                },
//                {
//                    'date': "October 13, 1975, 13:00:00",
//                    'temperature': 10
//                },
//                {
//                    'date': "October 13, 1975, 14:00:00",
//                    'temperature': 9
//                },
//                {
//                    'date': "October 13, 1975, 15:00:00",
//                    'temperature': 8
//                },
//                {
//                    'date': "October 13, 1975, 16:00:00",
//                    'temperature': 4
//                },
//                {
//                    'date': "October 13, 1975, 17:00:00",
//                    'temperature': 5
//                },
//                {
//                    'date': "October 13, 1975, 18:00:00",
//                    'temperature': 7
//                },
//                {
//                    'date': "October 13, 1975, 19:00:00",
//                    'temperature': 15
//                },
//                {
//                    'date': "October 13, 1975, 20:00:00",
//                    'temperature': 9
//                },
//                {
//                    'date': "October 13, 1975, 21:00:00",
//                    'temperature': 19
//                },
//                {
//                    'date': "October 13, 1975, 22:00:00",
//                    'temperature': 16
//                },
//                {
//                    'date': "October 13, 1975, 23:00:00",
//                    'temperature': 7
//                },
//                {
//                    'date': "October 13, 1975, 24:00:00",
//                    'temperature': 8
//                },
//                {
//                    'date': "October 14, 1975, 01:00:00",
//                    'temperature': 5
//                },
//                {
//                    'date': "October 14, 1975, 02:00:00",
//                    'temperature': 9
//                },
//                {
//                    'date': "October 14, 1975, 03:00:00",
//                    'temperature': 10
//                },
//                {
//                    'date': "October 14, 1975, 04:00:00",
//                    'temperature': 7
//                },
//                {
//                    'date': "October 14, 1975, 05:00:00",
//                    'temperature': 7
//                },
//                {
//                    'date': "October 14, 1975, 06:00:00",
//                    'temperature': 5
//                },
//                {
//                    'date': "October 14, 1975, 07:00:00",
//                    'temperature': 9
//                },
//                {
//                    'date': "October 14, 1975, 08:00:00",
//                    'temperature': 10
//                },
//                {
//                    'date': "October 14, 1975, 09:00:00",
//                    'temperature': 7
//                }
//            ];
//            return rtn;
//        }
//        private fetchSchedule(): Array<Schedule> {
//            var rtn: Array<Schedule>;
//            rtn = [{
//                'date': "October 13, 1975, 10:00:00",
//                'consumption': 9,
//            },
//                {
//                    'date': "October 13, 1975, 11:00:00",
//                    'consumption': 4
//                },
//                {
//                    'date': "October 13, 1975, 12:00:00",
//                    'consumption': 7
//                },
//                {
//                    'date': "October 13, 1975, 13:00:00",
//                    'consumption': 10
//                },
//                {
//                    'date': "October 13, 1975, 14:00:00",
//                    'consumption': 9
//                },
//                {
//                    'date': "October 13, 1975, 15:00:00",
//                    'consumption': 8
//                },
//                {
//                    'date': "October 13, 1975, 16:00:00",
//                    'consumption': 4
//                },
//                {
//                    'date': "October 13, 1975, 17:00:00",
//                    'consumption': 5
//                },
//                {
//                    'date': "October 13, 1975, 18:00:00",
//                    'consumption': 7
//                },
//                {
//                    'date': "October 13, 1975, 19:00:00",
//                    'consumption': 15
//                },
//                {
//                    'date': "October 13, 1975, 20:00:00",
//                    'consumption': 9
//                },
//                {
//                    'date': "October 13, 1975, 21:00:00",
//                    'consumption': 19
//                },
//                {
//                    'date': "October 13, 1975, 22:00:00",
//                    'consumption': 16
//                },
//                {
//                    'date': "October 13, 1975, 23:00:00",
//                    'consumption': 7
//                },
//                {
//                    'date': "October 13, 1975, 24:00:00",
//                    'consumption': 8
//                },
//                {
//                    'date': "October 14, 1975, 01:00:00",
//                    'consumption': 5
//                },
//                {
//                    'date': "October 14, 1975, 02:00:00",
//                    'consumption': 9
//                },
//                {
//                    'date': "October 14, 1975, 03:00:00",
//                    'consumption': 10
//                },
//                {
//                    'date': "October 14, 1975, 04:00:00",
//                    'consumption': 7
//                },
//                {
//                    'date': "October 14, 1975, 05:00:00",
//                    'consumption': 7
//                },
//                {
//                    'date': "October 14, 1975, 06:00:00",
//                    'consumption': 5
//                },
//                {
//                    'date': "October 14, 1975, 07:00:00",
//                    'consumption': 9
//                },
//                {
//                    'date': "October 14, 1975, 08:00:00",
//                    'consumption': 10
//                },
//                {
//                    'date': "October 14, 1975, 09:00:00",
//                    'consumption': 7
//                }
//            ];
//        
//            return rtn;
//        }
  }

}

app.registerController('AggCtrl', ['$scope', '$http', 'aggFactory']); 
