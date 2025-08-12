import React from 'react'
import NetflixStyleCatalog from '@/components/catalogcomponent/NetflixStyleCatalog'
import Navbarcomponent from '@/components/navbar/Navbar'

export async function generateMetadata({ params }) {
  return {
    title: "ANINEST - Catalog",
    openGraph: {
      title: "ANINEST - Catalog",
    },
    twitter: {
      card: "summary",
      title: "ANINEST - Catalog",
    },
  }
}

function page({searchParams}) {
  return (
    <div>
      <Navbarcomponent/>
      <div className='mt-[70px]'>
        <NetflixStyleCatalog searchParams={searchParams}/>
      </div>
    </div>
  )
}

export default page
