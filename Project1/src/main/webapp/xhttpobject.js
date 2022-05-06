
/*
    What is AJAX?

    -Asynchronous JavaScript And XML
    -It's a series of steps that will allow JS to perform tasks asynchronously
    (btw, we'll be using JSON)
    -AJAX is NOT a specific technology, there are many types of ways to do AJAX

    What is asynchronous?
    -it means "non blocking"
    -a task that can be performed concurrently with other tasks
    -it won't stop other threads from functioning at their own pace
*/

window.onload = function(){ //this is essentially a callback function for the window's completion signal

    document.getElementById("pokeSubmit").addEventListener('click', getPoke);
    document.getElementById("pokeSubmit2").addEventListener('click', getPokeForm);

    
    /*
        FOR PROJECT 1 is there anything stopping me from just doing the following?

        getPoke();  //<-----without using a button as the event

        SO....whenevver you login and go to your homepage...simply have the homepage IMMEDIATELY
        go back to the server and get whatever user is currently in the session along with
        their current reimbursements

        That means that you should have an URI like "localhost:9001/getcurrentsessioninformation" that
        simply goes to the server to get the current user's reimbursements...
    */
//    getCurrentUserAjaxRequest();
}


function getPokeForm(daEvent){
    daEvent.preventDefault();
    getPoke();
}


function getPoke(){
    // console.log("poke button clicked!!!!");

    
    let textField = document.getElementById('pokeText').value;
    // console.log(textField);

    
    /*
        We're going to be using the XMLHttpRequest object (aka xhttp) to perform an AJAX request

        STEP 1: create the XMLHttpRequest Object
            this object allows us to make requests and get back data (response)
            in short, this is our data retriever object (it calls servers/apis)
    */
    let xhttp = new XMLHttpRequest();


    

    /*
        STEP 2: create the callback function for readyState changes

        READY STATES:
            The XMLHttpRequest object has serveral states we need to know about

            state 0:    not initialized
            state 1:    server connection established
            state 2:    request received
            state 3:    processing request
            state 4:    complete, request finished and response is ready
    */
    xhttp.onreadystatechange = function (){
        // console.log("readyState is changing: ", xhttp.readyState);

        if(xhttp.readyState==4 && xhttp.status ==200){
            console.log("readyState is 4!!! AND status is 200!!!");

            // console.log(xhttp.responseText);
            let pokeObj = JSON.parse(xhttp.responseText);
            console.log(pokeObj);

            ourDOMManipulation(pokeObj);
        }
    }


    
   /*
    STEP 3: prepare connection/request details
        (readyState goes from 0 to 1 here)

        xhttp.open(httpMethod, url);
        OR
        xhttp.open(httpMethod, url, ?optional? boolean async); <-----defaults to true for the boolean
   */
        xhttp.open('GET', `https://pokeapi.co/api/v2/pokemon/${textField}`);
        //for your project 1 you'll do something like this:
        //xhttp.open('POST', 'http://localhost:9001/my/api/uri'); <---PLS put the "http" otherwise you'll
                                            // likely get a "CORS" error

    
    /*
        STEP 4: send the request, providing any body object the request needs
            (readState will go through the REST of the numbers here)

        (in our case we're using a GET method, and we aren't utilizing any data in the body of the request)

        xhttp.send(myRequestBodyObject);
    */
   xhttp.send();
    

}





function ourDOMManipulation(ourObjectFromJSON){
    document.getElementById("pokeName").innerText = ourObjectFromJSON.name;
    document.getElementById("pokedexNumber").innerText = ourObjectFromJSON.id;
    document.getElementById("pokeImage").setAttribute('src', ourObjectFromJSON.sprites.front_default);

}












