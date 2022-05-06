package proj1.dao;

import java.util.List;

import proj1.model.Reimbursement;


/**
 * Dao interface for Reimbursements
 * @author modde
 *
 */
public interface ReimbursementDao {
	
	//create
	public boolean addReimbursment(Reimbursement reimbursement);
	
	//read
	public List<Reimbursement> allReimbursements(int status, int author);
	public Reimbursement oneReimbursement(int reimbID);
	public List<Reimbursement> oneUserReimbursements(int userID);
	
	
	//update
//	public boolean updateAmount (int reimbID, double amount);
	public void updateStatus(int reimbID, int statusID, int resolverID);
	
	//delete
//	public boolean deleteReimbursement(int reimbID);

}
