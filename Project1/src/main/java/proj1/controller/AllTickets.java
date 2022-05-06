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

/**
 * Returns json list of all reimbursements of a certain status (Submitted, Approved, or Denied), verifies user can have this before returning anything
 * @author modde
 *
 */
public class AllTickets {

	public static void AllUserTickets(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		int userRole = (int) req.getSession().getAttribute("loggedInUserRole");
		int userID = (int)req.getSession().getAttribute("loggedInUserID");
		System.out.println(userID);
		//checks to make sure the user is a financial manager before allowing them to get the list
		if (userRole == 2) {
			String myPath = "/forwarding/badlogin";
			req.getRequestDispatcher(myPath).forward(req, resp);
		}
		
		ObjectMapper mapper = new ObjectMapper();
		String status = mapper.readValue(req.getInputStream(), String.class);
		
		int statusID = Integer.parseInt(status);
		

		ReimbursementService myReimbService = new ReimbursementServiceImpl();

		List<Reimbursement> allReimbList = new ArrayList<>();

		allReimbList = myReimbService.allReimbursements(statusID, userID);

		resp.setContentType("application/json");
		PrintWriter printer = resp.getWriter();
		printer.write(new ObjectMapper().writeValueAsString(allReimbList));

	}
}
