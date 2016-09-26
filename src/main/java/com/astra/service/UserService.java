package com.astra.service;

import java.util.List;

import com.astra.model.User;

/**
 * 
 * @Project Astra Demo
 * @Author Vijayakumar Anbu
 * @Date Sep 17, 2016
 * @Java-Version 1.8
 */
public interface UserService {
	
	User findById(long id);
	
	User findByName(String name);
	
	void saveUser(User user);
	
	void updateUser(User user);
	
	void deleteUserById(long id);

	List<User> findAllUsers(); 
	
	void deleteAllUsers();
	
	public boolean isUserExist(User user);
	
}
