

window.onload = function () {
    userList();
    uploadButton.addEventListener('click', sendImage);
    postButton.addEventListener('click', sendPost);
    currentUserInfo();
    newPic.addEventListener('click', sendImage2);
    editProfileButton.addEventListener('click', editProfile);
    setTimeout(showUserPosts, 100);
    likeButton.addEventListener('click', likePost);
    
}

let editProfileButton = document.getElementById('updatebutton');

let postButton = document.getElementById('post-button')

let uploadButton = document.getElementById('upload picture');

let newPic = document.getElementById('submitnewpic');


let image = document.createElement('img');

filepath = "";
imageName = "";

document.getElementById("current image").appendChild(image);




function sendPost() {
    // let imagelink = document.getElementById("new image").src;
    let postUserId = document.getElementById("user id").innerText;
    let postText = document.getElementById("post-field").value;
    postDate = Date();
    console.log(postDate);
    let createPost = { "postOwner": postUserId, "postDescrip": postText, "postTimeStamp": '', "postImage": imageName };
    // createPost = JSON.stringify(createPost);

    let xhttp = new XMLHttpRequest();


    xhttp.onreadystatechange = function () {


        if (xhttp.readyState == 4 && xhttp.status == 200) {

            let success = (xhttp.responseText);
            console.log(success);


        }
    }


    xhttp.open('POST', 'http://localhost:9039/addPost');

    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.send(JSON.stringify(createPost));




}



function sendImage() {

    let imageToSend = document.getElementById('input').files[0];
    var formData = new FormData();
    formData.append("file", imageToSend);

    let xhttp = new XMLHttpRequest();


    xhttp.onreadystatechange = function () {


        if (xhttp.readyState == 4 && xhttp.status == 200) {

            imageName = (xhttp.responseText);
            //    console.log(imageName);
            getImage(imageName);


        }
    }

    xhttp.open('POST', 'http://localhost:9039/documents/upload');



    // console.log(formData);
    xhttp.send(formData);



}

function sendImage2() {
    console.log("button working");
    let imageToSend2 = document.getElementById('newpic').files[0];
    var formData2 = new FormData();
    formData2.append("file", imageToSend2);

    let xhttp = new XMLHttpRequest();


    xhttp.onreadystatechange = function () {


        if (xhttp.readyState == 4 && xhttp.status == 200) {

            imageName2 = (xhttp.responseText);
            //    console.log(imageName);
            getImage2(imageName2);
            document.getElementById("ePProfilePicture").value = imageName2;


        }
    }

    xhttp.open('POST', 'http://localhost:9039/documents/upload');



    // console.log(formData);
    xhttp.send(formData2);



}


function getImage(theImageName) {

    let xhttp = new XMLHttpRequest();


    xhttp.onreadystatechange = function () {


        if (xhttp.readyState == 4 && xhttp.status == 200) {

            filepath = (xhttp.responseText);
            document.getElementById("new image").src = filepath;
            document.getElementById("new image").style.display = "block";
            //    console.log(filepath);
            //    document.getElementById("current image").appendChild(filepath);

        }
    }

    xhttp.open('GET', 'http://localhost:9039/documents/presigned-url/' + theImageName);
    xhttp.send();
}

function getImage2(theImageName2) {

    let xhttp = new XMLHttpRequest();


    xhttp.onreadystatechange = function () {


        if (xhttp.readyState == 4 && xhttp.status == 200) {

            filepath = (xhttp.responseText);
            document.getElementById("profile pic").src = filepath;
            
            // document.getElementById("new image").style.display = "block";
            //    console.log(filepath);
            //    document.getElementById("current image").appendChild(filepath);

        }
    }

    xhttp.open('GET', 'http://localhost:9039/documents/presigned-url/' + theImageName2);
    xhttp.send();
}

