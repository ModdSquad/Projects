package proj1.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;


import proj1.model.Reimbursement;
import proj1.service.ReimbursementService;
import proj1.service.ReimbursementServiceImpl;


/**
 * for adding a reimbursement
 * @author modde
 *
 */
public class AddReimbursement {
	
	public static void addReimbursement(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		
		ReimbursementService myReimbService = new ReimbursementServiceImpl();
		
		//reimbursement object is created in javascript and passed here straight into a java reimbursement object,
		ObjectMapper mapper = new ObjectMapper();
		Reimbursement newReimb = mapper.readValue(req.getInputStream(), Reimbursement.class);
		
		
		myReimbService.addReimbursment(newReimb);
		
		//req.getRequestDispatcher("/resources/html/employeeHome.html").forward(req, resp);
	}


}
