package proj1.frontcontroller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class MasterServlet
 */
@WebServlet(name = "MasterServlet", urlPatterns = { "/master/*", "/forwarding/*", "/redirecting/*", "/login/*", "/json/*"})
public class MasterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	protected boolean isLoggedIn(HttpServletRequest req) {
		if (req.getRequestURI().indexOf("/Project1/login/") == -1 && req.getSession(false) == null)
			return false;
		else
			return true;

	}

	//send to dispatcher if user is logged in and the request is coming from Project1/login
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		if (isLoggedIn(req)) {
			Dispatcher.myVirtualRouterMethod(req, resp); 
		} else {
			req.getRequestDispatcher("/resources/html/badlogin.html").forward(req, resp);
			
		}
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}

}
