/**
 * Author : Younghoon Ok
 */
import { getSessionInfo } from "./session.js";

window.addEventListener("DOMContentLoaded", async () => {
    await refreshLoginInfo();
});

export async function refreshLoginInfo()
{
    const loginInfoPElement = document.getElementById("login-info");
    const rest = await getSessionInfo();
    if(localStorage.getItem("user_name") != null)
    {
        console.log(localStorage.getItem("user_name"));
        loginInfoPElement.innerHTML = "<b>Hi!!</b> " + localStorage.getItem("user_name");
    }else{
        console.log("There is logged information");
        loginInfoPElement.innerHTML = "";
    }
}
