//package proj1.dao;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import proj1.model.Reimbursement;
//import proj1.service.ReimbursementService;
//import proj1.service.ReimbursementServiceImpl;
//
//public class MainTest {
//	
//	
//	public static void main (String[] args) {
//		ReimbursementService reimbDaoServ = new ReimbursementServiceImpl();
//		
//		reimbDaoServ.h2Init();
//		
//		List<Reimbursement> list = new ArrayList<>();
//		list = reimbDaoServ.allReimbursements(1, 0);
//		System.out.println(list);
//		
//		reimbDaoServ.h2Destroy();
//	}
//	
//
//}
