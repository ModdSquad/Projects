/**
 * 
 */

window.onload = function () {
    getReimbursements();
    myButton.addEventListener('click',addReimb);
  
    refreshButton.addEventListener('click',getReimbursements);
    currentUserInfo(); 
      
}

//buttons innitialized
let myButton = document.getElementById('addReimb');

let refreshButton = document.getElementById('refreshTable');




//called on load

function getReimbursements(){


       let xhttp = new XMLHttpRequest();


    xhttp.onreadystatechange = function () {
        

        if (xhttp.readyState == 4 && xhttp.status == 200) {
            
            let reimbList = JSON.parse(xhttp.responseText);
            

            displayReimbOnLoad(reimbList);
        }
    }

    xhttp.open('POST', 'http://localhost:9001/Project1/forwarding/usertickets');



    xhttp.send();



}

//dom man. for rows on bottom of page, first removes rows before appending new ones

function displayReimbOnLoad(jSonObj){
    console.log("about to call removeRows")

    removeRows();
    

    for( let i = 0; i <jSonObj.length; i++){
        let newTR = document.createElement("tr");
        let newTH = document.createElement("th");

        let newTD1 = document.createElement("td");
        let newTD2 = document.createElement("td");
        let newTD3 = document.createElement("td");
        let newTD4 = document.createElement("td");
        let newTD5 = document.createElement("td");
        let newTD6 = document.createElement("td");

        newTH.setAttribute("scope", "row");
        let myTextH = document.createTextNode(jSonObj[i].reimbID);
        let myTextD2 = document.createTextNode(jSonObj[i].reimbAmount);
        let myTextD3 = document.createTextNode(jSonObj[i].typeID);

        //should have used sql view that was created to make the code more scalable 
            switch(myTextD3.textContent){
            case "1":
                myTextD3.textContent = "Lodging";
                break;
            case "2":
                myTextD3.textContent = "Travel";
                break;
            case "3":
                myTextD3.textContent = "Food";
                break;
            case "4":
                myTextD3.textContent = "Other";
            default:
                myTextD3.textContent = "Unknown";
        }
        let myTextD4 = document.createTextNode(jSonObj[i].description);
        let myTextD1 = document.createTextNode(jSonObj[i].statusID);
        switch(myTextD1.textContent){
            case "1":
                myTextD1.textContent = "Submitted";
                break;
            case "2":
                myTextD1.textContent = "Approved";
                break;
            case "3":
                myTextD1.textContent = "Denied";
                break;
            default:
                myTextD1.textContent = "Unknown";
        }
        let myTextD5 = document.createTextNode(jSonObj[i].timeSubmitted);
        let myTextD6 = document.createTextNode(jSonObj[i].timeResolved);

       
        //all appending
        newTH.appendChild(myTextH);
        newTD2.appendChild(myTextD2);
        newTD3.appendChild(myTextD3);
        newTD4.appendChild(myTextD4);
        newTD1.appendChild(myTextD1);
        newTD5.appendChild(myTextD5);
        newTD6.appendChild(myTextD6);
        

        newTR.appendChild(newTH);
        newTR.appendChild(newTD2);
        newTR.appendChild(newTD3);
        newTR.appendChild(newTD4);
        newTR.appendChild(newTD1);
        newTR.appendChild(newTD5);
        newTR.appendChild(newTD6);
        
       

        let nextRow = document.querySelector("#reimbList");
        nextRow.appendChild(newTR);

        var x = document.getElementById("foodList").getElementsByTagName("tr");
        //updates color of rows based on status
        switch(myTextD1.textContent){
            case "Submitted":
                x[i+1].style.backgroundColor = "Gold";
                break;
            case "Approved":
                x[i+1].style.backgroundColor = "SpringGreen";
                break;
            case "Denied":
                x[i+1].style.backgroundColor = "OrangeRed";
                break;
            default:
                x[i+1].style.backgroundColor = "White";
        }

        if (i == 0){
            document.getElementById("reimbIDSingle").innerText = "Reimbursement ID: " + jSonObj[i].reimbID;
            console.log("jSonObj[i].amount");
            document.getElementById("reimbAmountSingle").innerText = "Reimbursement Amount: "+ jSonObj[i].reimbAmount;
            document.getElementById("reimbSubDateSingle").innerText = "Date Submitted: " + jSonObj[i].timeSubmitted;
            document.getElementById("reimbDescriptionSingle").innerText = "Description: "+ jSonObj[i].description;
            console.log(myTextD1.textContent);
            document.getElementById("reimbStatusSingle").innerText = "Status: " + myTextD1.textContent;
            switch(myTextD1.textContent){
                case "Submitted":
                    cardSingle.style.backgroundColor = "Gold";
                    break;
                case "Approved":
                    cardSingle.backgroundColor = "SpringGreen";
                    break;
                case "Denied":
                    cardSingle.backgroundColor = "OrangeRed";
                    break;
                default:
                    cardSingle.style.backgroundColor = "White";
            }
        }
           

                

    }

}

