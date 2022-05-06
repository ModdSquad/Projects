package proj1.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;

import proj1.model.User;



public class HomeController {

	/**
	 * forwards to home page for login
	 * @param req
	 * @param res
	 * @throws ServletException
	 * @throws IOException
	 */
	public static void home(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		
		String myPath = "/resources/html/index.html";
		
		req.getRequestDispatcher(myPath).forward(req, res);
	}
	
	
	/**
	 * returns user object for logged in user
	 * @param req
	 * @param res
	 * @throws ServletException
	 * @throws IOException
	 */
	public static void getCurrentUserFromTheirSession(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		
		User currentUser = (User)req.getSession().getAttribute("currentUser");
		HttpSession session = req.getSession();
		
		
			
		PrintWriter printer = res.getWriter();
		printer.write(new ObjectMapper().writeValueAsString(currentUser));
	}
}


