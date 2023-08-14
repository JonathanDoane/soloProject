'use client'

import Link from 'next/link'

export default function Home() {


  return (
      <div className="bg-blue-200 min-h-screen" style={{height:"100vh"}}>
        <div className='p-1'> 
        <div className='flex items-center justify-between w-5/6 m-auto'>
          <div className='flex items-center'>
            <h1 className='sm:text-3xl  md:text-6xl'>Brother's Cleaning Co.</h1>
            <img src="/images/cleaningService.jpg" alt="Brother's Cleaning Co." width="100" height="100" className='rounded-3xl p-1'/>
          </div>
          <div>
            <Link href={'/signup'} className='hover:underline'>Sign Up</Link> |
            <Link href = {"/login"} className='hover:underline'> Login </Link>|
            <Link href={"/extras"} className='hover:underline'> Extras</Link> 
          </div>
        </div>
        <div>
          <div className=' rounded-xl border-2 border-solid border-black p-2 w-3/4 m-auto bg-[url("/images/cleaningService2.png")] bg-cover bg-center h-96 mt-5'>
            <div className=' w-4/5 flex justify-between items-center bg-white bg-opacity-75 mt-36 p-3 rounded-lg'>
              <p className='text-lg'>Welcome to Brother's Cleaning Co. ! We are a dedicated team of professionals committed to providing exceptional cleaning services
                to our valued clients. With a passion for cleanliness and an eye for detail, we strive to transform your
                living spaces into pristine havens. Our mission is to make your life easier and more comfortable by maintaining
                a spotless and organized environment.
              </p>
            </div>
            <div className='flex justify-center gap-4 mt-2'>
              <Link href={"/login"} className='text-black font-semibold border rounded-md p-1 bg-white
              hover:bg-transparent hover:text-white transition duration-300 ease-in-out'> Book a Cleaning</Link> |
              <Link href={"/rates"}className='text-black font-semibold border rounded-md p-1 bg-white
              hover:bg-transparent hover:text-white transition duration-300 ease-in-out'> View Standard Rates </Link>
            </div>
          </div>
        </div>
        <div className='bg-blue-300 flex justify-evenly w-3/4 m-auto pt-7 p-3 rounded-xl'>
          <img src="/images/cleaningService3.jpg" alt="Brother's Cleaning Co." className='rounded-3xl p-1 w-2/6 h-3/4'/>
          <div className=''>
            <p className='text-4xl'>Why Choose Us</p>
            <div className="flex mt-5 gap-2">
              <img src="/images/checkmark.png" alt="Brother's Cleaning Co." className='w-7'/>
              <p className='text-lg'>Cleaning and Sanitizing Services</p>
            </div>
            <div className="flex mt-5 gap-2">
              <img src="/images/checkmark.png" alt="Brother's Cleaning Co." className='w-7'/>
              <p className='text-lg'>Professional Staff</p>
            </div>
            <div className="flex mt-5 gap-2">
              <img src="/images/checkmark.png" alt="Brother's Cleaning Co." className='w-7'/>
              <p className='text-lg'>Customized Cleaning Plans</p>
            </div>
            <div className="flex mt-5 gap-2">
              <img src="/images/checkmark.png" alt="Brother's Cleaning Co." className='w-7'/>
              <p className='text-lg'>Flexible Scheduling</p>
            </div>
            <div className="flex mt-5 gap-2">
              <img src="/images/checkmark.png" alt="Brother's Cleaning Co." className='w-7'/>
              <p className='text-lg'>Affordable Prices</p>
            </div>
          </div>
          
        </div>
      </div>
      </div>
  )
}
