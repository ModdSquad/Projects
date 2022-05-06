package proj1.dao;

import java.util.List;

import proj1.model.User;

public interface UserDao {
	
	//create
		//no create users required
	//read
	public List<User> allUsers();
	public User singleUser(String username);
	//update
		//not required
	//delete
		//not required
	

}