function getProfileImage(theImageName) {

    let xhttp = new XMLHttpRequest();


    xhttp.onreadystatechange = function () {


        if (xhttp.readyState == 4 && xhttp.status == 200) {

            filepath = (xhttp.responseText);
            document.getElementById("profile pic").src = filepath;
            // document.getElementById("new image").style.display = "block";
            //    console.log(filepath);
            //    document.getElementById("current image").appendChild(filepath);

        }
    }

    xhttp.open('GET', 'http://localhost:9039/documents/presigned-url/' + theImageName);
    xhttp.send();
}




function currentUserInfo() {
    console.log("currentUserInfo has been called");
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let currentUser = (JSON.parse(xhttp.responseText));
            // console.log(currentUser);          

            dOMManipulationUser(currentUser);
        }
    }
    console.log("before currentuser")

    xhttp.open('POST', 'http://localhost:9039/currentuser');

    xhttp.send();
}

//updates page to reflect session information
function dOMManipulationUser(ourResponseObject) {
    console.log(ourResponseObject);

    document.getElementById("user name").innerText = (ourResponseObject.userFName + " " + ourResponseObject.userLName);
    document.getElementById("user id").innerText = ourResponseObject.userId;
    document.getElementById("display id").innerText = ourResponseObject.userId;
    document.getElementById("user bio").innerText = ourResponseObject.userBio;
    document.getElementById("user email").innerText = ourResponseObject.userEmail;
    document.getElementById("user species").innerText = ourResponseObject.userSpecies;
    getProfileImage(ourResponseObject.userProfilePic);

    // document.getElementById("ePFName").placeholder = ourResponseObject.userFName;
    // document.getElementById("ePLName").placeholder = ourResponseObject.userLName;
    // document.getElementById("ePBio").placeholder = ourResponseObject.userBio;
    // document.getElementById("ePSpecies").placeholder = ourResponseObject.userSpecies;

    // if (ourResponseObject.userRoleID == 2){
    //     document.getElementById("userRole").innerText = "Employee";
    // } else if (ourResponseObject.userRoleID == 1){
    //     document.getElementById("userRole").innerText = "Financial Manager";
    // }else{
    //     document.getElementById("userRole").innerText = "Wizard";
    // }

}

function editProfile(e) {
	e.preventDefault();
    console.log("edit button clicked");
    let fName = document.getElementById("ePFName").value;
    let lName = document.getElementById("ePLName").value;
    let bio = document.getElementById("ePBio").value;
    let species = document.getElementById("ePSpecies").value;
    let profilePic = document.getElementById("ePProfilePicture").value;
    let UserId = document.getElementById("user id").innerText;

    let updateProfile = {
        "userId": UserId,
        "userFName": fName,
        "userLName": lName,
        "userBio": bio,
        "userSpecies": species,
        "userProfilePic": profilePic
    }
    console.log(updateProfile);

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            let success = (xhttp.responseText);
            console.log(success);

        }
    }


    xhttp.open('POST', 'http://localhost:9039/updateProfile');

    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.send(JSON.stringify(updateProfile));
}



function showUserPosts() {
    clearPosts();
    console.log("Show user posts");
    let xhttp = new XMLHttpRequest();

    let UserId = document.getElementById("display id").innerText;

    xhttp.onreadystatechange = function () {

        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let userPosts = (JSON.parse(xhttp.responseText));


            dOMManipulationUserPosts(userPosts);
        }
    }

    let currentUserPosts =
    {
        "userId": UserId
    }

    xhttp.open('POST', 'http://localhost:9039/seeAllPostByUser');
    xhttp.setRequestHeader("content-type", "application/json");
    console.log(currentUserPosts);
    xhttp.send(JSON.stringify(currentUserPosts));

}


