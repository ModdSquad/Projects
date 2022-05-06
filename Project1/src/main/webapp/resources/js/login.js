/**
 * 
 */

//remove values in username and password fields if page is "backed" into
 window.onpageshow = function(event) {
    if (event.persisted) {
        console.log("back at login");
            document.getElementById('username').value="";
            document.getElementById('password').value="";
            
    }     
        
};

window.onload = function () {
//for switching font on login page
toggleLang.addEventListener('click', elvish);

}

let toggleLang = document.getElementById('languageSwitch');


//all visible elements changed to elvish font if "true", back to LotR font if false
let elvFont = true;
function elvish(){
    console.log(elvFont);
    if(elvFont){
    	console.log("true");
        document.getElementById("a").style.fontFamily = "elvish";
        document.getElementById("b").style.fontFamily = "elvish";
        document.getElementById("c").style.fontFamily = "elvish";
        document.getElementById("d").style.fontFamily = "elvish";
        document.getElementById("username").style.fontFamily = "elvish";
        document.getElementById("password").style.fontFamily = "elvish";
        document.getElementById("e").style.fontFamily = "elvish";
        document.getElementById("languageSwitch").style.fontFamily = "elvish";
        //flip for the next button push
        elvFont = false;
    }else{
    	console.log("false");
        
        document.getElementById("a").style.fontFamily = "myFirstFont";
        document.getElementById("b").style.fontFamily = "myFirstFont";
        document.getElementById("c").style.fontFamily = "myFirstFont";
        document.getElementById("d").style.fontFamily = "myFirstFont";
        document.getElementById("username").style.fontFamily = "myFirstFont";
        document.getElementById("password").style.fontFamily = "myFirstFont";
        document.getElementById("e").style.fontFamily = "myFirstFont";
        document.getElementById("languageSwitch").style.fontFamily = "myFirstFont";
        elvFont = true;
    }


}