package proj1.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import proj1.model.ReimbUpdateHelper;

import proj1.service.ReimbursementService;
import proj1.service.ReimbursementServiceImpl;

public class UpdateStatusID {

	public static void updateStatus(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		
		ReimbursementService myReimbService = new ReimbursementServiceImpl();
		
//		String ID = req.getParameter("reimbID");
//		int reimbID = Integer.parseInt(ID);
//		String status = req.getParameter("reimbStatus");
//		int reimbStatus =0;
//		switch (status) {
//		case"Approved":
//			reimbStatus = 2;
//			break;
//		case"Denied":
//			reimbStatus = 3;
//			break;
//		default:
//			break;
//		}
		
		ReimbUpdateHelper helper = new ReimbUpdateHelper();
		
		ObjectMapper mapper = new ObjectMapper();
		helper = mapper.readValue(req.getInputStream(), ReimbUpdateHelper.class);
		System.out.println(helper);
		myReimbService.updateStatus(helper.getReimbID(), helper.getReimbStatus(), (int)req.getSession().getAttribute("loggedInUserID"));
		
//		req.getRequestDispatcher("/resources/html/managerHome.html").forward(req, resp);
		
	}
}