function dOMManipulationUserPosts(usersPosts) {
    console.log(usersPosts);

    for (let i = 0; i < usersPosts.length; i++) {
        //create the new elements for the card, and cardHeader
        let newColSpc = document.createElement("div");
        let newCol = document.createElement("div");
        let newCR = document.createElement("div");          //creates the wholeround post
        let newCH = document.createElement("div");          //creates the header part of the post
        let newFlexAllign = document.createElement("div");  //allign the text in the header
        let newFlexProfile = document.createElement("div"); //align the profile name,pic,timestamp
        let profileImg = document.createElement("img");     //creates the profile picture 
        let nameContainer = document.createElement("div");  //creates the name container that will hold the name and timestamp
        let profileName = document.createElement("p");
        let timeStamp = document.createElement("p");
        let postId = document.createElement("p");


        //card body elements
        let newCB = document.createElement("div");
        let postDec = document.createElement("p");
        let postImg = document.createElement("img");
        let postYoutube = document.createElement("div")

        //card footer elements
        let newCF = document.createElement("div");
        let CFFlex = document.createElement("div");
        let CFLike = document.createElement("a");
        let CFLikeImg = document.createElement("i");
        let CFLikeDec = document.createElement("p");

        //set classes
        newColSpc.classList.add("col-md-12", "grid-margin")
        newCol.classList.add("col-md-12");
        postId.classList.add("color-grey-9-hidden");
        postId.classList.add()
        newCR.classList.add("card", "rounded");
        newCH.classList.add("card-header");
        newFlexAllign.classList.add("d-flex", "align-items-center", "justify-content-between");
        newFlexProfile.classList.add("d-flex", "align-items-center");
        profileImg.classList.add("img-xs", "rounded-circle");
        nameContainer.classList.add("ml-2");
        timeStamp.classList.add("tx-11", "text-muted");

        newCB.classList.add("card-body");
        postDec.classList.add("mb-3", "tx-14");
        postImg.classList.add("img-fluid");
        getPostImage(usersPosts[i].postImage,usersPosts[i].postID);
        

        
        // postImg.setAttribute("src",getPostImage(usersPosts[i].postImage));
        postImg.setAttribute("id","feed"+usersPosts[i].postID);
        // listofPosts.push("feed"+usersPosts[i].postID);

        profileImg.setAttribute("src",document.getElementById("profile pic").src);

        newCF.classList.add("card-footer");
        CFFlex.classList.add("d-flex", "post-actions");
        CFLike.setAttribute("href", "#");
        CFLike.setAttribute("onClick", "likePost(this);")
        CFLike.setAttribute("id", "likeButton");
        CFLike.classList.add("d-flex", "align-items-center", "text-muted", "mr-4");
        CFLikeImg.classList.add("fa", "fa-paw");
        CFLikeDec.classList.add("d-none", "d-md-block", "ml-2");

        //create the text elements
        let profileNametext = document.createTextNode(usersPosts[i].postOwner.userFName + " " + usersPosts[i].postOwner.userLName);
        let timeStampText = document.createTextNode(usersPosts[i].postTimeStamp);
        let postDecText = document.createTextNode(usersPosts[i].postDescrip);
        let postLikeText = document.createTextNode(usersPosts[i].postLikes + " " + "Likes");
        let postIdText = document.createTextNode(usersPosts[i].postID);
        let postImagetext = null;
        if (!(usersPosts[i].postImage == null)) {
            postImagetext = document.createTextNode(usersPosts[i].postImage);
        }
        postYoutubeText = null;
        if (usersPosts[i].postYoutube != null) {
            postYoutubeText = document.createTextNode(usersPosts[i].postYoutube);
        }


        //append
        postId.appendChild(postIdText);
        profileName.appendChild(profileNametext);
        timeStamp.appendChild(timeStampText);
        postDec.appendChild(postDecText);
        if (!(usersPosts[i].postImage == null)) {
            postImg.appendChild(postImagetext);
        }
        if (usersPosts[i].postYoutube != null) {
            postYoutube.appendChild(postYoutubeText);
        }

        CFLikeDec.appendChild(postLikeText);


        //card-head nested elements
        newCH.appendChild(newFlexAllign);
        newFlexAllign.appendChild(newFlexProfile);
        newFlexProfile.appendChild(profileImg);
        newFlexProfile.appendChild(nameContainer);
        nameContainer.appendChild(profileName);
        nameContainer.appendChild(timeStamp);
        nameContainer.appendChild(postId);

        //card-round nests ALL of card-head
        newCR.appendChild(newCH);



        //card-body nested elements
        newCB.appendChild(postDec);
        if (!(postImagetext == null)) {
            newCB.appendChild(postImg);
        }
        if (!(postYoutubeText == null)) {
            newCB.appendChild(postYoutube);
        }

        //card-round nests ALL of card-body
        newCR.appendChild(newCB);


        //card-footer nested elements
        newCF.appendChild(CFFlex);
        CFFlex.appendChild(CFLike);
        CFLike.appendChild(CFLikeImg);
        CFLike.appendChild(CFLikeDec);

        //cr-round nest card-footer
        newCR.appendChild(newCF);

        //the new Column nests ALL OF CR;
        newCol.appendChild(newCR);

        newColSpc.appendChild(newCol);

        let newSelection = document.querySelector("#postDom");
        newSelection.appendChild(newColSpc);
        console.log("postDomManip");
    }
}

