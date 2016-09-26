  var app =angular.module('userGridMainCtrl', ['userService']);
  
    function userGridMainCtrl(user, $http,$state) {    
        self = this; 
        self.user = user;
       
    }; 
    
   app.controller("userGridMainCtrl", userGridMainCtrl);
   
  