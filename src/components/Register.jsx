import React, {useContext} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import {TextField, CardContent,  CircularProgress, Button} from '@mui/material';
import Page from '../containers/Page';
import ValidationContext from '../context/ValidationContext';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Register = () => {
	  const { date, setDate, getPersonByCi, verifyPerson, loading}=useContext(ValidationContext);
	  const initialValues={
		ced: "",
	  }
	  const navigate = useNavigate();
	  const handleChange = async(newValue) => {
		let vals= await (newValue.toDate()).toLocaleDateString()
		await setDate(newValue);
		console.log(vals)
	  };

	  const handleSubmit=async (vals)=>{
		const personFind={
				'ced': vals.ced,
				'com': '',
				'nom': '',
				'pat': '',
				'mat': '',        
			}
		const savedPerson= await getPersonByCi(vals.ced);
	
		if(await savedPerson && savedPerson.FechaNacimiento===((date.toDate()).toLocaleDateString())){

			navigate('/validate')
		}else{
			const finded= await verifyPerson(personFind)
			console.log(finded)
			if(await finded && finded.FechaNacimiento===((date.toDate()).toLocaleDateString())){	
				navigate('/validate')
			}else{
				
				Swal.fire({
					title: 'Error!',
					text: 'Introduce una fecha de nacimiento y carnet validos',
					icon: 'error',
					confirmButtonText: 'ok',
					confirmButtonColor:'#42a5f5'
				  })
			}
		}	
	}
	return (
		<Page>
		<div className="Register">
		<Card className='w-10/12 sm:w-80 md:w-96 p-4 card'>
		<CardHeader className='bg-principal text-white text-center m-auto -mt-9 shadow-md shadow-slate-400 rounded-lg'
		 title="Registro"
		/>
		<CardContent>
		{loading.person?(
            <div className='w-full justify-center flex flex-wrap my-8'>
               <CircularProgress />
          </div>
          ):(
		<>
		<Formik
			initialValues={initialValues}
			validationSchema={Yup.object({
				ced:Yup
				  .string('Ingresa tu CI')
				  .min(7, 'El CI ingresado es demasiado corto')
				  .max(10, 'El CI ingresado es demasiado largo')
				  .required('El CI es requerido'),				
			  })}
			onSubmit={(values, actions) => {
				const vals={...values}
				actions.resetForm();
				handleSubmit(vals)	
			  }}
			  >
			{({errors, isValid, touched, dirty})=>(
				<Form>
					<Field
					name="ced"
					type="number"
					as={TextField}
					variant="outlined"
					label="Introduce tu CI"
					className='formInput w-full'
					error={Boolean(errors.ced) && Boolean(touched.ced)}
					helperText={Boolean(touched.ced) && errors.ced}
					>
					</Field>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
					<Field
					className='w-full'
					as={MobileDatePicker}
					label="Ingresa tu fecha de nacimiento"
					inputFormat="DD/MM/YYYY"
					value={date}
					onChange={handleChange}
					renderInput={(params) => <TextField {...params} />}
					/>
					</LocalizationProvider>
					<Button 
					type='submit'
					disabled={!dirty || !isValid || !date || date===""}
					variant="contained"
					className="bg-principal primary-button login-button">
					Registrarse
					</Button>
				</Form>
			)}
			</Formik>	
		</>	
		  )}	
           <Link to="/login">
			<button className="secondary-button signup-button">Login</button>
            </Link>
		</CardContent>
		</Card>
		</div>
		</Page>
	);}

export default Register;
