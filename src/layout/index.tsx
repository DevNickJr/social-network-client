// import React from 'react'
// import SideNav from 'src/components/SideNav'
// import BottomNav from 'src/components/BottomNav'
// import Head from 'src/components/Head'
import AuthHOC from '../components/AuthHOC'

const AdminLayout = ({ children }: { children: React.ReactNode }) => { 

      return (
        <div className=''>
          {children}
        </div>
    )
} 
  

export default AuthHOC(AdminLayout)


{/* <div className='flex w-full h-screen overflow-hidden'>
<SideNav />
<div className="relative flex-1 pb-10 overflow-hidden overflow-y-auto bg-black/5">
  <Head />
  {children}
</div>
<BottomNav />
</div> */}