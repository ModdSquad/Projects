package proj1.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import proj1.model.Reimbursement;
import proj1.model.User;

public class UserDaoImpl implements UserDao{
	public static String url = System.getenv("DB_ENDPOINT");
	public static String username = System.getenv("DB_USERNAM");
	public static String password = System.getenv("DB_PASSWORD");
	
	static { 
        try {
            Class.forName("org.postgresql.Driver");
        }catch(ClassNotFoundException e) {
            e.printStackTrace();
            System.out.println("Static block has failed me");
        }
	}

	public static Connection getConnection() throws SQLException {
		return DriverManager.getConnection(url, username, password);
	}

	@Override
	public List<User> allUsers() {
		
		List<User> userList = new ArrayList<>();

		try (Connection conn = DriverManager.getConnection(url, username, password)) {
			String mySQLStatement = "SELECT * FROM ers_users";

			PreparedStatement ps = conn.prepareStatement(mySQLStatement);
			

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				User u = new User();
				u.setUserID(rs.getInt(1));
				u.setUsername(rs.getString(2));
				u.setUserPassword(rs.getString(3));
				u.setFirstName(rs.getString(4));
				u.setLastName(rs.getString(5));
				u.setUserEmail(rs.getString(6));
				u.setUserRoleID(rs.getInt(7));
				
				userList.add(u);

			}

		} catch (SQLException e) {
			e.printStackTrace();
		}

		return userList;

		
		
	}

	@Override
	public User singleUser(String uName) {
		User user = new User();
		try (Connection conn = DriverManager.getConnection(url, username, password)) {
			String mySQLStatement = "SELECT * FROM ers_users WHERE ers_username = ?";

			PreparedStatement ps = conn.prepareStatement(mySQLStatement);
			ps.setString(1, uName);

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				
				user.setUserID(rs.getInt(1));
				user.setUsername(rs.getString(2));
				user.setUserPassword(rs.getString(3));
				user.setFirstName(rs.getString(4));
				user.setLastName(rs.getString(5));
				user.setUserEmail(rs.getString(6));
				user.setUserRoleID(rs.getInt(7));
				
				
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}

		return user;

	}
	
	

}
