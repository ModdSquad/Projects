package proj1.frontcontroller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import proj1.controller.AddReimbursement;
import proj1.controller.AllTickets;
import proj1.controller.CurrentTicket;
import proj1.controller.CurrentUserTickets;
import proj1.controller.HomeController;
import proj1.controller.LoginController;
import proj1.controller.UpdateStatusID;


/**
 * Dispatcher to forward to required controllers
 * @author modde
 *
 */
public class Dispatcher {

	public static void myVirtualRouterMethod(HttpServletRequest req, HttpServletResponse resp)
			throws IOException, ServletException {

		//check for method as POST and the presence of a session, otherwise it will forward to a different page
		if (!req.getMethod().equals("POST") && req.getSession(false) == null) {

			req.getRequestDispatcher("/resources/html/badlogin.html").forward(req, resp);
		}

		//no real logic below, just sends each request to the correct controller
		switch (req.getRequestURI()) {

		
		case "/Project1/login/login":			
			LoginController.login(req, resp);
			break;
			
		case "/Project1/forwarding/employee":
			System.out.println("Got it");
			req.getRequestDispatcher("/resources/html/employeeHome.html").forward(req, resp);
			break;
			
		case "/Project1/forwarding/manager":
			
			req.getRequestDispatcher("/resources/html/managerHome.html").forward(req, resp);
			break;
			
		case "/Project1/forwarding/addreimbursement":
			AddReimbursement.addReimbursement(req, resp);
			break;
			
		case"/Project1/forwarding/usertickets":
			CurrentUserTickets.currentUserHistory(req, resp);
			break;
		case"/Project1/forwarding/userticketstwo":
			CurrentUserTickets.currentUserJson(req, resp);
			break;
		
		case"/Project1/forwarding/alltickets":
			AllTickets.AllUserTickets(req, resp);
			break;
			
		case"/Project1/forwarding/badlogin":
			req.getRequestDispatcher("/resources/html/badlogin.html").forward(req, resp);
			break;
			
		case"/Project1/forwarding/updatestatus":
			System.out.println("You're in the dispatcher updatestatus");
			UpdateStatusID.updateStatus(req, resp);
			break;
		case"/Project1/forwarding/oneticket":
			CurrentTicket.currentTicket(req, resp);
			break;
			
		case"/Project1/json/getuser":
			System.out.println(req.getSession().getAttribute("currentUser"));
			System.out.println(" above from json/getuser In dispatch");
			HomeController.getCurrentUserFromTheirSession(req, resp);
			break;
		case"/Project1/login/logout":
			
			HttpSession session = req.getSession();
			System.out.println("session Id before logout" + session.getId());
			session.invalidate();
			
			resp.sendRedirect("http://localhost:9001/Project1");
//			req.getRequestDispatcher("/resources/html/badlogin.html").forward(req, resp);
			break;
			
		case"/Project1/forwarding/home":
			LoginController.backHome(req, resp);
			break;
		
		default:

			req.getRequestDispatcher("/resources/html/badlogin.html").forward(req, resp);

		}

	}
}
