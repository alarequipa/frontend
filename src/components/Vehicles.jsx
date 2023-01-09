import React, { useContext } from 'react';
import { Card,Button, Modal, Box, CardContent} from '@mui/material';

import HorizontalLinearStepper from './Steeper';
import ValidationContext from '../context/ValidationContext';
import VehicleInfoResume from './VehicleInfoResume';
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

const Vehicles = () => {
    const {vehiclesRole, loading, setLoading}=useContext(ValidationContext)
    const [open, setOpen] = React.useState(false);
   
    const handleOpen = () => {setOpen(true);
    console.log(vehiclesRole)};
    const handleClose = () => {setOpen(false)
        setLoading({
            ...loading,
            vehicle:false
        })
    }    
    return (
        <>
        {(vehiclesRole && vehiclesRole.length>0)?(
        <div className='w-full md:h-2/6 m-2 scr'>
            
        {vehiclesRole.map(vehicle=>(
            <Card key={vehicle._id} className='w-full my-2 overflow-hidden rounded-3xl'>
            <div className="relative flex flex-col flex-auto min-w-0 p-4 mx-3 md:mx-6 overflow-hidden break-words bg-white border-0 dark:bg-slate-850 dark:shadow-dark-xl shadow-3xl rounded-2xl bg-clip-border"> 
            <div className="flex flex-wrap -mx-3">
            <div className="flex-none w-auto px-3"> 
            <div className="relative inline-flex items-center justify-center text-white transition-all duration-200 ease-in-out text-base h-24 w-24 overflow-hidden rounded-xl">
                    <img src={`data:image/png;base64,${vehicle.vehicleId.vehiclePhotos[0].image}`} alt="profile_image" className="max-w-none w-40 -top-10 -left-7 absolute shadow-2xl rounded-xl" />
                </div>
                </div>
                    <VehicleInfoResume vehicle={vehicle}></VehicleInfoResume>

                </div>
            </div>
            </Card> 
        ))}
       
        </div>
        ):
        <Card className='w-full py-8 h-2/6 m-2 card'>
        <div className="w-full h-full px-4 lg:order-2 flex justify-center">
        <div className='h-full flex flex-col justify-evenly'>
        <h2 className="text-center text-xl font-semibold tracking-tight text-principal">
        No posees ningun vehiculo
        </h2>                       
        <Button  
        onClick={handleOpen}
        variant="contained"
        className="bg-principal relative flex w-full justify-center rounded-md border border-transparent">
        Añadir Vehiculo
        </Button> 
        </div>  
        </div>
        </Card>                    
        }
            
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="w-11/12 lg:w-2/4 max-h-screen">
            <CardContent >
            <HorizontalLinearStepper handleClose={handleClose}>

            </HorizontalLinearStepper>

		    </CardContent>
            </Box>
        </Modal>
       
        </>

    );
};

export default Vehicles;