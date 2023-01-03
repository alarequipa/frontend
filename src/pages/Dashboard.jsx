import React, { useContext } from 'react';

import InfoPerson from '../components/InfoPerson';
import Vehicles from '../components/Vehicles';
import Tic from '../components/Tic';
import { Card,CardContent,Modal,Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { LocalTaxi } from '@mui/icons-material';
import { QrCode } from '@mui/icons-material';
import { AddBusiness } from '@mui/icons-material';
import HorizontalLinearStepper from '../components/Steeper';
import SteeperTic from '../components/SteeperTic';
import ValidationContext from '../context/ValidationContext';
import SteeperBusiness from '../components/SteeperBusiness';
import DashboardVisc from './DashboardVisc';
const actions = [
	{ icon: <LocalTaxi />, name: 'Vehiculo' },
	{ icon: <QrCode />, name: 'Tic' },
	{ icon: <AddBusiness />, name: 'Empresa' },
  ];
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
const Dashboard =  () => {

	const {person, loading, setLoading, role}=useContext(ValidationContext)
	const [openVehicle, setOpenVehicle] = React.useState(false);
	const [openTic, setOpenTic] = React.useState(false);
	const [openBusiness, setOpenBusiness] = React.useState(false);

    const handleOpenVehicle = () => {setOpenVehicle(true)};
    const handleCloseVehicle = () => {setOpenVehicle(false)
        setLoading({
            ...loading,
            vehicle:false
        })
    }
	const handleOpenTic = () => {setOpenTic(true)};
    const handleCloseTic = () => {setOpenTic(false)};
	const handleOpenBusiness = () => {setOpenBusiness(true)};
    const handleCloseBusiness = () => {setOpenBusiness(false)};

	const handleClick=(action)=>{
		if(action==="Vehiculo"){
			handleOpenVehicle()
		}
		if(action==="Tic"){
			handleOpenTic()
		}
		if(action==="Empresa"){
			handleOpenBusiness()
		}
	}    
	return (
	<>
    {person && person!== ""?(
        <>
        <div className="px-3 md:px-8 h-16 " />
		<div className='px-3 md:px-8 w-full mb-10 flex flex-wrap justify-evenly'>
			<Card className='validateinfo h-full w-full md:w-5/12 card'>
			<InfoPerson isHome="true" />
			</Card>
			<div className='w-full md:w-5/12 flex flex-wrap content-start md:overflow-scroll'>
			<h3 className="text-center h-5 m-2 text-xl font-semibold tracking-tight text-principal">
            Vehiculos:
          </h3>
			<Vehicles></Vehicles>
		</div>		
		</div>
		<div className='px-3 md:px-8 w-full mb-16 flex flex-wrap justify-center'>
		<h3 className="text-center m-2 text-xl font-semibold tracking-tight text-principal">
            TIC:
          </h3>
			<Tic></Tic>		
			
		</div>
        </>
    ):""}
    {(role.police && role.police!==[] &&role.police!=="")?(
           <DashboardVisc></DashboardVisc>
    ):""}

		<SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
		  	onClick={()=>handleClick(action.name)}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
			tooltipOpen
          />
        ))}
      </SpeedDial>
	  <Modal
            open={openVehicle}
            onClose={handleCloseVehicle}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="w-11/12 lg:w-2/4 max-h-screen">
            <CardContent >
            <HorizontalLinearStepper handleClose={handleCloseVehicle}>

            </HorizontalLinearStepper>

		    </CardContent>
            </Box>
        </Modal>

		<Modal
            open={openTic}
            onClose={handleCloseTic}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="w-11/12 lg:w-2/4 max-h-screen">
            <CardContent >
            <SteeperTic handleClose={handleCloseTic}>

            </SteeperTic>

		    </CardContent>
            </Box>
        </Modal>

		<Modal
            open={openBusiness}
			onClose={handleCloseBusiness}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="w-11/12 lg:w-2/4 max-h-screen">
            <CardContent >
            <SteeperBusiness handleClose={handleCloseBusiness}>

            </SteeperBusiness>

		    </CardContent>
            </Box>
        </Modal>
		</>


		);}

export default Dashboard;
