'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

function profile() {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const getUserData = async () => {
        
            const res = await axios.post("/api/users/me");
            console.log(res);
            setData(res.data.data._id);
            
    }
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("logout success")
            router.push("/login");
        } catch (error:any) {
            console.log(error);
            toast.error(error.message);
            
        }
    }


  return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>profile page</h1>
            <hr />
            <h2>{data === "nothing" ? "no data" : <Link href={`/profile/${data}`}>{ data}</Link>}</h2>
            <hr />
            <button onClick={logout}>logout </button>
            <button className='bg-yellow-500 text-black' onClick={getUserData}>User detail</button>
    </div>
  )
}

export default profile