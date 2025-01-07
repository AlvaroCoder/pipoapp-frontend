import { SideBar, TopBar } from '@/commons/navbars'
import React from 'react'

export default function Layout({children}) {
  return (
    <div className='w-full min-h-screen flex flex-row'>
       <SideBar/>
       <div className='w-full h-screen flex flex-col overflow-y-hidden'>
            <TopBar/>
            {children}
       </div>
    </div>
  )
}
