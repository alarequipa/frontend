import React, {useContext, useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import {Typography, Step, FormHelperText, Alert, AlertTitle, StepLabel, List, ListItem, ListItemButton, ListItemAvatar, Avatar, Button, Stack, Checkbox, FormControl,TextField} from '@mui/material';
import Check from '@mui/icons-material/Check';
import '../styles/steeper.scss'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import PropTypes from 'prop-types';
import { TouchApp} from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';

import AppContext from '../context/AppContext';
import ValidationContext from '../context/ValidationContext';

export default function SteeperTic({handleClose}){
    const [checkedVehicle, setCheckedVehicle] = React.useState("");

 
    const handleToggle = (value) => async () => {

        await setCheckedVehicle(value)
        await console.log(checkedVehicle)
    };

    const {checked, setChecked, codigo, setCodigo, handleValidationCod}= useContext(AppContext)
    const {verifyCudap, vehiclesRole, qrcode, saveTic, updateTic, cudap}=useContext(ValidationContext)
    const [activeStep, setActiveStep] = React.useState(0);
    const [temporatalTic, setTemporalTic]=useState('')
    const [skipped] = React.useState(new Set());
    const handleChange =  (prop) => (event) => {
		setCodigo({ ...codigo, [prop]: event.target.value, errorStatus:false });
		if (handleValidationCod()) {
		   setChecked({cod:true})
		 } else {
		   setChecked({cod:false})
		 }};

    const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const isStepOptional = (step) => {
    return step === 1;
  };


  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#42a5f5',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#42a5f5',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));
  
  const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#42a5f5',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#42a5f5',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }));
  
  function QontoStepIcon(props) {
    const { active, completed, className } = props;
  
    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }
  
  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
  };
  const handleNext = async () => {
    if(activeStep === 0 ){
        verifyCudap(codigo)
      }
  if(activeStep === 1 ){
        const tic= await saveTic(checkedVehicle)
        setTemporalTic(tic)
  }
  if(activeStep===2){
    await updateTic(temporatalTic._id)
  }        
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const steps = ['Paso 1', 'Paso 2','Finalizar'];


  return (
    <Box sx={{ width: '100%' }}>
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                labelProps.optional = (
                    <Typography variant="caption">Optional</Typography>
                );
                }
                if (isStepSkipped(index)) {
                stepProps.completed = false;
                }
                return (
                <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                </Step>
                );
        })}
      </Stepper>
     </Stack>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
          Acabas de completar el registro de tu vehículo en caso de pertenecer a una empresa de RadioTaxis, la empresa deberá validar tus datos para verlos en tu TIC</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleClose}>Salir</Button>
          </Box>
        </React.Fragment>
      ) : activeStep===0 ?(
        <React.Fragment>
            <div className='flex flex-wrap text-center justify-center w-full'>
            <h3 className='my-4 font-semibold text-principal'> Realiza el pago de tus antecedentes; haz click en el botón, sigue los pasos y guarda el codigo generado</h3>
             <Button href='https://estadodigital.mingobierno.gob.bo/cudap/home' target="_blank" className='bg-cudap my-4 h-12 w-full' endIcon={<TouchApp/>}> CUDAP </Button>
             <p className='my-4 text-start'>
                Ingresa el código generado:
             </p>
             <FormControl className='formInput w-full' variant="outlined">
			<TextField
				name="cod"
				id="cod"
				label="Introduce el código"
				type="number"
				onChange={handleChange('cod')}
				value={codigo.cod}
				error={!checked.cod}
				InputLabelProps={{
					shrink: true,
				}}
				/>
			{!checked.cod ? (
			<FormHelperText error={!checked.cod} id="my-helper-text">{codigo.error}</FormHelperText>
			):""}
			{codigo.errorStatus ?(
			<FormHelperText error={codigo.errorStatus} id="my-helper-text">{codigo.error}</FormHelperText>
			):""}
			</FormControl>

             {/* <ReactCodeInput type='number' fields={6}/> */}
            </div>

         <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atras
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button 
            disabled={!codigo || !checked.cod}
            onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
            </Button>
          </Box>
        </React.Fragment>
      ):activeStep===1 ?(
        <React.Fragment>
         
          <div className='overflow-hidden bg-white  '>
            {cudap===0 ?(
                <div className="py-2">
                 <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                El código de tramite es incorrecto <strong>Por favor verificalo e intenta nuevamente!</strong>
                </Alert>               
                </div>
            ):(
                <>
                <div className="py-3 flex flex-wrap text-center justify-center ">
                <h3 className='my-2 w-full font-semibold text-principal'> Selecciona tu movilidad principal:</h3>

                   <List dense style={{ width: '100%', maxWidth: 560, bgcolor: 'background.paper' }}>

                        {vehiclesRole.map((vehicle) => {
                            
                            return (
                            <ListItem
                                className='my-4 w-full'
                                key={vehicle._id}
                                secondaryAction={
                                <Checkbox
                                    edge="end"
                                    onChange={handleToggle(vehicle)}
                                    checked={checkedVehicle._id===vehicle._id}                                  
                                />
                                }
                                disablePadding
                            >
                                <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar
                                    src={`data:image/png;base64,${vehicle.vehicleId.vehiclePhotos[0].image}`}
                                    className="max-w-none w-40 absolute shadow-2xl rounded-xl"
                                    />
                                </ListItemAvatar>
                                <div className='w-8 flex-wrap'>
                                <p className='flex font-medium text-gray-500 text-xs'>
                                {vehicle.vehicleId.type}/{vehicle.vehicleId.brand}/{vehicle.vehicleId.plaque}
                                </p>
                                </div>

                                </ListItemButton>
                            </ListItem>
                            );
                        })}
                        </List>
                </div>
               
                </>
            
            )}
    
          </div>          
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
           <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atras
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}
            disabled={cudap===0 || (checkedVehicle==="")}           
            >
              {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
            </Button>
          </Box>
        </React.Fragment>
      ):activeStep===2 ?(
        <React.Fragment>
         
          <div className='overflow-hidden bg-white  '>
            {qrcode===''?(
                  <div className="py-2">
                  <Alert severity="error">
                 <AlertTitle>Error</AlertTitle>
                 Tu TIC ha sido generada, pero, no sé a podido generar el código QR <strong>por favor utiliza el botón Generar QR situada en el apartado TIC’s</strong>
                 </Alert>               
                 </div>
            ):(
                <>
                <div className="py-3 flex flex-wrap text-center justify-center ">
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                Tu TIC y el código QR ha sido generado presiona finalizar para guardar el código QR.
                </Alert>
                </div>
               
                </>
            
            )}
             </div>          
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
           <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atras
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}
            disabled={cudap===0 || (checkedVehicle==="")}           
            >
              {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
            </Button>
          </Box>
        </React.Fragment>
      ):""}
    </Box>
  );
}


