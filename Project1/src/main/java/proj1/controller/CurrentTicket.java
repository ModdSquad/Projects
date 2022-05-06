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
 * returns a single reimbursement based on the reimbursement ID
 * @author modde
 *
 */
public class CurrentTicket {
	
	public static void currentTicket(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
	System.out.println("in history");
	ObjectMapper mapper = new ObjectMapper();
	String reimbNum = mapper.readValue(req.getInputStream(), String.class);
	
	int reimbID = Integer.parseInt(reimbNum);
	
	ReimbursementService myReimbService = new ReimbursementServiceImpl();
	
	Reimbursement reimb = new Reimbursement();
	
	reimb = myReimbService.oneReimbursement(reimbID);
	
	resp.setContentType("application/json");
	PrintWriter printer = resp.getWriter();
	printer.write(new ObjectMapper().writeValueAsString(reimb));
	

	
	}
}
