
var StateConfig = function($stateProvider, $urlRouterProvider, $httpProvider) {
	
	/* home page url changed for all tabs to make selected tab work*/
    var home = {
            name: 'Home',
            url: '/home',
            templateUrl: 'app/components/home/home.html'
        };
    
    var user = {
    		
    		name:"User",
            url: '/user',
            templateUrl: 'app/components/user/user.html'
    }
    
    var help = {
            name: 'Help',
            url: '/help',
            templateUrl: 'app/components/help/help.html'
        };
    
    var login = {
            name: 'Login',
            url: '/login',
            templateUrl: 'app/components/login/login.html'
        };
    
    var admin = {
            name: 'Admin',
            url: '/admin',
            templateUrl: 'app/components/admin/admin.html'
        };
    
    var error = {
            name: 'error',
            url: '/error',
            templateUrl: 'app/components/error/pagenotfound.html',
            resolve: {
                errorObj: [function () {
                    return this.self.error;
                }]
            },
            controller: function ($scope, $stateParams, errorObj) {
                $scope.mainObj = errorObj;
            }  
        };
    
	$urlRouterProvider.otherwise('/home')
    $stateProvider
        .state(home)
        .state(user)
        .state(admin)
        .state(help)
        .state(login)   
        .state(error)     

};