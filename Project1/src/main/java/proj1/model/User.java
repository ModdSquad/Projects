package proj1.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class User {
	
	private int userID;
	private String username;
	private String userPassword;
	private String firstName;
	private String lastName;
	private String userEmail;
	private int userRoleID;
}
