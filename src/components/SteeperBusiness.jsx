import React, {useContext} from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import {Typography, Step, StepLabel, Button, Stack, Select, FormControl,TextField, MenuItem, InputLabel} from '@mui/material';
import Check from '@mui/icons-material/Check';
import '../styles/steeper.scss'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import ValidationContext from '../context/ValidationContext';

export default function SteeperBusiness({handleClose}){

 

    const initialValues={
      businessName: "",
      whatsapp:"",
      address:"",
      city:"",
      email:"",
    }
    const {businessBlank}= useContext(AppContext)
    const {headings, saveBusiness, rubro, setRubro}=useContext(ValidationContext)
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped] = React.useState(new Set());

     const businessHeadings = headings.filter((heading)=>{
      return heading.name.includes("Sindicato") || heading.name.includes("RadioTaxi") || heading.name.includes("Asociación de taxis / trufis");
      })

    
    const handleChangeSelect = async (event) => {
            await setRubro(event.target.value);
            console.log(event.target.value)
          };
          
    const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const isStepOptional = (step) => {
    return step === 1;
  };
  const test=()=>{
    businessBlank()
  }

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
  const handleNext = async (vals) => {
    if(activeStep === 0 ){
        await saveBusiness(vals, rubro)
      }   
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const steps = ['Registrar Empresa'];


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
          Acabas de completar el registro de tu Empresa/Sindicato Se te habilitara el menu en unos instantes</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={test}>Salir</Button>
          </Box>
        </React.Fragment>
      ) : activeStep===0 ?(
        <React.Fragment>
            <div className='flex flex-wrap text-center justify-center w-full'>
            <h3 className='my-4 font-semibold text-principal'> Registra los datos de tu empresa o sindicato</h3>
          <div className="pb-3 w-full ">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Rubro</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={rubro}
              label="Rubro"
              onChange={handleChangeSelect}
            >
              {businessHeadings.map(heading=>(
                 <MenuItem key={heading.name} value={heading}>{heading.name}</MenuItem>
               ))}
             
            </Select>

          </FormControl>
          </div>
          <Formik
        
		  initialValues={initialValues}
		  validationSchema={Yup.object({
			  businessName:Yup
				.string('Ingresa el nombre de tu empresa o sindicato')
				.min(5, 'El nombre ingresado es demasiado corto')
				.max(16, 'El nombre ingresado es demasiado largo')
				.required('El nombre es requerido'),
			  whatsapp:Yup
			  .string('Ingresa el whatsapp de tu empresa o sindicato')
			  .min(6, 'El whatsapp ingresado es demasiado corta')
			  .max(14, 'El whatsapp ingresado es demasiado larga')
			  .required('Es necesario que ingreses un whatsapp!'),
        address:Yup
			  .string('Ingresa la dirección de tu empresa o sindicato')
			  .min(6, 'La dirección ingresada es demasiado corta')
			  .max(50, 'La dirección ingresada es demasiado larga')
			  .required('La necesario que ingreses una dirección!'),
        city:Yup
			  .string('Ingresa la ciudad de tu empresa o sindicato')
			  .min(2, 'La ciudad ingresada es demasiado corta')
			  .max(14, 'La ciudad ingresada es demasiado larga')
			  .required('Es necesario que ingreses una ciudad!'),
        email:Yup
			  .string('Ingresa el correo de tu empresa o sindicato')
			  .max(28, 'El correo ingresada es demasiado larga')
        .email("Ingresa un email valido!")
			  .required('Es necesario que ingreses un correo!'),
			})}
		  onSubmit={async (values, actions) => {
			  const vals={...values}
			  actions.resetForm();
        handleNext(vals)
			}}
			>
		  {({errors, isValid, touched, dirty})=>(
			  <Form>
				  <Field
				  name="businessName"
				  type="text"
          disabled={!rubro && rubro===""}
				  as={TextField}
				  variant="outlined"
				  label="Introduce el nombre de tu empresa o sindicato"
				  className='formInput w-full'
				  error={Boolean(errors.businessName) && Boolean(touched.businessName)}
				  helperText={Boolean(touched.businessName) && errors.businessName}
				  >
				  </Field>
          <Field
				  name="whatsapp"
				  type="number"
          disabled={!rubro && rubro===""}
				  as={TextField}
				  variant="outlined"
				  label="Introduce el whatsapp"
				  className='formInput w-full'
				  error={Boolean(errors.whatsapp) && Boolean(touched.whatsapp)}
				  helperText={Boolean(touched.whatsapp) && errors.whatsapp}
				  >
				  </Field>
          <Field
				  name="address"
				  type="text"
          disabled={!rubro && rubro===""}
				  as={TextField}
				  variant="outlined"
				  label="Introduce la Dirección"
				  className='formInput w-full'
				  error={Boolean(errors.address) && Boolean(touched.address)}
				  helperText={Boolean(touched.address) && errors.address}
				  >
				  </Field>
          <Field
				  name="city"
				  type="text"
          disabled={!rubro && rubro===""}
				  as={TextField}
				  variant="outlined"
				  label="Introduce la ciudad"
				  className='formInput w-full'
				  error={Boolean(errors.city) && Boolean(touched.city)}
				  helperText={Boolean(touched.city) && errors.city}
				  >
				  </Field>
          <Field
				  name="email"
				  type="text"
          disabled={!rubro && rubro===""}
				  as={TextField}
				  variant="outlined"
				  label="Introduce el correo"
				  className='formInput w-full'
				  error={Boolean(errors.email) && Boolean(touched.email)}
				  helperText={Boolean(touched.email) && errors.email}
				  >
				  </Field>
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
              type='submit'
	            disabled={!dirty || !isValid}             
            >
              {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
            </Button>
          </Box>
			  </Form>
		  )}
		  </Formik>	
     </div>


        </React.Fragment>
      ):""}
    </Box>
  );
}


