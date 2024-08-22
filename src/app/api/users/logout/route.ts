import { connect } from '@/dbConnection/dbconfig'
import { NextRequest, NextResponse } from 'next/server'
connect()


export async function GET(request:NextRequest){
    try {
        const response=NextResponse.json({
            message:"logout successfully ",
            success:true
        })
        response.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0)
        })

        return response;

    } catch (error) {
        return NextResponse.json({error:error},{status:500});
    }
}