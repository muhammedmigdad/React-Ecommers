import React from 'react'
import Hero from '../compontents/Hero'
import LatestCollection from '../compontents/LatestCollection'
import BestSeller from '../compontents/BestSeller'
import OurPolicy from '../compontents/OurPolicy'
import NewsletterBox from '../compontents/NewsletterBox'
function Home() {
  return (
    <div className=' px-10  bg-black text-white'>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
      
    </div>
  )
}

export default Home
