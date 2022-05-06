package proj1.service;

import java.util.List;

import proj1.model.Reimbursement;


/**
 * reimbursement interface
 * @author modde
 *
 */
public interface ReimbursementService {
	
	//create
		public boolean addReimbursment(Reimbursement reimbursement);
		
		//read
		public List<Reimbursement> allReimbursements(int status, int author);
		public Reimbursement oneReimbursement(int reimbID);
		public List<Reimbursement> oneUserReimbursements(int userID);
		
		//update
		public void updateStatus(int reimbID, int status, int author);
		
		
		

}
