import React, {useContext, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import {Typography, Step, StepLabel,CircularProgress, Button, Stack, FormGroup,FormLabel, FormControlLabel, Checkbox, Select, FormControl,TextField, MenuItem, InputLabel, Autocomplete} from '@mui/material';
import Check from '@mui/icons-material/Check';
import '../styles/steeper.scss'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import PropTypes from 'prop-types';
import VehicleFinder from './VehicleFinder';
import VehicleInfo from './VehicleInfo';
import ValidationContext from '../context/ValidationContext';
export default function HorizontalLinearStepper({handleClose}){
  const {headings,radioTaxis, sindicato, radicatoria, setRadicatoria, asociacion, saveOwner, saveDriver, saveVehicle, loading, vehicleToSave, rubro, setRubro, empresa, setEmpresa, relacion, setRelacion}=useContext(ValidationContext)
  const [validCheckbox, setValidCheckbox]=useState(false)
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped] = React.useState(new Set());
  let autocomplete = useRef(null)
  const departamentos=["Beni", "Chuquisaca", "Cochabamba", "La Paz", "Oruro","Pando", "Potosí", "Santa Cruz", "Tarija"];

  const handleChangeCheck = (event) => {
    setRelacion({
      ...relacion,
      [event.target.name]: event.target.checked,
    });
  };
  const { conductor, propietario} = relacion;

  const handleChangeSelect = async (event) => {
    await setRubro(event.target.value);
    console.log(rubro)

  };
  const handleChangeAuto = async (event, newValue) => {
    await setEmpresa(newValue);
  };
  const handleChangeRadicatoria = async (event, newValue) => {
    await setRadicatoria(newValue);
    console.log(event.target.value)
  };
  const isStepOptional = (step) => {
    return step === 1;
  };
  const handleChange = () => {
    setValidCheckbox(!validCheckbox);
};
  const isStepSkipped = (step) => {
    return skipped.has(step);
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
        console.log(vehicleToSave)
        await saveVehicle(vehicleToSave)
      
    }
    if(activeStep === steps.length - 2 ){
      if(conductor && propietario){
        console.log("ambos")
        await saveOwner(vehicleToSave, rubro, empresa, radicatoria);
        await saveDriver(vehicleToSave, rubro, empresa, radicatoria);
      }else if(conductor){
        console.log("conductor")
        await saveDriver(vehicleToSave, rubro, empresa, radicatoria);
      }else if(propietario){
        console.log("propietario")
        await saveOwner(vehicleToSave, rubro, empresa, radicatoria);
      }
      console.log(vehicleToSave, empresa, rubro)
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const test=()=>{
    console.log(vehicleToSave)
  }

  const steps = ['Busca tu vehiculo', 'Seleccionar empresa', 'Verifica la información'];


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
            Acabas de completar el registro de tu vehiculo en caso de pertenecer a una empresa de RadioTaxis, la empresa debera verificar tus datos para obtener tu TIC
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleClose}>Salir</Button>
          </Box>
        </React.Fragment>
      ) : activeStep===0 ?(
        <React.Fragment>
          <VehicleFinder></VehicleFinder>
          {vehicleToSave ? (
          <>
          <VehicleInfo step3={false}></VehicleInfo>
          <FormGroup className='text-xs'>
          <FormControlLabel sx={{ '& .MuiFormControlLabel-label': { fontSize: 12 } }}control={<Checkbox checked={validCheckbox} onChange={handleChange}/>} label="Declaro que la información corresponde a mi vehiculo" />
          </FormGroup>
          </>
          ): loading.vehicle?(<div className='w-full'>
               <CircularProgress />
          </div>):""}

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
            onClick={handleNext}
            disabled={!vehicleToSave || !validCheckbox}>
              {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
            </Button>
          </Box>
        </React.Fragment>
      ):activeStep===1 ?(
        <React.Fragment>
          <div className='overflow-hidden bg-white  '>
         <div className="py-3 ">
          <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Usted es:</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={conductor} onChange={handleChangeCheck} name="conductor" />
            }
            label="conductor"
          />
          <FormControlLabel
            control={
              <Checkbox checked={propietario} onChange={handleChangeCheck} name="propietario" />
            }
            label="propietario"
          />
        </FormGroup>
 
      </FormControl>
      </div>
            <div className="py-2">
            <h3 className="text-base font-medium leading-6 text-gray-900">Seleccióna tu rubro:</h3>
          </div>

          <div className="py-1 ">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Rubro</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={rubro}
              label="Rubro"
              onChange={handleChangeSelect}
            >
              {headings.map(heading=>(
                 <MenuItem key={heading.name} value={heading}>{heading.name}</MenuItem>
               ))}
             
            </Select>

          </FormControl>
          </div>
          {(rubro.name==="Taxi Libre" || !rubro.name || rubro.name === "Transporte Libre")?(
            ""
          ):(rubro.name==="RadioTaxi")?( 
          <>
           <div className="py-2">
            <h3 className="text-base font-medium leading-6 text-gray-900">Seleccióna tu empresa {rubro.name}:</h3>
          </div>
          </>
         ):( 
          <>
           <div className="py-2">
            <h3 className="text-base font-medium leading-6 text-gray-900">Seleccióna tu {rubro.name}:</h3>
          </div>
          </>
          )}
          <div className="py-1 ">
          {rubro.name==="Sindicato"?(
            <Autocomplete
              disablePortal
              id="sindicato"
              ref={autocomplete}
              onChange={handleChangeAuto}   
              options={sindicato}
              getOptionLabel={(sindicato) => sindicato.businessName}     
              renderInput={(params) => <TextField {...params} label={rubro.name} />}
            />
          ):rubro.name==="RadioTaxi"?(
            <Autocomplete
            disablePortal
            id="radioTaxis"
            ref={autocomplete}
            onChange={handleChangeAuto}      
            options={radioTaxis}
            getOptionLabel={(radioTaxi) => radioTaxi.businessName} 
            renderInput={(params) => <TextField {...params} label={rubro.name} />}
          />
          ):rubro.name==="Asociación de taxis / trufis"?(
            <Autocomplete
            disablePortal
            id="asociacion"
            ref={autocomplete}
            onChange={handleChangeAuto}       
            options={asociacion} 
            getOptionLabel={(asociacion) => asociacion.businessName}
            renderInput={(params) => <TextField {...params} label={rubro.name} />}
          />
          ): (rubro.name==="Taxi Libre" || rubro.name==="Transporte Libre")?(
            <Autocomplete
            disablePortal
            id="departamentos"
            ref={autocomplete}
            onChange={handleChangeRadicatoria}       
            options={departamentos} 
            onClose={()=>console.log("Hola")}
            getOptionLabel={(departamento) => departamento}
            renderInput={(params) => <TextField {...params} label="Radicatoria" />}
          />
          ):(
           <>
           </>
          ) }
          </div>       
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
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={test}
              sx={{ mr: 1 }}
            >
              verificar
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}
            disabled={(!conductor && !propietario) || (!(rubro==="Taxi libre" || rubro==="Transporte Libre")&& (!radicatoria && !empresa)) }
            >
              {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
            </Button>
          </Box>
        </React.Fragment>
      ):(
      <React.Fragment>
        <VehicleInfo step3={true}></VehicleInfo>
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
          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
          </Button>
        </Box>
      </React.Fragment>
      )}
    </Box>
  );
}


