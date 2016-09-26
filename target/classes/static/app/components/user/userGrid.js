var app = angular.module('userGrid', ['ui.grid', 'ui.grid.selection','ui.grid.pagination','userService']);

app.controller('userGridCtrl', function ($scope,$http,$filter,uiGridConstants,user,$log) {
	
	var self = this;
	
	self.newuser={};
	
	var userData=[];
	
	  self.gridOptions = {			  
		enableRowSelection: true, 
		enableRowHeaderSelection: true,	    
		enableFiltering: true,
		paginationPageSizes: [10,15,25, 50, 75,100],
		paginationPageSize: 10,
		showGridFooter:false
	  };
	  
	  self.gridOptions.multiSelect = true;
	  self.gridOptions.modifierKeysToMultiSelect = false;
	  self.gridOptions.noUnselect = false;
	  
	  self.gridOptions.onRegisterApi = function(gridApi) {
		    self.gridApi = gridApi;
		    
		    gridApi.selection.on.rowSelectionChanged($scope,function(row){
		        var msg = 'row selected ' + row.isSelected;
		        $log.log(msg);
		        
		        var currentSelection = gridApi.selection.getSelectedRows();
			    $log.log("selected: "+currentSelection.length);
			    
			    user.initialize(currentSelection);
			    
			    console.log(JSON.stringify(self.newuser));
			    
		      });

		      gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
		        var msg = 'rows changed ' + rows.length;
		        $log.log(msg);
		        var currentSelection = gridApi.selection.getSelectedRows();
			    $log.log("selected: "+currentSelection.length);
			    
			    user.initialize(currentSelection);
		      });
	  }
	  
	  self.createUser = function(){
      	console.log("createUser");
      	
      	$http.put('user/', JSON.stringify(user.newuser)).then(function (response) {
      		console.log(response);
      		if (response.data) {
  				
  				if(response.data.status=="success"){
  					self.fetchData();
  	  				setGlobalMsg("Info :"+response.data.message ,"success-msg");
  				} else {
  					
  					setGlobalMsg("Error : "+response.data.message,"error-msg");
  				}  				
  			}
  			
  			}, function (response) {
  			
  			setGlobalMsg("Error : "+response.statusText,"error-msg");
  			});
      	
      	console.log(JSON.stringify(user.newuser));
      	
      	 //self.messgage= "Successfully Created";
      }
	  
	  
      self.modifyUser = function() {
      	console.log("modifyUser");
      	if(user.selectedCount==1){
      		
      		$http.put('user/'+user.newuser.id, JSON.stringify(user.newuser)).then(function (response) {
      			console.log(response);
          		if (response.data) {
      				
      				if(response.data.status=="success"){
      					self.fetchData();
      	  				setGlobalMsg("Info :"+response.data.message ,"success-msg");
      				} else {
      					
      					setGlobalMsg("Error : "+response.data.message,"error-msg");
      				}  				
      			}
      			}, function (response) {
      	        			setGlobalMsg("Error : "+response.statusText,"error-msg");
      			});
      		
      	} else if(user.selectedCount==0){
      		setGlobalMsg("Error : Please select one user to modify","error-msg");
      	} else {
      		//alert("Muliple users selected, Please select only one user to modify");
      		setGlobalMsg("Error : Muliple users selected, Please select only one user to modify","error-msg");
      	}
      }
      
      self.deleteUser = function() {
      	
      	console.log("deleteUser");
      	
      	if(user.selectedCount==0){
      		setGlobalMsg("Error : Please select atleast one user to delete","error-msg");
      	} else {
      		
      		if(confirm("Do you really want to delete the selected users?")) {
      		
      		$http.delete('user/'+user.getAllSelectedIds()).then(function (response) {
      			console.log(response);
          		if (response.data) {
      				
      				if(response.data.status=="success"){
      					self.fetchData();
      	  				setGlobalMsg("Info :"+response.data.message ,"success-msg");
      				} else {
      					
      					setGlobalMsg("Error : "+response.data.message,"error-msg");
      				}  				
      			}
      			}, function (response) {        
      			setGlobalMsg("Error : "+response.statusText,"error-msg");
      			});
      		
      		}
      	}
      }
	  
	  
	  self.filterOptions={filterText:''};
	  self.searchText="";
	  self.reloadgrid=function(){
		  
		  var resultData = $filter('advancefilter')(userData, self.searchText);
		   if(resultData != undefined){			   
			   self.gridOptions.data = resultData;
		   }  
	  }
 
  self.gridOptions.columnDefs = [
                                   { name: 'id' ,displayName:"User Id",wordWrap:true,width:160,filter:{placeholder: 'Search User Id'}},
                                   {name: 'name',displayName:"Name", width:150,filter:{placeholder: 'Search Name '}},
                                   {name: 'age',displayName:"Age", filter:{placeholder: 'Search Age'}},
                                   { name: 'salary',displayName:"Salary",filter: {placeholder: 'Search Salary'}}
                                ];
  // replace this web service call
 //$http.get('app/shared/resources/user.json')
  
  self.fetchData = function(){
  $http.get('user/')
  .success(function (data) {
	  console.log(data);
	  userData=data;
	  
	  if(userData == undefined){
		  userData =[];
      }
    self.gridOptions.data = userData;
  });
  };
  
  self.fetchData();
  
  
  
})
.filter('advancefilter', ['$filter', function($filter){
    return function(data, text){
        var textArr = [];
        
        text = $.trim(text);
        
        if(hasWhiteSpace(text)){        	
        	textArr = text.split(' ');
        } else{
        	textArr.push(text);
        }
        
        angular.forEach(textArr, function(test){
            if(test){
                  data = $filter('filter')(data, test);
            }
        });
        
        if(data == undefined){
        	data =[];
        }
        return data;
    }
}]);

