/// <reference path='../_all.ts' />


module app.Controllers {


    export interface TemperatureScope {
        temperatures: Array<Temperature>;
    }


    export class TemperatureCtrl {

        private scope: TemperatureScope;

        constructor($scope: TemperatureScope) {

            this.scope = $scope;
            
            this.scope.temperatures = [{
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

        }
    }

}

app.registerController('TemperatureCtrl', ['$scope']);  