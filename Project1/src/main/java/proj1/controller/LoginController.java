package proj1.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import proj1.model.User;
import proj1.service.UserService;
import proj1.service.UserServiceImpl;



public class LoginController {
	
	
	public static void login(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String myPath = null;

		UserService userServ = new UserServiceImpl();
		

	
		
		String username = req.getParameter("theirUsername");
		String password = req.getParameter("theirPassword");

		

		List<User> userList = new ArrayList<>();
		userList = userServ.allUsers();
		boolean login = false;
		
		for(User u: userList) {
			if(u.getUsername().equals(username)&&u.getUserPassword().equals(password)) {
				
				req.getSession().setAttribute("currentUser", userServ.oneUser(username));
				
				req.getSession().setAttribute("loggedInUsername", username);
				req.getSession().setAttribute("loggedInPassword", password);
				req.getSession().setAttribute("loggedInUserID", u.getUserID());
				req.getSession().setAttribute("loggedInUserRole", u.getUserRoleID());
				login = true;
				break;
			}

		}
		if (login == false) {
			HttpSession session = req.getSession();
			session.invalidate();
			myPath = "/forwarding/badlogin";
			req.getRequestDispatcher(myPath).forward(req, resp);
			
		}
		
		
		
		if (req.getSession().getAttribute("loggedInUserRole").equals(2)){
			myPath = "/forwarding/employee";
			req.getRequestDispatcher(myPath).forward(req, resp);
			
		}else if(req.getSession().getAttribute("loggedInUserRole").equals(1)) {
			myPath = "/forwarding/manager";
			req.getRequestDispatcher(myPath).forward(req, resp);
		}else {
			System.out.println("Your a wizard, Harry");
		}
			
	
		
		
	}
	
	public static void logout(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		HttpSession session = req.getSession();
		session.invalidate();
		
		
		
	}
	
	public static void backHome(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		UserService userServ = new UserServiceImpl();
		String myPath = null;
				
		if (req.getSession().getAttribute("loggedInUserRole").equals(2)){
			myPath = "/forwarding/employee";
			req.getRequestDispatcher(myPath).forward(req, resp);
			
		}else if(req.getSession().getAttribute("loggedInUserRole").equals(1)) {
			myPath = "/forwarding/manager";
			req.getRequestDispatcher(myPath).forward(req, resp);
		}else {
			System.out.println("Your a wizard, Harry");
		}
		
	}


}
