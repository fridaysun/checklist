myApp.controller("homeController",function($scope) {
    $scope.message = "AngularJS Home test message.";
});

myApp.controller("dounutController",function($scope) {
    $scope.options = {
            chart: {
                type: 'pieChart',
                height: 400,
                donut: true,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                title: "Risk:85%",

                pie: {
                    startAngle: function(d) { return d.startAngle -Math.PI },
                    endAngle: function(d) { return d.endAngle -Math.PI }
                },
                duration: 500,
                legend: {
                    margin: {
                        top: 5,
                        right: 30,
                        bottom: 5,
                        left: 5
                    }
                }
            }
        };

        $scope.data = [
            {
                color: "green",
                key: "Pass",
                y: 34
            },{
                color: "red",
                key: "Fail",
                y: 8
            },{
                color: "lightgrey",
                key: "Ongoing",
                y: 67
            },{
                color: "orange",
                key: "Warning",
                y: 3
            },{
                color: "darkblue",
                key: "Blocking",
                y: 4
            },{
                color: "blue",
                key: "Skip",
                y: 50
            }
        ];
});