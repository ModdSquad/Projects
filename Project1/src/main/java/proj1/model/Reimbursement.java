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
public class Reimbursement {
	private int reimbID;
	private double reimbAmount;
	private String timeSubmitted;
	private String timeResolved;
	private String description;
	private int author;
	private int resolver;
	private int statusID;
	private int typeID;
}
