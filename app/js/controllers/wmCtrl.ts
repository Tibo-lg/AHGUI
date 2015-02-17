/// <reference path='../_all.ts' />


module app.Controllers {

  
    export interface WMScope {

        /* Bool that decides if buttons is to be shown*/
        isFlexOfferGenerated: boolean;

	flexOffer: FlexOffer;
        getFlexOffer: Function;
	postSchedule: Function;
	earlystart: Date;
	lateend: Date;
	days: Array<String>;

	earlyStartChange: Function;
	lateEndChange: Function;
	minuteStep: number;

	setLongProgram: Function;
	setShortProgram: Function;
	xSelect: number;
	ySelect: number;
	
        /* Scope specifics */
        status: string;
    }


    export class WMCtrl {

        private scope: WMScope;
        private http;
        private wmFactory;
	private programType;
        private dataset = [];
       

        static $inject = ['$scope', '$http', 'wmFactory'];
        constructor($scope: WMScope, $http, wmFactory) {
            this.http = $http;
            this.scope = $scope;
            this.wmFactory = wmFactory;
	    var earlystart = new Date();
	    earlystart.setMinutes(0);
	    earlystart.setSeconds(0);
	    earlystart.setHours(earlystart.getHours()+1);
	    this.scope.earlystart = earlystart;
	    console.log(this.scope.earlystart);
	    this.scope.lateend = new Date(earlystart.getTime()+5*3600*1000);

            this.scope.isFlexOfferGenerated = false;
            /* Fetch Heat Pump Data*/

	    this.scope.getFlexOffer = () => {this.getWmFo(); };
	    this.scope.postSchedule = () => {this.postSchedule(); };
	    this.scope.earlyStartChange = () => {this.earlyStartChange(); };
	    this.scope.lateEndChange = () => {this.lateEndChange(); };
	    this.scope.setLongProgram = () => {this.setLongProgram(); };
	    this.scope.setShortProgram = () => {this.setShortProgram(); };

	    this.scope.days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	    this.scope.minuteStep = 15;

	    this.programType = 'SHORT';
	    this.scope.xSelect = 130;
	    this.scope.ySelect = 60;

        }

	public postSchedule(){
	  this.wmFactory.postSchedule(this.scope.earlystart, this.scope.lateend).success(()=>{this.getWmFo();});
	}

        public getWmFo() {
            this.wmFactory.getWmFos()
                .success( (custs) => {
                    this.dataset = custs;
                    console.debug("calling factory from getWmFos");
		    //console.debug(this.dataset);
		    if(this.dataset.length>0){
		      this.scope.flexOffer = convertFlexOffer(this.dataset[0]);
		      //console.log(this.scope.flexOffer);
		    }
                })
                .error(function (error) {
                    console.debug(this.scope.status);
                    this.scope.status = 'Unable to load customer data: ' + error.message;
                    console.debug(this.scope.status);
                });
        }

	public earlyStartChange(){
	  console.log('Time changed to: ' + this.scope.earlystart);
	}

	public lateEndChange(){
	  console.log('Time changed to: ' + this.scope.lateend);
	}

	public setLongProgram(){
	  this.programType = 'LONG';
	  console.debug(this.programType);
	  this.scope.xSelect = 155;
	  this.scope.ySelect = 95;
	}

	public setShortProgram(){
	  this.programType = 'SHORT';
	  console.debug(this.programType);
	  this.scope.xSelect = 130;
	  this.scope.ySelect = 60;
	}
    }

}

app.registerController('WMCtrl', ['$scope', '$http', 'wmFactory']); 
