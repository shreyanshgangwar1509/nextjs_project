'use client'
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, seterror] = useState(false);
    // const router = useRouter();
    const verifyemail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch (error:any) {
            console.log(error.response);
            seterror(true)
        }
    }
    useEffect(() => {
        seterror(false);
        const urltoken = window.location.search.split("=")[1];
        setToken(urltoken || "");
        
        
        // const { query } = router
        // const urltok =query.token        
    }, [])
    useEffect(() => {
        if(token.length>0)verifyemail()
    },[token])
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-4xl'>Verify Email</h1>
            <h2 className='p-2 bg-yellow-100 text-black'>{token ? `${token}` : "no token"}</h2>
            {verified && (
                <div >
                    <h2>Verified</h2>
                    <Link href = "/login">Login</Link>
                </div>
            )}
            {error && (
                <div >
                    <h2>Error</h2>
                    {/* <Link href = "/login">Login</Link> */}
                </div>
            )}
        </div>
    )
}

