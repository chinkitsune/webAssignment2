/**
 * Author : Younghoon Ok
 */
import { getSessionInfo } from "./session.js";
import { refreshLoginInfo } from "./header.js";

window.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("login-form");
    form.addEventListener("submit",sendLoginInfo);
    const loggedInDiv = document.getElementById("logout-button");
    loggedInDiv.addEventListener("click",logout);

    await getSessionInfo();
    if(localStorage.getItem("user_name") != null)
    {
        console.log(localStorage.getItem("user_name"));
        switchLoginUI(true);
    }else{
        switchLoginUI(false);
    }
});

async function logout(event)
{
    const loginForm = document.getElementById("login-form");
    const loggedInDiv = document.getElementById("logged-in-div");
    console.log("logout");
    try{
        const response = await fetch('/logout', {
            method: 'POST', //Specify the method.
            headers: {
                'Content-Type': 'application/json', //It's Json format.
            },
            body: JSON.stringify({}), //Turn the object into a string. (Serialize)
        });
        const data = await response.json();
        console.log(data);
        if(data.res == 'success' || data.res == 'already logged out')
        {
            switchLoginUI(false);
            localStorage.removeItem("user_name");
        }else{
            switchLoginUI(true);
        }
    }catch(error){
        console.log("Error sending data:", error);
    }
}

function switchLoginUI(flag)
{
    const loginForm = document.getElementById("login-form");
    const loggedInDiv = document.getElementById("logged-in-div");

    if(flag === true){
        loginForm.classList.add('hidden');
        loggedInDiv.classList.remove('hidden');
    }else{
        loginForm.classList.remove('hidden');
        loggedInDiv.classList.add('hidden');
    }
    refreshLoginInfo();
}

async function sendLoginInfo(event)
{
    //remove the default behavor of the form.
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    event.preventDefault();

    const userData = {
        name : username,
        password : password
    };

    try{
        const response = await fetch('/login', {
            method: 'POST', //Specify the method.
            headers: {
                'Content-Type': 'application/json', //It's Json format.
            },
            body: JSON.stringify(userData), //Turn the object into a string. (Serialize)
        });
        const data = await response.json();
        console.log(data);
        if(data.res == 'success' || data.res == 'already logged in')
        {
            switchLoginUI(true);
            localStorage.setItem("user_name",data.user_name)
        }else{
            switchLoginUI(false);
       }
    }catch(error){
        console.log("Error sending data:", error);
    }

}