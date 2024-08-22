import { connect } from '@/dbConnection/dbconfig'
import User from "@/model/userModel"
// import { log } from 'console';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'; // need to npm install
import { NextRequest, NextResponse } from 'next/server'
connect()


export async function POST(request:NextRequest){
    try {
        const rebody = await request.json();
        const {email,password}=rebody;
        console.log(rebody);
        
        const user = await User.findOne({email})
        if(!user) return NextResponse.json({error:"User not exits"},{status:404})
            console.log(user);

        const isvalid = await bcrypt.compare(password,user.password);
        if(!isvalid)return NextResponse.json({error:"User not exits"},{status:404})
        
            // token making
            const tokenpayload ={
                id:user._id,
                username:user.username,
                email:email
            }
            const token = await jwt.sign(tokenpayload,process.env.TOKEN_SERECT!,{expiresIn:'1d'})

            const response =NextResponse.json({
                message:"Logged in succss",
                success:true
            })
            response.cookies.set("token",token,{httpOnly:true})

            return response;
    } catch (error) {
        return NextResponse.json({error:error},{status:500});
    }

}