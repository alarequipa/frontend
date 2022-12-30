import React, { useContext } from 'react';
import { Card, Modal, Box, Button, CardContent, IconButton} from '@mui/material';
import ValidationContext from '../context/ValidationContext';
import { Delete, RemoveRedEye } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import SteeperTic from './SteeperTic';
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
const Tic = () => {
    const navigate = useNavigate();
    const {tic, verifyQr, qrcode, setSelectedTic}=useContext(ValidationContext)
    const [open, setOpen] = React.useState(false);
    const handleClick =async (ticValue) => {
      await setSelectedTic(ticValue)
      await navigate(`/home/tic/${ticValue._id}?computer=computer`)
       };
    const test=async (id)=>{
      console.log(qrcode)
      await verifyQr(id)
    }
       const handleOpen = () => {setOpen(true)};
       const handleClose = () => {setOpen(false)
        
       }    
    return (
        <>
         {(tic && tic!=="")?(
            <div className='w-full overflow-x-scroll flex flex-wrap justify-center md:h-2/6 m-2 card'>
            <Card className='w-48 mr-4 md:h-full overflow-hidden rounded-3xl'>
            <div className="relative flex flex-col flex-auto min-w-0 p-4 overflow-hidden break-words bg-white border-0 dark:bg-slate-850 dark:shadow-dark-xl shadow-3xl rounded-2xl bg-clip-border"> 
            <div className="flex flex-wrap">
            <div className="flex-none w-auto"> 
            <div className="relative inline-flex items-center justify-center text-white transition-all duration-200 ease-in-out text-base h-40 w-40 overflow-hidden rounded-xl">
                    <img src={tic.qrCode} alt="profile_image" className="max-w-none w-40 relative shadow-2xl rounded-xl" />
                </div>
                </div>
                </div>
                <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 ">
              <div className="relative right-0">
                <ul className="relative flex flex-wrap p-1 list-none bg-gray-50 rounded-xl" >
                <li className="z-30 flex-auto text-center">
                <Button disabled={tic.qrCode && tic.qrCode!==''} onClick={()=>test(tic._id)}>Generar QR</Button>

                  </li>
                  <li className="z-30 flex-auto text-center">
                    <IconButton color="primary" onClick={()=>handleClick(tic)} aria-label="Ver tic">
                    <RemoveRedEye />
                    </IconButton> 
                  </li>
                  <li className="z-30 flex-auto text-center">
                  <IconButton color="warning" aria-label="Eliminar">
                    <Delete />
                    </IconButton>            
                  </li>
                </ul>
              </div>
            </div>  
            </div>
            </Card>
  
            </div>
            ):
            <Card className='w-full py-8 h-2/6 m-2 card'>
            <div className="w-full h-full px-4 lg:order-2 flex justify-center">
            <div className='h-full flex flex-col justify-evenly'>     
            <Button  
            variant="contained"
            onClick={handleOpen}
            className="bg-principal relative flex w-full justify-center rounded-md border border-transparent">
            Generar TIC
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
            <SteeperTic handleClose={handleClose}>
            </SteeperTic>

		    </CardContent>
            </Box>
        </Modal>
        </>       
    );
};

export default Tic;