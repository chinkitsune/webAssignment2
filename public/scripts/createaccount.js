/**
 * Author : Jay
 */
import { getSessionInfo } from "./session.js";
import { refreshLoginInfo } from "./header.js";

window.addEventListener("DOMContentLoaded", async () => {
    console.log("hello world");
    const form = document.getElementById("register-form");
    form.addEventListener("submit",registerUser); 
});

async function registerUser(event){
    event.preventDefault();
    
    const userData = {
        userId : document.getElementById("userId").value,
        password : document.getElementById("password").value,
        userName : document.getElementById("realName").value,
        phoneNumber : document.getElementById("phoneNumber").value,
        points : 0, //not used for now
        deposit : 0  //not used for now
    };
    try{
        const respose = await fetch('/register', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const data = await respose.json();
        const message = document.getElementById("message");
        if(data.res == 'success')
        {
            document.getElementById("register-form").hidden = true;
            message.innerHTML="<p> Registeration successful!! <br> Please login"
            message.classList.remove("hidden");
            setTimeout(()=>{
                window.location.href = "/login";
            },2000);
        }else{
            document.getElementById("register-form").hidden = false;
            message.innerHTML="<p> Registeration Failed <br> Try again <br> Reason : " + data.reason;
            message.classList.remove("hidden");
        }
        console.log(data);
    }catch(error)
    {
        console.log(error);
    }
}
