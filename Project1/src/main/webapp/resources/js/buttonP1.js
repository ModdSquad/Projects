/**
 * 
 */
window.onload = function () {
    currentUserInfo();
    viewAllOnLoad();
    updateActiveButton.addEventListener('click', updateActive);
    myManagerButton.addEventListener('click', viewAllByStatus);
    
    logoutButton.addEventListener('click', logout)
    addOwnReimbursement.addEventListener('click',addReimb);
    activeReimbButton.addEventListener('click', async () => {
        activeWindow();
        await new Promise(resolve => setTimeout(resolve, 800));
        getReimbursements()});
    
}
window.onpageshow = function (event) {
    if (event.persisted) {
        console.log("this was 'backed' into")
        
        if (document.getElementById('userID').innerHTML == "***") {
            window.location.replace('http:localhost:9001/Project1');
            //document.getElementById('body2').style.display = "none";
            //document.getElementById('bonus').style.display = "block";
            //above 2 lines left the user on the original page, but removed all visible elements and replaced it with a gif of Gollum
        }
    }
};


//declaring all buttons
let myManagerButton = document.getElementById('filterResultsButton');
let activeReimbButton = document.getElementById('getSingleID');
let updateActiveButton = document.getElementById('updateActiveButton');
let logoutButton = document.getElementById('logoutButton');
let addOwnReimbursement = document.getElementById('addReimb');

const item = document.querySelector('.item');
item.addEventListener('dragstart', dragStart);



//button press will find the value displayed on the dropdown and filter by that value
function viewAllByStatus() {

    removeRows();

    let reimbStatus = document.getElementById("filterResults").value;
    reimbStatus = JSON.stringify(reimbStatus);





    let xhttp = new XMLHttpRequest();


    xhttp.onreadystatechange = function () {


        if (xhttp.readyState == 4 && xhttp.status == 200) {

            let reimbList = JSON.parse(xhttp.responseText);
            console.log(reimbList);

            displayReimbOnLoad(reimbList);
        }else{
            console.log("this might work");
        }

    }

    xhttp.open('POST', 'http://localhost:9001/Project1/forwarding/alltickets');

    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.send(reimbStatus);



}

//defaults status to 1 for the above method, should probably have just put a condition in there to default to this value the first time
//instead of copy-paste the whole thing
function viewAllOnLoad() {
    console.log("viewAllOnLoad")
    let reimbStatus = "1";

    reimbStatus = JSON.stringify(reimbStatus);





    let xhttp = new XMLHttpRequest();


    xhttp.onreadystatechange = function () {


        if (xhttp.readyState == 4 && xhttp.status == 200) {

            let reimbList = JSON.parse(xhttp.responseText);
            console.log(reimbList);

            displayReimbOnLoad(reimbList);
        }
    }

    xhttp.open('POST', 'http://localhost:9001/Project1/forwarding/alltickets');

    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.send(reimbStatus);



}

