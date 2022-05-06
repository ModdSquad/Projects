package proj1.service;

import java.util.List;

import proj1.model.User;

public interface UserService {

	//read
	public List<User> allUsers();
	public User oneUser(String username);
	
	
}
