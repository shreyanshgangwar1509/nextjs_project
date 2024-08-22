import { connect } from '@/dbConnection/dbconfig'
import { getDataFromToken } from '@/helpers/getDatafromtoken'
import User from "@/model/userModel"
import { NextRequest, NextResponse } from 'next/server'
connect()


export async function POST(request:NextRequest){
    const useid = await getDataFromToken(request)
    const user = User.findOne({_id:useid}).select("-password");
    if(!user) return NextResponse.json({error:"User not found "},{status:500})

        return NextResponse.json(
            {
                message:"User found ",
                data:user
            }
        )
}