//DOM manipulation of function above
function displayReimbOnLoad(jSonObj) {



    console.log("displayReimbOnLoad");

    for (let i = 0; i < jSonObj.length; i++) {
        let newTR = document.createElement("tr");
        let newTH = document.createElement("th");

        let newTD1 = document.createElement("td");
        let newTD2 = document.createElement("td");
        let newTD3 = document.createElement("td");
        let newTD4 = document.createElement("td");
        let newTD5 = document.createElement("td");
        let newTD6 = document.createElement("td");
        let newTD7 = document.createElement("td");

        newTH.setAttribute("scope", "row");
        let myTextH = document.createTextNode(jSonObj[i].reimbID);
        let myTextD7 = document.createTextNode(jSonObj[i].author)
        let myTextD2 = document.createTextNode(jSonObj[i].reimbAmount);
        let myTextD3 = document.createTextNode(jSonObj[i].typeID);
        switch (myTextD3.textContent) {
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
                break;
            default:
                myTextD3.textContent = "Unknown";
        }
        let myTextD4 = document.createTextNode(jSonObj[i].description);
        let myTextD1 = document.createTextNode(jSonObj[i].statusID);
        switch (myTextD1.textContent) {
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
        newTD7.appendChild(myTextD7);
        newTD2.appendChild(myTextD2);
        newTD3.appendChild(myTextD3);
        newTD4.appendChild(myTextD4);
        newTD1.appendChild(myTextD1);
        newTD5.appendChild(myTextD5);
        newTD6.appendChild(myTextD6);


        newTR.appendChild(newTH);
        newTR.appendChild(newTD7);
        newTR.appendChild(newTD2);
        newTR.appendChild(newTD3);
        newTR.appendChild(newTD4);
        newTR.appendChild(newTD1);
        newTR.appendChild(newTD5);
        newTR.appendChild(newTD6);



        let nextRow = document.querySelector("#reimbListManager");
        nextRow.appendChild(newTR);



    }

}

//creates reimbursement object and sends it as a json to the controller
function addReimb() {
    let amount = document.getElementById("reimbAmount").value;
    let description = document.getElementById("reimbDescription").value;
    let reimbursementType = document.getElementById("reimbType").value


    let newReimb = { "reimbID": 0, "reimbAmount": amount, "timeSubmitted": 'filler', "timeResolved": 'filler', "description": description, "author": req.getSession().getAttribute("loggedInUserID", u.getUserID()), "resolver": 0, "statusID": 1, "typeID": reimbType };

    let nextReimb = JSON.stringify(newReimb);

    console.log(nextReimb);


    let xhttp = new XMLHttpRequest;

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let string = xhttp.responseText;
            console.log(string);


        }
    }


    xhttp.open('POST', 'http://localhost:9001/Project1/forwarding/addreimbursement');


    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.send(nextReimb);



}

//remove rows from reimbListManager table, called before refreshing list
function removeRows() {

    let tableSize = document.getElementById("reimbListManager").rows.length;

    for (let i = 0; i < tableSize; i++) {

        document.getElementById("reimbListManager").deleteRow(0);
    }


}


//remove rows from userOwnList, called before refreshing list
function removeRowsActive() {

    let tableSize = document.getElementById("userOwnList").rows.length;

    for (let i = 0; i < tableSize; i++) {

        document.getElementById("userOwnList").deleteRow(0);
    }


}


function activeWindow() {
    let activeReimb = document.getElementById("activeReimbID").value;

    let xhttp = new XMLHttpRequest();


    xhttp.onreadystatechange = function () {


        if (xhttp.readyState == 4 && xhttp.status == 200) {

            let reimbursement = JSON.parse(xhttp.responseText);

            displayActive(reimbursement);
        }
    }

    xhttp.open('POST', 'http://localhost:9001/Project1/forwarding/oneticket');

    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.send(activeReimb);
}


//for updating card with the selected reimbursement
function displayActive(selectedReimb) {
    if (selectedReimb.author == (document.getElementById("userID").innerText)) {
        
        document.getElementById('updateActiveButton').style.display = "none";
    } else {
        document.getElementById('updateActiveButton').style.display = "inline";
    }
    if (selectedReimb.reimbID == 0) {
        document.getElementById('updateActiveButton').style.display = "none";
    }

    document.getElementById("reimbID2").innerText = selectedReimb.reimbID;
    document.getElementById("reimbAmount2").innerText = "Amount: " + selectedReimb.reimbAmount;
    document.getElementById("reimbSubDate2").innerText = "Time Submitted: " + selectedReimb.timeSubmitted;
    document.getElementById("reimbDescription2").innerText = "User Description: " + selectedReimb.description;
    document.getElementById("activeDisplayUser").innerText = selectedReimb.author;


}

function updateActive() {
    let updateID = document.getElementById("reimbID2").innerText;

    console.log(updateID);
    let updateStatus = document.getElementById("updateActive").value;
    console.log(updateStatus);
    let updateReimb = { "reimbID": updateID, "reimbStatus": updateStatus };

    let toUpdateReimb = JSON.stringify(updateReimb);

    console.log(toUpdateReimb);


    let xhttp = new XMLHttpRequest;

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let string = xhttp.responseText;



        }
    }


    xhttp.open('POST', 'http://localhost:9001/Project1/forwarding/updatestatus');


    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.send(toUpdateReimb);



}

