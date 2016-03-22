myApp.controller("helpController",['$anchorScroll', '$location', '$scope',
  function ($anchorScroll, $location, $scope) {
    $anchorScroll.yOffset = 70; 
    $scope.gotoAnchor = function(x) {
      var newHash = x;
      if ($location.hash() !== newHash) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        $location.hash(x);
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        $anchorScroll();
      }
    };
}]);