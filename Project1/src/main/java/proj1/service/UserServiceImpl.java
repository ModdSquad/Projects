package proj1.service;

import java.util.ArrayList;
import java.util.List;

import proj1.dao.UserDao;
import proj1.dao.UserDaoImpl;
import proj1.model.User;

public class UserServiceImpl implements UserService {
	
	UserDao myUserDao = new UserDaoImpl();

	@Override
	public List<User> allUsers() {
		List<User> allUsers = new ArrayList<>();
		allUsers= myUserDao.allUsers();
		
		return allUsers;
	}

	@Override
	public User oneUser(String username) {
		
		User oneUser = new User();
		oneUser = myUserDao.singleUser(username);
		
		return oneUser;
	}
	

}
