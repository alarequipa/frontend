import React, {useContext} from 'react';
import { Card, Button, IconButton } from '@mui/material';
import ValidationContext from '../context/ValidationContext';
import { Delete, RemoveRedEye, WhatsApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const BusinessList = ({business}) => {
  const navigate = useNavigate();
  const {deleteBusiness, setSelectedBusiness}=useContext(ValidationContext)
  const handleClick =async (business) => {
    await setSelectedBusiness(business)
    await navigate(`/home/business/${business._id}`)
     };

    return (

        <Card key={business._id} className='w-96 my-2 overflow-hidden rounded-3xl'>
            <div className="relative flex flex-col flex-auto min-w-0 p-4 mx-3 md:mx-6 overflow-hidden break-words bg-white border-0 dark:bg-slate-850 dark:shadow-dark-xl shadow-3xl rounded-2xl bg-clip-border"> 
            <div className="flex flex-wrap -mx-3">
            <div className="flex-none w-auto px-3"> 
            <div className="relative inline-flex items-center justify-center text-white transition-all duration-200 ease-in-out text-base h-24 w-24 overflow-hidden rounded-xl">
                    <img src={`${process.env.REACT_APP_SERVER_URL}/uploads/business/image/${business.image}`} alt="business_image" className="max-w-none w-full absolute shadow-2xl rounded-xl" />
                </div>
                </div>
      <div className="flex-none w-auto max-w-full mx-auto my-auto">
              <div className="h-full">
                <h5 className="font-semibold mb-1 text-principal  dark:text-white">{business.businessName}</h5>
                <p className="mb-0 font-medium leading-normal dark:text-white dark:opacity-60 text-sm">{business.city}</p>
                <p className="mb-0 font-semibold leading-normal dark:text-white dark:opacity-60 text-lg">
                  <WhatsApp className='mr-2 text-green-500'/> 
                  {business.whatsapp}
                  </p>

              </div>
            </div>
            <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0">
              <div className="relative right-0">
                <ul className="relative flex flex-wrap p-1 list-none bg-gray-50 rounded-xl" >
                  <li className="z-30 flex-auto text-center">
                    <IconButton color="primary" aria-label="add to shopping cart">
                    <RemoveRedEye />
                    </IconButton>
   
                  </li>
                  <li className="z-30 flex-auto text-center">
                  <IconButton onClick={()=>deleteBusiness(business._id)} color="warning" aria-label="add to shopping cart">
                    <Delete />
                    </IconButton>
            
                  </li>
                  <li className="z-30 flex-auto text-center">
                    <Button  onClick={()=>handleClick(business)} color="success">
                    Editar
                    </Button>                  
                  </li>
                </ul>
              </div>
            </div>  
            </div>
            </div> 
      </Card> 
    );
};

export default BusinessList;