//gets list of 
function currentUserInfo() {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let currentUser = JSON.parse(xhttp.responseText);
            console.log(currentUser);

            dOMManipulationUser(currentUser);
        }
    }
    console.log("before sending json/getuser")

    xhttp.open('POST', `http://localhost:9001/Project1/json/getuser`);

    xhttp.send();
}


//dom manipulation for welcome text for current user
function dOMManipulationUser(ourResponseObject) {
    console.log(ourResponseObject);

    document.getElementById("userName").innerText = "Welcome, " + ourResponseObject.firstName;
    document.getElementById("userID").innerText = ourResponseObject.userID;

    if (ourResponseObject.userRoleID == 2) {
        document.getElementById("userRole").innerText = "Employee";
    } else if (ourResponseObject.userRoleID == 1) {
        document.getElementById("userRole").innerText = "Financial Manager";
    } else {
        document.getElementById("userRole").innerText = "Wizard";
    }
}



function getReimbursements() {


    let displayUser = document.getElementById('activeDisplayUser').innerText;
    console.log(displayUser);
    displayUser = JSON.stringify(displayUser);

    let xhttp = new XMLHttpRequest();


    xhttp.onreadystatechange = function () {


        if (xhttp.readyState == 4 && xhttp.status == 200) {

            let reimbList = JSON.parse(xhttp.responseText);
            console.log(reimbList);
            console.log("previous should be arraylist of reimbursement objects")

            displayOneUserList(reimbList);
        }
    }

    xhttp.open('POST', 'http://localhost:9001/Project1/forwarding/userticketstwo');



    xhttp.send(displayUser);



}

//dom manipulation, should have used the sql view to make the code less spaghettied
function displayOneUserList(jSonObj) {

    removeRowsActive();


    let limit = 10;
    if (limit > jSonObj.length) {
        limit = jSonObj.length;
    }

    for (let i = 0; i < limit; i++) {
        let newTR = document.createElement("tr");
        let newTH = document.createElement("th");

        let newTD1 = document.createElement("td");
        let newTD2 = document.createElement("td");
        let newTD3 = document.createElement("td");
        let newTD4 = document.createElement("td");
        let newTD5 = document.createElement("td");


        newTH.setAttribute("scope", "row");
        let myTextH = document.createTextNode(jSonObj[i].reimbID);
        let myTextD2 = document.createTextNode(jSonObj[i].reimbAmount);
        let myTextD3 = document.createTextNode(jSonObj[i].typeID);
        switch (myTextD3.textContent) {
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
                break;
            default:
                myTextD3.textContent = "Unknown";
        }
        let myTextD4 = document.createTextNode(jSonObj[i].statusID);
        switch (myTextD4.textContent) {
            case "1":
                myTextD4.textContent = "Submitted";
                break;
            case "2":
                myTextD4.textContent = "Approved";
                break;
            case "3":
                myTextD4.textContent = "Denied";
                break;
            default:
                myTextD4.textContent = "Unknown";
        }
        let myTextD5 = document.createTextNode(jSonObj[i].timeSubmitted);



        //all appending
        newTH.appendChild(myTextH);
        newTD2.appendChild(myTextD2);
        newTD3.appendChild(myTextD3);
        newTD4.appendChild(myTextD4);
        newTD5.appendChild(myTextD5);


        newTR.appendChild(newTH);
        newTR.appendChild(newTD2);
        newTR.appendChild(newTD3);
        newTR.appendChild(newTD4);
        newTR.appendChild(newTD5);




        let nextRow = document.querySelector("#userOwnList");
        nextRow.appendChild(newTR);

        //for updating color for each row based on text in element 
        var x = document.getElementById("userReimbList").getElementsByTagName("tr");
        switch(myTextD4.textContent){
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



    }

}

//secondary logout function to try to stop people from backing into the page by overwriting elements before going to the next page
function logout() {

    localStorage.clear();
    document.getElementById("userName").innerText = "***";
    document.getElementById("userID").innerText = "***";
    document.getElementById("activeDisplayUser").innerText = "***";
    document.getElementById("userRole").innerText = "***";

    



}

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

//clears out fields after a button push
function clearId(){
    document.getElementById("message").innerText = "";
    document.getElementById("reimbAmount").value = "";
    document.getElementById("reimbDescription").value = "";
}