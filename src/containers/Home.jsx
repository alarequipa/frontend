import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import useBusiness from '../hooks/useInitials';
const Home =  ({ children }) => {
    const business= useBusiness() 
  

	return (
    <>
      {(business || business!=="")?(
        <div className='h-screen overflow-y-scroll'>
        <Sidebar/>   
            <div className='md:ml-64'>
                <Outlet/>
            </div>
        </div>
          ):""}
   
   
    </>
	

	);
}

export default Home;
