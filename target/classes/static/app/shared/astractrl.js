var app = angular.module("astraCtrlModule",[]);

var astraCtrl = function($rootScope,$scope,$location,$state) {
	self = this;
	
	/* State Provider Events*/ 	
	
    $rootScope.$on("$stateChangeStart", function (event, next, current) {
    	
    	removeGlobalMsg();
    });
    
    $rootScope.$on("$stateChangeSuccess", function (event, current, previous) {

        var newLocation = $location.path();

        $scope.newLocation = newLocation;
     

        });
    
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams,errorMsg) {
    	
       // alert("ROUTE CHANGE ERROR: " + errorMsg);
        event.preventDefault();
        $state.get('error').error = { code: 123, description: errorMsg }
        return $state.go('error');
    });
    
    self.getClass = function (path) {
    	  return ($location.path().substr(0, path.length) === path) ? 'active' : '';
    }
	
	
};

app.controller('astraCtrl',astraCtrl );