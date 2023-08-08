'use client'

import Link from 'next/link'
export default function Home() {


  return (
    <div> 
      <div>
        <h1>Brother's Cleaning Co.</h1>
        <img src="/images/cleaningService.jpg" alt="Brother's Cleaning Co." width="400" height="400"/>
        <Link href={'/signup'}>Sign Up</Link> |
        <Link href = {"/login"}> Login </Link>|
        <a> Extras</a> |
      </div>
      <div>
        <div>
          <p>Welcome to Brother's Cleaning Co. ! We are a dedicated team of professionals committed to providing exceptional cleaning services
          to our valued clients. With a passion for cleanliness and an eye for detail, we strive to transform your
          living spaces into pristine havens. Our mission is to make your life easier and more comfortable by maintaining
          a spotless and organized environment
          </p>
          <img src="/images/cleaningService2.png" alt="Brother's Cleaning Co." width="400" height="200"/>
        </div>
        <a>Book a cleaning</a> |
        <a> View Standard Rates</a>
      </div>
      <div>
        <p>Reviews will be here</p>
      </div>
    </div>
  )
}
