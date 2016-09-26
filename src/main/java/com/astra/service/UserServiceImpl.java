package com.astra.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Service;

import com.astra.model.User;

/**
 * 
 * @Project Astra Demo
 * @Author Vijayakumar Anbu
 * @Date Sep 17, 2016
 * @Java-Version 1.8
 */
@Service("userService")
public class UserServiceImpl implements UserService{
	
	private static final AtomicLong counter = new AtomicLong();
	
	private static List<User> users;
	
	static{
		users= populateDummyUsers();
	}

	public List<User> findAllUsers() {
		return users;
	}
	
	public User findById(long id) {
		for(User user : users){
			if(user.getId() == id){
				return user;
			}
		}
		return null;
	}
	
	public User findByName(String name) {
		for(User user : users){
			if(user.getName().equalsIgnoreCase(name)){
				return user;
			}
		}
		return null;
	}
	
	public void saveUser(User user) {
		user.setId(counter.incrementAndGet());
		users.add(user);
	}

	public void updateUser(User user) {
		int index = users.indexOf(user);
		users.set(index, user);
	}

	public void deleteUserById(long id) {
		
		for (Iterator<User> iterator = users.iterator(); iterator.hasNext(); ) {
		    User user = iterator.next();
		    if (user.getId() == id) {
		        iterator.remove();
		    }
		}
	}

	public boolean isUserExist(User user) {
		return findByName(user.getName())!=null;
	}
	
	public void deleteAllUsers(){
		users.clear();
	}

	private static List<User> populateDummyUsers(){
		List<User> users = new ArrayList<User>();
		users.add(new User(counter.incrementAndGet(),"Sam",30, 70000));
		users.add(new User(counter.incrementAndGet(),"Tom",40, 50000));
		users.add(new User(counter.incrementAndGet(),"Jerome",45, 30000));
		users.add(new User(counter.incrementAndGet(),"Sathish",50, 40000));
		users.add(new User(counter.incrementAndGet(),"Vijay",30, 80000));
		users.add(new User(counter.incrementAndGet(),"Rajesh",40, 20000));
		users.add(new User(counter.incrementAndGet(),"Vimala",45, 45000));
		users.add(new User(counter.incrementAndGet(),"Selva",50, 48000));
		users.add(new User(counter.incrementAndGet(),"Samuvek",38, 70000));
		users.add(new User(counter.incrementAndGet(),"Tommy",36, 53400));
		users.add(new User(counter.incrementAndGet(),"Jerome",45, 37600));
		users.add(new User(counter.incrementAndGet(),"Sathish",50, 43000));
		users.add(new User(counter.incrementAndGet(),"Vijayan",39, 84000));
		users.add(new User(counter.incrementAndGet(),"Raju",20, 20500));
		users.add(new User(counter.incrementAndGet(),"Vimal",28, 42300));
		users.add(new User(counter.incrementAndGet(),"Selva",34, 48000));
		return users;
	}

}
