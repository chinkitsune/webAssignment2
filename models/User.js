/**
 * Author : Younghoon Ok
 */
import mongoose from "mongoose";

const userDocumentFormat = {
    userId: { type:String, required: true, unique: true},
    userName: { type:String, required: true},
    password: { type:String, required: true},
    points: { type:Number, min:0},
    phoneNumber: { type:String},
    deposit: { type:Number}
}

const USER = mongoose.models.User || mongoose.model('User', userDocumentFormat);
export default USER;