 
   var constantApp = angular.module('Constants', []);
   
   var tabConstants = {
	    	'Home': 'Home',
	    	'Manage_User': 'Manage User',	    	
	    	'Admin': 'Admin',
	    	'Help': 'Help',
	    	'Login': 'Login',
	    	'Logout': 'Logout'
	    };
   
   
    constantApp.constant('TAB', tabConstants);
        