function likePost(elem) {

    let userId = elem.parentElement.children[0].value;

    console.log(userId);
}

let postImagePath = "";
listOfPosts = [];
listOfLinks = [];
function getPostImage(theImageName,theImageID) {
    

    let xhttp = new XMLHttpRequest();


    xhttp.onreadystatechange = function () {


        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // console.log("is there a response?");
            postImagePath = (xhttp.responseText);
            document.getElementById("feed"+theImageID).src = postImagePath;
            // listOfLinks.push(postImagePath);
            // console.log(postImagePath);
            // return postImagePath;

            
            
            // document.getElementById("new image").style.display = "block";
            //    console.log(filepath);
            //    document.getElementById("current image").appendChild(filepath);

        }
    }

    
    xhttp.open('GET', 'http://localhost:9039/documents/presigned-url/' + theImageName);
    xhttp.send();
}

listOfUsers = [];
function userList(){

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (xhttp.readyState == 4 && xhttp.status == 200) {
            listOfUsers = (JSON.parse(xhttp.responseText));
            console.log(listOfUsers); 
            
            document.getElementById("friend count").innerText = listOfUsers.length-1;

            domFillTable(listOfUsers);
        }
    }
    console.log("before currentuser")

    xhttp.open('GET', 'http://localhost:9039/allusers');

    xhttp.send();


}

function clearPosts(){
    document.getElementById("postDom").innerHTML = "";
}


function domFillTable(jSonObj){
    console.log(jSonObj);
    console.log("that is in domfilltable");

    for (let i = 0; i < jSonObj.length; i++) {

        let newTR = document.createElement("tr");
        let newTD1 = document.createElement("td");
       
        // newTH.setAttribute("scope", "row");        
       
        let myTextD1 = document.createTextNode(jSonObj[i].userFName);
        


        //all appending
        
        newTD1.appendChild(myTextD1);
        


        
        newTR.appendChild(newTD1);
        // newTR.setAttribute("id",(jSonObj[i].userId));
        newTR.value=(jSonObj[i].userId);
        newTR.draggable = true;
        // newTR.ondragstart(updateActive(this.value));
        
        
        // newTR.addEventListener('click',updateActive(this.getAttribute("id")));
        



        let nextRow = document.querySelector("#usertable");
        nextRow.appendChild(newTR);



    }

    updateTable();
}
function updateActive(){
    // document.getElementById("display id").innerText = id;
    
    showUserPosts();
}

function updateTable(){
    let table = document.getElementById("friendtable");

    for (let i=0, row; row = table.rows[i]; i++){
        // console.log(row.value);
        row.addEventListener('click', function(){
            document.getElementById("display id").innerText = row.value;
            updateActive();
        });
            
    }

}