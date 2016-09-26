/**
 * 
 */
package com.astra.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.astra.model.ResponseMessage;
import com.astra.model.User;
import com.astra.service.UserService;

/**
 * 
 * @Project Astra Demo
 * @Author Vijayakumar Anbu
 * @Date Sep 17, 2016
 * @Java-Version 1.8
 */
@RestController
public class UserController {
	
	 @Autowired
	 UserService userService;  
	
	    
	    @RequestMapping(value = "/user/", method = RequestMethod.GET)
	    public ResponseEntity<List<User>> listAllUsers() {
	        List<User> users = userService.findAllUsers();
	        if(users.isEmpty()){
	          //  return new ResponseEntity<List<User>>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
	        }
	        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	    }
	 
	 
	    //-------------------Retrieve Single User--------------------------------------------------------
	     
	    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	    public ResponseEntity<User> getUser(@PathVariable("id") long id) {
	        System.out.println("Fetching User with id " + id);
	        User user = userService.findById(id);
	        if (user == null) {
	            System.out.println("User with id " + id + " not found");
	            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<User>(user, HttpStatus.OK);
	    }
	 
	     
	     
	    //-------------------Create a User--------------------------------------------------------
	     
	    @RequestMapping(value = "/user/", method = RequestMethod.PUT)
	    public ResponseEntity<ResponseMessage> createUser(@RequestBody User user) {
	        System.out.println("Creating User " + user.getName());
	        
	        ResponseMessage responseMsg = new ResponseMessage();
	        
	        if (userService.isUserExist(user)) {
	            System.out.println("A User with name " + user.getName() + " already exist");
	            responseMsg.setStatus("failure");
	            responseMsg.setMessage("A User with name " + user.getName() + " already exist");
	            return new ResponseEntity<ResponseMessage>(responseMsg, HttpStatus.OK);
	        }
	 
	        userService.saveUser(user);
	 
	        responseMsg.setStatus("success");
            responseMsg.setMessage("New user created successfully");
	        return new ResponseEntity<ResponseMessage>(responseMsg, HttpStatus.OK);
	    }
	 
	     
	    //------------------- Update a User --------------------------------------------------------
	     
	    @RequestMapping(value = "/user/{id}", method = RequestMethod.PUT)
	    public ResponseEntity<ResponseMessage> updateUser(@PathVariable("id") long id, @RequestBody User user) {
	        System.out.println("Updating User " + id);
	         
	        User currentUser = userService.findById(id);
	        
	        ResponseMessage responseMsg = new ResponseMessage();
	        
	        if (currentUser==null) {
	            System.out.println("User with id " + id + " not found");
	            responseMsg.setStatus("failure");
	            responseMsg.setMessage("A user with name " + user.getName() + " doesn't exist");
	            return new ResponseEntity<ResponseMessage>(responseMsg, HttpStatus.OK);
	        }
	 
	        currentUser.setName(user.getName());
	        currentUser.setAge(user.getAge());
	        currentUser.setSalary(user.getSalary());
	         
	        userService.updateUser(currentUser);
	        
	        responseMsg.setStatus("success");
            responseMsg.setMessage("User with name "+currentUser.getName()+ " modified successfully");
            
	        return new ResponseEntity<ResponseMessage>(responseMsg, HttpStatus.OK);
	    }
	 
	    //------------------- Delete a User --------------------------------------------------------
	     
	    @RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
	    public ResponseEntity<ResponseMessage> deleteUser(@PathVariable("id") String ids) {
	        System.out.println("Fetching & Deleting User with id " + ids);
	        
	        ResponseMessage responseMsg = new ResponseMessage();
	        
	        List<Long> validIds = new ArrayList<>();	        
	        List<Long> inValidIds = new ArrayList<>();
	        
	        for(String idStr : ids.split(",")){
		        long id = Long.valueOf(idStr);
		        User user = userService.findById(id);
		        if (user == null) {
		            System.out.println("Unable to delete. User with id " + id + " not found");
		            inValidIds.add(id);
		        } else {
		        	validIds.add(id);
		        }		       
	        }
	        
	        if(!inValidIds.isEmpty()){
	        	responseMsg.setStatus("failure");
	            responseMsg.setMessage("Unable to delete. Users with id " + inValidIds + " are not found");
	            return new ResponseEntity<ResponseMessage>(responseMsg, HttpStatus.OK);
	        } else {
	        	
	        	for(long uid : validIds){
	        		 userService.deleteUserById(uid);
	        	}
	        	
	        }
	        
	        responseMsg.setStatus("success");
            responseMsg.setMessage("selected users deleted successfully");
            
	        return new ResponseEntity<ResponseMessage>(responseMsg, HttpStatus.OK);
	    }
	 
	     
	    //------------------- Delete All Users --------------------------------------------------------
	  /*   
	    @RequestMapping(value = "/user/", method = RequestMethod.DELETE)
	    public ResponseEntity<User> deleteAllUsers() {
	        System.out.println("Deleting All Users");
	 
	        userService.deleteAllUsers();
	        return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
	    }*/

}
