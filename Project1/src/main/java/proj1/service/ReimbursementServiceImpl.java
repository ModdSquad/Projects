package proj1.service;

import java.util.ArrayList;
import java.util.List;

import proj1.dao.ReimbursementDao;
import proj1.dao.ReimbursementDaoImpl;
import proj1.model.Reimbursement;

public class ReimbursementServiceImpl implements ReimbursementService {
	
	ReimbursementDao myReimbursementDao = new ReimbursementDaoImpl();

	/**
	 * Take in reimbursement object and forward on to Dao layer
	 */
	@Override
	public boolean addReimbursment(Reimbursement reimbursement) {
		myReimbursementDao.addReimbursment(reimbursement);
		return false;
	}

	
	/**
	 * Take int status and int author and forward on to Dao layer
	 */
	@Override
	public List<Reimbursement> allReimbursements(int status, int author) {
		List<Reimbursement> reimbList = new ArrayList<>();
		reimbList = myReimbursementDao.allReimbursements(status, author);
		return reimbList;
	}

	/**
	 * get single reimbursement by ID
	 */
	@Override
	public Reimbursement oneReimbursement(int reimbID) {
		Reimbursement reimb = new Reimbursement();
		reimb = myReimbursementDao.oneReimbursement(reimbID);
		return reimb;
	}

	/**
	 * get list of single user's reimbursements based on that user ID
	 */
	@Override
	public List<Reimbursement> oneUserReimbursements(int userID) {
		List<Reimbursement> userReimbursements = new ArrayList<>();
		userReimbursements = myReimbursementDao.oneUserReimbursements(userID);
		return userReimbursements;
	}

	@Override
	public void updateStatus(int reimbID, int status, int author) {
		
		myReimbursementDao.updateStatus(reimbID,status, author);
		
	}
	

}
