/**
 * Author : Younghoon Ok
 */

import express from 'express'
const router = express.Router();
import { addUser, findUserById } from '../models/mongoosedb.js';

// const loginDummyData = [
//     {name : 'okssi', user_name:"Younghoon Ok", password : '1234'},
//     {name : 'herry', user_name:"Herry Potter", password : 'potter'}
// ];

router.post('/login',async (req,res)=>{
    console.log("======================");
    console.log(req.body);
    console.log("======================");
    if(req.session.isLoggedIn){
        const temp_result = { 
            res : 'already logged in', 
            user_name : req.session.user_name,
            session : 'tracked'};
        res.status(200).json(temp_result)
        return;
    }

    const user = await findUserById(req.body.name);
    if(user !== null && user.password == req.body.password)
    {
        req.session.user = user.userId;
        req.session.user_name = user.userName;
        req.session.isLoggedIn = true;
        const temp_result = { res : 'success', user_name : req.session.user_name, session : 'tracked'};
        res.status(200).json(temp_result)
        return;
    }

    // for(let i = 0; i < loginDummyData.length; i++){
    //     console.log(loginDummyData[i]);
    //     console.log(req.body.name);
    //     console.log(req.body.password);
    //     if(loginDummyData[i].name == req.body.name 
    //         && loginDummyData[i].password == req.body.password)
    //     {
    //         req.session.user = loginDummyData[i].name;
    //         req.session.user_name = loginDummyData[i].user_name;
    //         req.session.isLoggedIn = true;
    //         const temp_result = { res : 'success', user_name : req.session.user_name, session : 'tracked'};
    //         res.status(200).json(temp_result)
    //         return;
    //     }
    // }
    const temp_result = {
        res : 'failed', session : 'untracked'
    };
    res.status(200).json(temp_result)
    // res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.post('/logout',(req,res)=>{
    if(!req.session.isLoggedIn){
        const temp_result = { res : 'already logged out', session : 'untracked'};
        res.status(200).json(temp_result)
        return;
    }
    req.session.destroy();
    const temp_result = { res : 'success', session : 'untracked'};
    res.status(200).json(temp_result)
    return;
});

router.post('/register',async (req,res)=>{
    console.log(req.body);
    let temp_result = {};
    try{
        await addUser(req.body.userId,req.body.password, req.body.userName, req.body.points, req.body.phoneNumber, req.body.deposit);
        temp_result = { res : 'success'};
    }catch(error){
        if(error.code === 11000){
            temp_result = { res : 'failed', reason: 'duplicate key'};
        }else{
            temp_result = { res : 'faield', reason: 'unknown error'};
        }
    }
    res.status(200).json(temp_result)
});


export default router;