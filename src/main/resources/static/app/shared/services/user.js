var userService = angular.module('userService', []);

userService.service('user', function user() {
	
            var user = this;
            user.ismultiple = false;
            user.selectedUser =[];
            user.selectedCount = 0;
            user.newuser={};
            
            this.getAllSelectedIds= function(){
            	
            	var selectedIds = "";
            	
            	for(var i=0;i<user.selectedUser.length;i++){
            		
            		var uObj = user.selectedUser[i];
            		selectedIds +=uObj.id+",";
            		
            	}
            	
            	
            	return selectedIds;
            	
            }
            
            this.initialize = function(currentSelection){
            	 this.clear();
            	
                if(currentSelection){
                	 
                	 if(currentSelection.length > 1){
                		 user.ismultiple = true;
                	 } 
                	 
                	 if(currentSelection.length == 1){
                		 user.newuser = currentSelection[0];
                	 } else{
                		 user.newuser = {};
                	 }
                	 
                	 user.selectedUser = currentSelection;
                	 user.selectedCount = currentSelection.length;
                	 console.log("selected users:"+JSON.stringify(user) );
                }
            };
            
            this.clear = function(){
                user.ismultiple = false;
                user.selectedUser = [];
                user.selectedCount = 0;
                user.newuser = {};
               // user.newuser={};
            };
        });