'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
function login() {
    const [loader, setloder] = useState(false);
    const [user, setuser] = useState({
        email: "",
        password: "",
        // username:"",
    })
    const [buttnodisabled, setbuttondisabled] = useState(false);
    const router = useRouter();
    const onsubmit = async () => {
        try {
            setloder(true)
            const response  = axios.post("/api/users/login", user)
            console.log("login success",response);
            router.push("/login");
        } catch (error:any) {
            console.log("login falied");
            toast.error(error.message)
        }

    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 ) {
            setbuttondisabled(false);
            // setuser(user);
        }
        else setbuttondisabled(true);

    },[])
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>{loader ? "Processing " : "Sign up"}</h1>
            <hr />
            
            <label htmlFor='password'>password</label>
            <input 
                id='password'
                value={user.password}
                onChange={(e) => setuser({ ...user ,password:e.target.value})}
                placeholder='password'
            />
            <label htmlFor='email'>email</label>
            <input 
                id='email'
                value={user.email}
                onChange={(e) => setuser({ ...user ,email:e.target.value})}
                placeholder='email'
            />
            <button className='rounded bg-yellow-500 text-gray' onSubmit={onsubmit} >{ buttnodisabled?"FIll form first":"login"}</button>
            <Link href="/me">profile</Link>
            
    </div>
    )
}

export default login