import React, {useState, useContext} from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { FormHelperText, TextField, Button } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ValidationContext from '../context/ValidationContext';
import Page from '../containers/Page';
import { Link, useNavigate } from 'react-router-dom';
import { AccountContext } from '../context/AccountContext';

const Login = () => {
	const { addPerson, login }=useContext(ValidationContext);
	const {setUser}= useContext(AccountContext)
	const [showPassword, setShowPassword]= useState(false)

	const navigate = useNavigate();
	const initialValues={
	  ci: "",
	  password:""
	}

	const handleClickShowPassword = () => {
	  setShowPassword(!showPassword)
	};   

	const handleSubmit= async (vals)=>{
	  let usuario= await login(vals);
		  console.log(usuario)
		  await addPerson(usuario.person)
		  if(usuario || usuario.person){
			setUser({...usuario})
			  navigate('/home')
		  }
  }


  return (
	  <Page>
	  <div className="Login">
	  <Card className='w-11/12 sm:w-80 md:w-96 p-4 card'>
	  <CardHeader className='bg-principal text-white text-center m-auto -mt-9 shadow-md shadow-slate-400 rounded-lg'
	   title="Login"
	  />
	  <CardContent>
	  <Formik
		  initialValues={initialValues}
		  validationSchema={Yup.object({
			  ci:Yup
				.string('Ingresa tu CI')
				.min(7, 'El CI ingresado es demasiado corto')
				.max(10, 'El CI ingresado es demasiado largo')
				.required('El CI es requerido'),
			  password:Yup
			  .string()
			  .min(6, 'La contraseña ingresada es demasiado corta')
			  .max(14, 'La contraseña ingresada es demasiado larga')
			  .matches(
			  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
			  "La contraseña debe contener al menos una letra Mayuscula, una minuscula y un número"
			  )
			  .required('Es necesario que crees una contraseña!'),
			})}
		  onSubmit={async (values, actions) => {
			  const vals={...values}
			  actions.resetForm();
			  await handleSubmit(vals);
			}}
			>
		  {({errors, isValid, touched, dirty})=>(
			  <Form>
				  <Field
				  name="ci"
				  type="number"
				  as={TextField}
				  variant="outlined"
				  label="Introduce tu CI"
				  className='formInput w-full'
				  error={Boolean(errors.ci) && Boolean(touched.ci)}
				  helperText={Boolean(touched.ci) && errors.ci}
				  >
				  </Field>
				  <FormControl className='formInput w-full mt-4' variant="outlined">
				  <InputLabel htmlFor="outlined-adornment-password">Introduce tu contraseña</InputLabel>
					  <Field
						  id="password1"
						  name="password"
						  type={showPassword ? 'text' : 'password'}
						  as={OutlinedInput}
						  label="Introduce tu contraseña"
						  className='formInput w-full'
						  endAdornment={
							  <InputAdornment position="end">
								  <IconButton
								  aria-label="toggle password visibility"
								  onClick={handleClickShowPassword}
								  edge="end"
								  >
								  {showPassword ? <VisibilityOff /> : <Visibility />}
								  </IconButton>
							  </InputAdornment>
							  }
						  error={Boolean(errors.password) && Boolean(touched.password)}
						  >                  
						  </Field>
						  <FormHelperText error id="my-helper-text">{errors.password}</FormHelperText>
					  </FormControl>
				  <Button 
				  type='submit'
				  disabled={!dirty || !isValid}
				  variant="contained"
				  className="bg-principal primary-button login-button">
				  Log in
				  </Button>
			  </Form>
		  )}
		  </Formik>	
	  <Link to="/renewPassword">
			  <button>Olvidaste tu contraseña?</button>
			  </Link>
		<Link to="/loginVisc">
		  <button className="my-4 secondary-button signup-button">Login Visc</button>
		  </Link>
		  <Link to="/register">
		  <button className="secondary-button signup-button">Registrate</button>
		  </Link>

	  </CardContent>
	  </Card>
	  </div>
				  
	  </Page>

  );
}
   
export default Login;
