﻿/// <reference path='../_all.ts' />


module app.Controllers {

    export interface HeatPumpParams {
        maxtemp: number;
        mintemp: number;
        outtemp: number;
        suneffect: string;
    }
  
    export interface FlexOfferScope {
        /* Data */
        maxtemp: number;
        mintemp: number;
        outtemp: number;
        suneffect: string;
        flexOffer: FlexOffer;
        temperatures: Array<Temperature>;

        /* Methods used for user interaction */
        updateSunEffect: Function;
        getFlexOffer: Function;
	setParameters: Function;
        resetValues: Function;
        postSchedule: Function;

        incrementMin: Function;
        decrementMin: Function;
        incrementMax: Function;
        decrementMax: Function;
        incrementOut: Function;
        decrementOut: Function;

        /* Bool that decides if buttons is to be shown*/
        isFlexOfferAssigned: boolean;

        /* Scope specifics */
        status: string;
        username: string;
        password: string;

	modal: any;
    }


    export class FlexOfferCtrl {

        private scope: FlexOfferScope;
        private http;
        private wmFactory;
	private dataFactory;
	private Auth;
        private dataset = [];
        private urlb = "http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=imperial&cnt=14&callback=JSON_CALLBACK&q=Aalborg";
        private urlBase = 'http://api.neogrid.dk/arrowhead/trigger';
        private urlf = 'http://api.neogrid.dk/arrowhead/flexoffers'
       

        static $inject = ['$scope', '$http', 'wmFactory', 'dataFactory', 'Auth'];
        constructor($scope: FlexOfferScope, $http, wmFactory, dataFactory, Auth) {
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
  
            this.scope.getFlexOffer = () => {this.getFlexOffer(); };
            this.scope.setParameters = () => {this.trigger(); };
	    this.scope.flexOffer = null;

	    this.scope.temperatures = this.fetchTemperatures();

            $scope.modal = { title: 'Title', content: 'Hello Modal<br />This is a multiline message!' };

            /* Define Scope Functions */
            this.scope.updateSunEffect = (value: string) => { this.updateSunEffect(value); };
            this.scope.resetValues = () => { this.resetValues(); };
            this.scope.incrementMin = () => { this.incrementMin(); };
            this.scope.decrementMin = () => { this.decrementMin(); };
            this.scope.decrementMax = () => { this.decrementMax(); };
            this.scope.incrementMax = () => { this.incrementMax(); };
            this.scope.decrementOut = () => { this.decrementOut(); };
            this.scope.incrementOut = () => { this.incrementOut(); };
            
        }
        public updateSunEffect(value: string) {
            this.scope.suneffect = value;
        }

        public resetValues() {
            this.scope.isFlexOfferAssigned = false;
            this.getHPParam();
        }

        public incrementMin() {
            if (this.scope.mintemp === this.scope.maxtemp) {
                this.scope.maxtemp++;
            }
            this.scope.mintemp++;
        }

        public decrementMin() {
            this.scope.mintemp--;
        }

        public decrementMax() {
            if (this.scope.maxtemp === this.scope.mintemp) {
                this.scope.mintemp--;
            }
            this.scope.maxtemp--;
        }

        public incrementMax() {
            this.scope.maxtemp++;
        }

        public decrementOut() {
            this.scope.outtemp--;
        }

        public incrementOut() {
            this.scope.outtemp++;
        }


        private getHPParam() {
	  this.Auth.setCredentials("arrowhead", "bB#aal9oOo");
            this.dataFactory.getHPParam()
                .success((custs) => {
                    this.dataset = custs;
                    console.debug("calling factory from getParam");
                    //console.debug(this.dataset);
		    this.scope.maxtemp = custs.ti_high;
		    this.scope.mintemp = custs.ti_low;
		    this.scope.outtemp = custs.to_avg;
		    this.scope.suneffect = this.cloudCoverValToString(custs.cloud_cover);
                })
                .error((error)=> {
                    console.debug(this.scope.status);
                    this.scope.status = 'Unable to load customer data: ' + error.message;
                    console.debug(this.scope.status);
                });
        }

	private trigger() {
	  this.dataFactory.triggerFO(this.scope.mintemp, this.scope.maxtemp, this.scope.outtemp, this.cloudCoverStringToVal(this.scope.suneffect))
                .success( (custs) => {
                    this.dataset = custs;
                    console.debug("calling factory from trigger");
		    //console.debug(this.dataset);
		    this.scope.flexOffer = convertFlexOffer(this.dataset);
		    //console.log(this.scope.flexOffer);
                })
                .error(function (error) {
                    console.debug(this.scope.status);
                    this.scope.status = 'Unable to load customer data: ' + error.message;
                    console.debug(this.scope.status);
                });
	}

	private getFlexOffer() {
	  this.dataFactory.getFlexOffer()
                .success( (custs) => {
                    this.dataset = custs;
                    console.debug("calling factory from getFlexOffer");
		    //console.debug(this.dataset);
		    this.scope.flexOffer = convertFlexOffer(this.dataset);
		    console.log(this.scope.flexOffer);
                })
                .error(function (error) {
                    console.debug(this.scope.status);
                    this.scope.status = 'Unable to load customer data: ' + error.message;
                    console.debug(this.scope.status);
                });
	}

	private cloudCoverValToString(val){
	  switch(val){
	    case 100:
	      return 'N';
	    case 50:
	      return 'H';
	    case 0:
	      return 'B';
	  }
	}

	private cloudCoverStringToVal(str){
	  if(str == 'B'){
	    return 100;
	  }else if(str == 'H'){
	    return 50;
	  }else if(str == 'N'){
	    return 0;
	  }
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
    }

}

app.registerController('FlexOfferCtrl', ['$scope', '$http', 'wmFactory', 'dataFactory', 'Auth']); 
