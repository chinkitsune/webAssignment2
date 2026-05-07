/**
 * Author: Younghoon Ok
 */
import { getSessionInfo } from "./session.js";

window.addEventListener("DOMContentLoaded", async () => {
    const rest = await getSessionInfo();
    if(localStorage.getItem("user_name") != null)
    {
        console.log(localStorage.getItem("user_name"));
    }else{
        console.log("There is logged information");
    }
});