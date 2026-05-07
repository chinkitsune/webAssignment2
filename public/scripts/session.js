/**
 * Author : Younghoon Ok
 */
export async function getSessionInfo(){
    const data = {
    };

    const response = await fetch('/login', {
            method: 'POST', //Specify the method.
            headers: {
                'Content-Type': 'application/json', //It's Json format.
            },
            body: JSON.stringify(data), //Turn the object into a string. (Serialize)
        });
    const res = await response.json();
    console.log(res);
    if(res.res == 'already logged in')
    {
        console.log(res.user_name);
        localStorage.setItem("user_name",res.user_name)
    }else{
        localStorage.removeItem("user_name");
    }
}