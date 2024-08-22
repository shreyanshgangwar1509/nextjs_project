import { connect } from '@/dbConnection/dbconfig'
import { sendEmail } from '@/helpers/mailer'
import User from "@/model/userModel"
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'


connect()

export async function POST(request:NextRequest){
    try {
        const reqbody = await request.json()
        const {username,email,password}=reqbody;
        console.log(reqbody);
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User already exists"},{status:400})
        }
        const salt = await bcryptjs.genSalt(10);
        const hashpassord = await bcryptjs.hash(password,salt);
        const newUser = new User({
            username,email,password:hashpassord
        })
        const saveduser = await newUser.save();
        console.log(saveduser)

        // sen dverificaiotn email
        sendEmail({email,emailType:"VERIFY",userId:saveduser._id})

        return NextResponse.json({
            message:"User registered successfully",
            success:true,
            saveduser,
        })



        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
}