import React from 'react';
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import {InputLabel, Card,FormControl,InputAdornment, FormHelperText, OutlinedInput, FormGroup, FormControlLabel, IconButton, Checkbox, Button} from '@mui/material';
import Page from '../containers/Page';
import InfoPerson from '../components/InfoPerson';
import ValidationContext from '../context/ValidationContext';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AccountContext } from '../context/AccountContext';


const ValidateInfo = () => {
    const {person, savePerson, saveUser}=useContext(ValidationContext);
    const [validCheckbox, setValidCheckbox]=useState(false)
    const {setUser}= useContext(AccountContext)

    const [showPassword, setShowPassword]= useState(false)
    const [showConfirmPassword, setShowConfirmPassword]= useState(false)
    const navigate=useNavigate();
    const initialValues={
		password: "",
        confirmpassword:"",
	  }
    const handleClickShowPassword = () => {
            setShowPassword(!showPassword)
          };
          const handleClickShowConfirmPassword = () => {
            setShowConfirmPassword(!showConfirmPassword)
          };            
    const handleChange = () => {
        setValidCheckbox(!validCheckbox);
    };
    const handleSubmit=async(password)=>{
        if(!person.id){
            const personToSave= await savePerson(person)
            const user= await saveUser(password, personToSave)
            if(user && user.loggedIn){
                setUser({...user})
                await navigate('/home')
               
            }else{
                await navigate('/login')
            }
        }else{
            const user=await saveUser(password, person)

            if(user && user.loggedIn){
                setUser({...user})
                await navigate('/home')
               
            }else{
                await navigate('/login')
            }
        }

    }
    const verifyPerson=()=>{
        if (!person.Nombres){
            return true
        }else{
            return false
        }}
    
    return (
        <Page>
         <div className="Register p-4">
        <Card className='validateinfo w-full sm:w-80 md:w-96 card'>
        <InfoPerson />

            <div className='px-8'>
            <Formik
			initialValues={initialValues}
			validationSchema={Yup.object({
				password:Yup
				  .string()
				  .min(6, 'La contraseña ingresada es demasiado corta')
				  .max(14, 'La contraseña ingresada es demasiado larga')
                  .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
                    "La contraseña debe contener al menos una letra Mayuscula, una minuscula y un número"
                  )
				  .required('Es necesario que crees una contraseña!'),
                confirmpassword: Yup
                .string()
                .required("Debes confirmar la contraseña")
                .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
			  })}
			onSubmit={async (values, actions) => {
				const vals=await {...values}
                console.log(vals)
                await handleSubmit(vals.password)
			  }}
			  >
			{({errors, isValid, touched, dirty})=>(
				<Form>
                    <FormGroup className='w-full text-xs mb-3'>
                    <FormControlLabel sx={{ '& .MuiFormControlLabel-label': { fontSize: 12 } }}control={<Checkbox disabled={verifyPerson()} checked={validCheckbox} onChange={handleChange}/>} label="Declaro que la información me pertenece" />
                    </FormGroup>
                <FormControl className='formInput w-full mt-4' variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Introduce tu contraseña</InputLabel>
                    <Field
                        id="password1"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        as={OutlinedInput}
                        label="Introduce tu contraseña"
                        disabled={!validCheckbox}
                        className='formInput w-full h-14'
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
                        <FormControl className='formInput w-full mt-4' variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Confirma tu contraseña</InputLabel>
       
                        <Field
                        id="password2"
                        name="confirmpassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        as={OutlinedInput}
                        label="Confirma tu contraseña"
                        disabled={!validCheckbox}
                        className='formInput w-full h-14'
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                edge="end"
                                >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        error={Boolean(errors.confirmpassword) && Boolean(touched.confirmpassword)}
                        >                  
                        </Field>
                        <FormHelperText error id="my-helper-text">{errors.confirmpassword}</FormHelperText>
					</FormControl>
					<Button 
					type='submit'
					disabled={!dirty || !isValid}
					variant="contained"
					className="bg-principal primary-button login-button">
					Registrarse
					</Button>
				</Form>
			)}
			</Formik>	
            </div>           
        </Card>
        </div>
        </Page>
  
    );
};

export default ValidateInfo;