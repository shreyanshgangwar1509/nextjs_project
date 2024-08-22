import { connect } from '@/dbConnection/dbconfig'
import User from '@/model/userModel'
import { NextRequest, NextResponse } from 'next/server'


connect()
export async function POST(request:NextRequest){
    try {
        const rebody = await request.json()
        const {token}=rebody;
        console.log(token);

        const user = await User.findOne({VerifyToken:token},{VerifyTokenExpiry:{$gt:Date.now()}});
        if(!user){
            return NextResponse.json({error:"Invalid token"},{status:500})
        }
        console.log(user);

        user.isVerified=true;
        user.VerifyToken=undefined
        user.VerifyTokenExpiry = undefined;

        await user.save();
        return NextResponse.json({message:"Successfuly email",
            success:true
        },{status:500});
        
    } catch (error) {
        return NextResponse.json({error: error},{status:500})
    }
}