'use client'

// dynamic route

function page({params}:any) {
  return (
            <div className='flex flex-col items-center justify-center min-h-screen py-2'>
                <h1>Profile page</h1>
            <h2 className="text=4xl rounded">{ params.id}</h2>
            </div>
  )
}

export default page