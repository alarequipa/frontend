import React, { useContext } from 'react';

import BusinessList from '../components/BusinessList';
import ValidationContext from '../context/ValidationContext';

const Business =  () => {
    const {role}=useContext(ValidationContext)

	return (
        <>
        <div className="px-3 md:px-8 h-16 " />
		<div className='px-3 md:px-8 w-full mb-10 flex flex-wrap justify-evenly'>
        {role.business.map(business=>(

            <BusinessList key={business._id} business={business}></BusinessList>
         ))}
        </div>	

        </>

	);}

export default Business;