//checks request amount before adding and displays error if it won't be added in the db (due to constraint at db level)
//truncates input to max length before adding
function addReimb(){
    let amount = document.getElementById("reimbAmount").value;
    let description = document.getElementById("reimbDescription").value;
    let description2 = description.substring(0,250);
    clearId();
    let reimbursementType = document.getElementById("reimbType").value;
    let userIDForSubmit = document.getElementById("userID").innerText;
    
    if (amount<=0){
        document.getElementById("message").innerText = "Your request was unsuccessful, please make sure the amount is a positive number.";
    }
    
    

    let newReimb = {"reimbID": 0,"reimbAmount": amount,"timeSubmitted": 'filler',"timeResolved": 'filler', "description": description2, "author": userIDForSubmit, "resolver": 0,"statusID":1,"typeID": reimbursementType  };

    let nextReimb = JSON.stringify(newReimb);

    
    

    let xhttp = new XMLHttpRequest;

    xhttp.onreadystatechange = function(){
        if (xhttp.readyState==4 && xhttp.status==200) {
            let string = xhttp.responseText;
            
            

        }
    }

    xhttp.open('POST', `http://localhost:9001/Project1/forwarding/addreimbursement`);
    
	xhttp.setRequestHeader("content-type","application/json");
    xhttp.send(nextReimb);

    
    
}

//gets session information for logged in user 

function currentUserInfo(){
	let xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function (){

        if(xhttp.readyState==4 && xhttp.status==200){
            let currentUser = JSON.parse(xhttp.responseText);
            

            dOMManipulationUser(currentUser);
        }
   }
   console.log("before sending json/getuser")

    xhttp.open('POST', `http://localhost:9001/Project1/json/getuser`);

   xhttp.send();
}

//updates page to reflect session information
function dOMManipulationUser(ourResponseObject){
	console.log(ourResponseObject);

	document.getElementById("userName").innerText = "Welcome, " + ourResponseObject.firstName; 
	document.getElementById("userID").innerText = ourResponseObject.userID;
    
    // document.getElementById("userRole").innerText = ourResponseObject.userRoleID; 
    if (ourResponseObject.userRoleID == 2){
        document.getElementById("userRole").innerText = "Employee";
    } else if (ourResponseObject.userRoleID == 1){
        document.getElementById("userRole").innerText = "Financial Manager";
    }else{
        document.getElementById("userRole").innerText = "Wizard";
    }
    
}

//removes element text when called
function clearId(){
    document.getElementById("message").innerText = "";
    document.getElementById("reimbAmount").value = "";
    document.getElementById("reimbDescription").value = "";
}

//removes rows before new rows will be added
function removeRows() {

    let tableSize = document.getElementById("reimbList").rows.length;

    for (let i = 0; i < tableSize; i++) {

        document.getElementById("reimbList").deleteRow(0);
    }


}