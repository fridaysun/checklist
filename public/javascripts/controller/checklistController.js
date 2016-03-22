myApp.controller('checklistController', ['$scope', 'Api', 'ApiStages','ApiHistory','ApiProjects', function($scope, Api, ApiStages, ApiHistory, ApiProjects) {
    
    $scope.dynamicTooltip = 'Hello, World!';

    $scope.form = {
        number: 1,
        testid: "1.1.1",
        priority : "Middle",
        workload: 8,
        completed: 0,
        result : "New",
        rse : "Frank.Gao",
        percent: 0
        
    };
    $scope.testcases = [];
    $scope.nexNumber = 1;
    $scope.form.number = 1;
    $scope.pageSize = 20;
    $scope.currentPage = 1;

    $scope.stages=[];
    var tempItem = {};

    $scope.skipStatus ="Hide";
    $scope.singleModel = false;
    $scope.toggle = function() {
        $scope.singleModel = !$scope.singleModel;
        if ($scope.singleModel)
            $scope.skipStatus = "Show";
        else
            $scope.skipStatus = "Hide";

    };

    var totalItems = 0;
    var gotMatch = false;
    var currentID = '';
    var currentCaseNum = 0;
    var currentWorkload = 0;
    var currentCompleted = 0;
    var lastProject = "56efc4484d2d9793137a44a5";
    var lastStageDate = 0;
    var lastChange = 0;
    
    $scope.lastStageID = "1458278484701";
    $scope.search =[];
    $scope.totalWorkload = 0;
    $scope.totalCompleted = 0;
    $scope.totalPercent = 0;
    $scope.testMessage = "AngularJS test message";
    
    ApiProjects.Testproject.query({}, function(data){
        for(var i=0; i<data.length; i++) {
            if (data[i].lastChange > lastChange)
              lastChange = data[i].lastChange;
              lastProject = data[i]._id;
        }
    });
    
    Api.Testlist.query({}, function(data){
        for(var i=0; i<data.length; i++) {
            if (data[i].stage_id == $scope.lastStageDate)
                $scope.testcases.push(data[i]);
        }

        totalItems = data.length;
    
        for(i=0; i< totalItems; i++) {
            $scope.totalWorkload = $scope.totalWorkload + $scope.testcases[i].workload;
            $scope.totalCompleted = $scope.totalCompleted + $scope.testcases[i].completed;
            $scope.totalPercent = Math.round($scope.totalCompleted/$scope.totalWorkload * 100);
        }
        console.log($scope.totalWorkload + " "+ $scope.totalCompleted + " "+ $scope.totalPercent);
    });

    ApiStages.Teststage.query({}, function(data){
        $scope.stages = data;
        for(var i=0; i<$scope.stages.length; i++) {
            if($scope.stages[i].date > $scope.search.stage_id) {
                $scope.search.stage_id = $scope.stages[i].date;
            }
        }

    });


    $scope.delete = function(item) {
        
        bootbox.confirm("Are you sure?", function(answer) {
            if(answer == true) {
                lastChange ++;
                Api.Testlist.delete({id: item._id}, function(data) {
                    for(var i=0; i<$scope.testcases.length; i++) {
                        if($scope.testcases[i]._id == item._id) {
                            $scope.testcases.splice(i, 1);
                            break;
                        }
                    }
                    tempItem.testcase_id = item._id;
                    tempItem.version = lastChange;
                    tempItem.date = Date.now();
        
                    tempItem.type = "Delete";
                    ApiHistory.TestHistory.save({},tempItem);
                    
                    ApiProjects.Testproject.save({id:lastProject},{lastChange:lastChange});
                    // bootbox.alert("Customer deleted!")
                    
                });
            }
        });
        
        totalItems --;
        currentID = '';

        console.log("Total docs in collections are: " + totalItems);
    };

    
    $scope.addToDatabase = function() {
        lastChange ++;

        if(currentID != '') {
            for(var i=0; i<totalItems; i++) {
                if ($scope.testcases[i]._id == currentID) {
                    gotMatch = true;
                    // console.log("Got match");
                    currentCaseNum = i;
                    break;
                }
            }
        }
        
        $scope.form.percent = Math.round($scope.form.completed/$scope.form.workload * 100);
        
        $scope.totalWorkload = $scope.totalWorkload - currentWorkload + $scope.form.workload;
        $scope.totalCompleted = $scope.totalCompleted - currentCompleted + $scope.form.completed;
        $scope.totalPercent = Math.round($scope.totalCompleted/$scope.totalWorkload * 100);
        // console.log($scope.totalWorkload + " "+ $scope.totalCompleted + " "+ $scope.totalPercent);
        
        
        if(gotMatch) {
            Api.Testlist.query({id: $scope.testcases[i]._id}, function(data){
                if($scope.form.number != data[0].number) 
                    tempItem.number = $scope.form.number;
                if($scope.form.testid != data[0].testid) 
                    tempItem.testid = $scope.form.testid;
                if($scope.form.items != data[0].items) 
                    tempItem.items = $scope.form.items;
                if($scope.form.result != data[0].result) 
                    tempItem.result = $scope.form.result;
                if($scope.form.priority != data[0].priority) 
                    tempItem.priority = $scope.form.priority;
                if($scope.form.workload != data[0].workload) 
                    tempItem.workload = $scope.form.workload;
                if($scope.form.completed != data[0].completed) 
                    tempItem.completed = $scope.form.completed;
                if($scope.form.rse != data[0].rse) 
                    tempItem.rse = $scope.form.rse;
                if($scope.form.comments != data[0].comments) 
                    tempItem.comments = $scope.form.comments;
                if($scope.form.stage != data[0].stage) 
                    tempItem.stage = $scope.form.stage;
                if($scope.form.percent != data[0].percent) 
                    tempItem.percent = $scope.form.percent;
                tempItem.version = lastChange;
                tempItem.date = Date.now();
                tempItem.testcase_id =  $scope.testcases[i]._id;
                tempItem.type = "Modify";
                ApiHistory.TestHistory.save({},tempItem); //save all changes into item history collections.  
                Api.Testlist.save({id: $scope.testcases[i]._id}, $scope.form, function(data){ //save all form data into fresh collection
                
                ApiProjects.Testproject.save({id:lastProject},{lastChange:lastChange});
                            
                bootbox.alert("<h3><small>Number:</small> " + data.number + "</h3> Test case updated!");
                }); 
            });
            

        }
        else {
            tempItem = $scope.form;
            tempItem.version = lastChange;
            tempItem.date = Date.now();

            tempItem.type = "New";
            ApiHistory.TestHistory.save({},tempItem);
            Api.Testlist.save({}, $scope.form, function(data){
                totalItems ++;
                $scope.testcases.push(data);
                $scope.form.number ++;
                $scope.form.comments = '';
                bootbox.alert("<h3><small>Number:</small> " + data.number  + "</h3> New items added!");
            });
        }

        gotMatch = false;
        console.log("Total docs in collections are: " + totalItems);

    };
    
    $scope.edit = function(item) {
        currentID = item._id;
        currentWorkload = item.workload;
        currentCompleted = item.completed;
        console.log(currentID);
        
        $scope.form = item;
    };
    
    
    $scope.saveShot = function() {
        var date= Date.now();
        
        bootbox.prompt({
          title: "Save all items as: "+ date.toString() + " ?",
          value: "Daily record",
          callback: function(result) {
            if (result != null) {
                var currentStage = {
                    info: result,
                    warning: 8888,
                    blocking: 8888,
                    ongoing: 8888,
                    fail: 8888,
                    pass: 8888,
                    percent: $scope.totalPercent,
                    risk: 8888,
                    total: $scope.totalWorkload,
                    date: date,
                    project_id: lastProject
                };
                ApiStages.Teststage.save({}, currentStage, function(data){
                    $scope.stages.push(data);
                });
            } 
            else {
                // bootbox.show("Prompt dismissed");
            }
          }
        });

    };
    
    $scope.clearForm = function() {
        $scope.form = {};
        $scope.form = {
            priority : "Middle",
            workload: 8,
            completed: 0,
            result : "New",
            rse : "Frank.Gao"
        };
        currentID = '';
    };
    
    $scope.clearFilter = function() {
        $scope.search = {};
    };
    
    
    $scope.showDetails = function(index) {
        
        bootbox.dialog({
        title: "Details of the test items " + '<label class="label label-default">' + 
        $scope.testcases[index].number + '</label>',

        message:    '<div class="row">' +
                    '<div class="col-md-12" style="padding:0 10px;">' +

                    '<table class="table table-hover table-condensed">' +
                    '<tr><td class="col-md-2">' +
                    '<strong> TestID: </strong>' +
                    '</td><td>' +
                    $scope.testcases[index].testid +
                    '</td></tr>' +
                    '<tr><td class="col-md-2">' +
                    '<strong> Items: </strong>' +
                    '</td><td>' +
                    $scope.testcases[index].items +
                    '</td></tr>' +
                    '<tr><td class="col-md-2">' +
                    '<strong> Priority: </strong>' +
                    '</td><td>' +
                    $scope.testcases[index].priority +
                    '</td></tr>' +
                    '<tr><td class="col-md-2">' +
                    '<strong> Workload: </strong>' +
                    '</td><td>' +
                    $scope.testcases[index].workload +
                    '</td></tr>' +
                    '<tr><td class="col-md-2">' +
                    '<strong> Result: </strong>' +
                    '</td><td>' +
                    $scope.testcases[index].result +
                    '</td></tr>' +
                    '<tr><td class="col-md-2">' +
                    '<strong> Stage: </strong>' +
                    '</td><td>' +
                    $scope.testcases[index].stage +
                    '</td></tr>' +
                    '<tr><td class="col-md-2">' +
                    '<strong> RSE: </strong>' +
                    '</td><td>' +
                    $scope.testcases[index].rse +
                    '</td></tr>' +
                    '<tr><td class="col-md-2">' +
                    '<strong> Comments: </strong>' +
                    '</td><td>' +
                    $scope.testcases[index].comments +
                    '</td></tr>' +
                    '</table>' +
                    
                    '</div>' +
                    '</div>',
                

        //   message:  '<div class="row">' +
        //             '<div class="col-md-12" style="padding:0 10px;">' +
        //             'TestID: ' + $scope.testcases[index].testid +
        //             '</div>' + 
        //             '<div class="col-md-12">' +
        //             'Items: ' + $scope.testcases[index].items +
        //             '</div>' +
        //             '<div class="col-md-12">' +
        //             'Comments: ' + $scope.testcases[index].comments +
        //             '</div>' +
        //             '</div>',
          buttons: {
            main: {
              label: "OK",
              className: "btn-primary"
            }
          }
        });
    };
    

    $scope.sortColumn = "number";
    $scope.reverseSort = false;
    
    $scope.sortData = function(column) {
        $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
        $scope.sortColumn = column;
    };
    
    $scope.getSortClass = function(column) {
        if ($scope.sortColumn == column) {
            return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
        }
        return '';
    };

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    
    $scope.pageChanged = function() {
        // console.log('Page changed to: ' + $scope.currentPage);
    };

}]);


myApp.filter('startFrom', function(){
    return function(data, start) {
        return data.slice(start);
    };
});