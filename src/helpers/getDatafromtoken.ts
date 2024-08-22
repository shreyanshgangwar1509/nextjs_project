import jwt from 'jsonwebtoken';
import { NextRequest } from "next/server";

export const getDataFromToken = (request:NextRequest)=>{
    try {
        const token = request.cookies.get("token")?.value||"";
        const decodetoken:any = jwt.verify(token,process.env.TOKEN_SERECT!);
        return decodetoken.id;


    } catch (error:any) {
        throw new Error(error.message);
    }
}