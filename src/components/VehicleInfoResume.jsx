import React, {useContext} from 'react';
import { Button, IconButton, Modal, Box, CardContent } from '@mui/material';
import ValidationContext from '../context/ValidationContext';
import { Delete, RemoveRedEye } from '@mui/icons-material';
import VehicleInfoCheck from './VehicleInfoCheck';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};
const VehicleInfoResume = ({vehicle, isBusiness=false}) => {
  const {activateVehicle, verifyVehicleBusiness, deleteVehicleRole}=useContext(ValidationContext)
  const [openInfo, setOpenInfo] = React.useState(false);
  const handleOpenInfo = () => {setOpenInfo(true)};
  const handleClose = () => {setOpenInfo(false)}   
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
                  <IconButton color="primary"  onClick={handleOpenInfo} aria-label="add to shopping cart">
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
                    <IconButton color="primary" onClick={handleOpenInfo} aria-label="add to shopping cart">
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
      <Modal
            open={openInfo}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="w-11/12 lg:w-2/4 max-h-screen">
            <CardContent >
            <VehicleInfoCheck vehicle={vehicle}></VehicleInfoCheck>
            <Button  
            onClick={handleClose}
            variant="contained"
            className="bg-principal relative flex w-full justify-center rounded-md border border-transparent">
            Ok
            </Button> 
		        </CardContent>
            </Box>
        </Modal>
        </>
       
 
    );
};

export default VehicleInfoResume;