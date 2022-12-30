import React, {useContext} from 'react';
import { Button, IconButton } from '@mui/material';
import ValidationContext from '../context/ValidationContext';
import { Delete, RemoveRedEye } from '@mui/icons-material';
const VehicleInfoResume = ({vehicle, isBusiness=false}) => {
  const {activateVehicle, verifyVehicleBusiness, deleteVehicleRole}=useContext(ValidationContext)

    return (
        <>
      <div className="flex-none w-auto max-w-full mx-auto my-auto">
              <div className="h-full">
                <h5 className="text-sm mb-1 dark:text-white">{vehicle.vehicleId.type}/{vehicle.vehicleId.brand}</h5>
                <p className="mb-0 font-medium leading-normal dark:text-white dark:opacity-60 text-sm">{vehicle.vehicleId.color}</p>
                <p className="mb-0 font-bold leading-normal text-principal dark:text-white dark:opacity-60 text-2xl">{vehicle.vehicleId.plaque}</p>

              </div>
            </div>
            <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
              {!isBusiness?(
              <div className="relative right-0">
              <ul className="relative flex flex-wrap p-1 list-none bg-gray-50 rounded-xl" >
                <li className="z-30 flex-auto text-center">
                  <IconButton color="primary" aria-label="add to shopping cart">
                  <RemoveRedEye />
                  </IconButton>
 
                </li>
                <li className="z-30 flex-auto text-center">
                <IconButton onClick={()=>deleteVehicleRole(vehicle._id)} color="warning" aria-label="add to shopping cart">
                  <Delete />
                  </IconButton>
          
                </li>
                <li className="z-30 flex-auto text-center">
                  <Button disabled={vehicle.active} onClick={()=>activateVehicle(vehicle._id)} color="success">
                  Activar
                  </Button>                  
                </li>
              </ul>
            </div>
              ):(
                <div className="relative right-0">
                <ul className="relative flex flex-wrap p-1 list-none bg-gray-50 rounded-xl" >
                  <li className="z-30 flex-auto text-center">
                    <IconButton color="primary" aria-label="add to shopping cart">
                    <RemoveRedEye />
                    </IconButton>
   
                  </li>
                  <li className="z-30 flex-auto text-center">
                    <Button disabled={vehicle.businessVerification} onClick={()=>verifyVehicleBusiness(vehicle._id)} color="success">
                    Verificar
                    </Button>                  
                  </li>
                </ul>
              </div>
              )}

            </div>   
        
        </>
       
 
    );
};

export default VehicleInfoResume;