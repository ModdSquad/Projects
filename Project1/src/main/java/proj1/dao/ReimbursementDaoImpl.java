package proj1.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


import proj1.model.Reimbursement;

/**
 * 
 * @author modde
 *
 */
public class ReimbursementDaoImpl implements ReimbursementDao {
	
	static { 
        try {
            Class.forName("org.postgresql.Driver");
        }catch(ClassNotFoundException e) {
            e.printStackTrace();
            System.out.println("Static block has failed me");
        }
	}

	public static String url = System.getenv("DB_ENDPOINT");
	public static String username = System.getenv("DB_USERNAM");
	public static String password = System.getenv("DB_PASSWORD");

	public static Connection getConnection() throws SQLException {
		return DriverManager.getConnection(url, username, password);
	}

	
	/**
	 * Take in reimbursement, should have actually used the return boolean to verify update but didn't get around to it
	 */
	@Override
	public boolean addReimbursment(Reimbursement reimbursement) {

		try (Connection conn = DriverManager.getConnection(url, username, password)) {
			String mySQLStatement = "INSERT INTO ers_reimbursement (reimb_id, reimb_amount, reimb_submitted, reimb_description,reimb_author, reimb_status_id,reimb_type_id) VALUES (DEFAULT,?,?,?,?,?,?)";

			PreparedStatement ps = conn.prepareStatement(mySQLStatement);
			ps.setDouble(1, reimbursement.getReimbAmount());
			ps.setString(2, "NOW()");
			ps.setInt(5, 1);
			ps.setInt(6, reimbursement.getTypeID());
			ps.setInt(4, reimbursement.getAuthor());
			ps.setString(3,reimbursement.getDescription());

			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}
	
	/**
	 * takes in status int and author int, returns arraylist of reimbursements for single author(employee)
	 */
	@Override
	public List<Reimbursement> allReimbursements(int status, int author) {

		List<Reimbursement> reimbList = new ArrayList<>();

		try (Connection conn = DriverManager.getConnection(url, username, password)) {
			String mySQLStatement = "SELECT * FROM ers_reimbursement WHERE reimb_status_id = ? AND reimb_author <> ? ORDER BY reimb_id";

			PreparedStatement ps = conn.prepareStatement(mySQLStatement);
			
			ps.setInt(1, status);
			ps.setInt(2, author);

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				Reimbursement r = new Reimbursement();
			
				r.setReimbID(rs.getInt(1));
				r.setReimbAmount(rs.getDouble(2));
				r.setTimeSubmitted(rs.getString(3));
				r.setTimeResolved(rs.getString(4));
				r.setDescription(rs.getString(5));
				r.setAuthor(rs.getInt(7));
				r.setResolver(rs.getInt(8));
				r.setStatusID(rs.getInt(9));
				r.setTypeID(rs.getInt(10));
				

				reimbList.add(r);

			}

		} catch (SQLException e) {
			e.printStackTrace();
		}

		return reimbList;

	}

	
	/**
	 * Returns one reimbursement based on ID number
	 */
	@Override
	public Reimbursement oneReimbursement(int reimbID) {
		
		Reimbursement reimb = new Reimbursement();
		
		try (Connection conn = DriverManager.getConnection(url, username, password)) {
			String mySQLStatement = "SELECT * FROM ers_reimbursement WHERE reimb_id = ?";

			PreparedStatement ps = conn.prepareStatement(mySQLStatement);
			ps.setInt(1, reimbID);
			

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				
				reimb.setReimbID(rs.getInt(1));
				reimb.setReimbAmount(rs.getDouble(2));
				reimb.setTimeSubmitted(rs.getString(3));
				reimb.setTimeResolved(rs.getString(4));
				reimb.setDescription(rs.getString(5));
				reimb.setAuthor(rs.getInt(7));
				reimb.setResolver(rs.getInt(8));
				reimb.setStatusID(rs.getInt(9));
				reimb.setTypeID(rs.getInt(10));
				

			}

		} catch (SQLException e) {
			e.printStackTrace();
		}

		return reimb;
		
		}

	@Override
	public List<Reimbursement> oneUserReimbursements(int userID) {
		List<Reimbursement> reimbList = new ArrayList<>();

		try (Connection conn = DriverManager.getConnection(url, username, password)) {
			String mySQLStatement = "SELECT * FROM ers_reimbursement WHERE reimb_author = ?  ORDER BY reimb_id DESC ";

			PreparedStatement ps = conn.prepareStatement(mySQLStatement);
			ps.setInt(1,userID);

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				Reimbursement r = new Reimbursement();
				r.setReimbID(rs.getInt(1));
				r.setReimbAmount(rs.getDouble(2));
				r.setTimeSubmitted(rs.getString(3));
				r.setTimeResolved(rs.getString(4));
				r.setDescription(rs.getString(5));
				r.setAuthor(rs.getInt(7));
				r.setResolver(rs.getInt(8));
				r.setStatusID(rs.getInt(9));
				r.setTypeID(rs.getInt(10));
				

				reimbList.add(r);

			}

		} catch (SQLException e) {
			e.printStackTrace();
		}

		return reimbList;

	}

	@Override
	public void updateStatus(int reimbID, int statusID, int resolverID) {
		
		try (Connection conn = DriverManager.getConnection(url, username, password)) {
			String mySQLStatement = "UPDATE ers_reimbursement SET reimb_status_id = ? ,reimb_resolved = ?, reimb_resolver = ? WHERE reimb_id = ?";

			PreparedStatement ps = conn.prepareStatement(mySQLStatement);
			ps.setInt(1, statusID);
			ps.setString(2, "NOW()");
			ps.setInt(3, resolverID);
			ps.setInt(4, reimbID);
			
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}

//	@Override
//	public boolean updateAmount(int reimbID, double amount) {
//		// out of spec
//		return false;
//	}

//	@Override
//	public boolean deleteReimbursement(int reimbID) {
//		// out of spec
//		return false;
//	}

}
