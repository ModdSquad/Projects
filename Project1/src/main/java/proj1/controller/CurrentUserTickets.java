package proj1.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import proj1.model.Reimbursement;
import proj1.service.ReimbursementService;
import proj1.service.ReimbursementServiceImpl;

public class CurrentUserTickets {
	
	
	/**
	 * returns JSON list of reimbursement objects based on Session ID
	 * @param req
	 * @param resp
	 * @throws ServletException
	 * @throws IOException
	 */
	public static void currentUserHistory(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
	
	int userID = (int)req.getSession().getAttribute("loggedInUserID");
	ReimbursementService myReimbService = new ReimbursementServiceImpl();
	
	List<Reimbursement> userReimbList = new ArrayList<>();
	
	userReimbList = myReimbService.oneUserReimbursements(userID);
	
	resp.setContentType("application/json");
	PrintWriter printer = resp.getWriter();
	printer.write(new ObjectMapper().writeValueAsString(userReimbList));
	
	
	}
	
	/**
	 * Returns JSON list of reimbursement objects for a user that isn't the current sessionID
	 * @param req
	 * @param resp
	 * @throws ServletException
	 * @throws IOException
	 */
	public static void currentUserJson(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
		ReimbursementService myReimbService = new ReimbursementServiceImpl();
		
		
		ObjectMapper mapper = new ObjectMapper();
		
		String useID = mapper.readValue(req.getInputStream(), String.class);
		
		int userID = Integer.parseInt(useID);
		
		List<Reimbursement> userReimbList = new ArrayList<>();
		
		userReimbList = myReimbService.oneUserReimbursements(userID);
		
		resp.setContentType("application/json");
		PrintWriter printer = resp.getWriter();
		printer.write(new ObjectMapper().writeValueAsString(userReimbList));
		
	}
}
