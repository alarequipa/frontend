import React, { useContext } from 'react';
import {TextField,FormControl } from '@mui/material';
import ValidationContext from '../context/ValidationContext';

const VehicleFinder = () => {
    const {findVehicleByPlaque, vehicleToFind,vehicles, verifyVehicle, setVehicleToSave, setVehicleToFind, addVehicle}=useContext(ValidationContext)
  
    const handleChange =  (prop) => (event) => {
        setVehicleToFind({ ...vehicleToFind, [prop]: event.target.value.toUpperCase()});
       };
    const handleSubmit=async (event)=>{
        event.preventDefault();
		if(vehicleToFind.Identificador){
            const vehicleSaved= await findVehicleByPlaque(vehicleToFind.Identificador)
            if(await vehicleSaved){
                let vehicleToSave1={
                    id:vehicleSaved._id,
                    color:vehicleSaved.color,
                    brand:vehicleSaved.brand,
                    type:vehicleSaved.type,
                    photography:vehicleSaved.vehiclePhotos[0].image,
                    plaque:vehicleSaved.plaque
                }
               await setVehicleToSave(vehicleToSave1)
               await addVehicle(vehicleSaved)
               await localStorage.setItem("vehicles", JSON.stringify([vehicles]))
               console.log("encontrado en tu base de datos")
            }else{
                const validVehicle= await verifyVehicle(vehicleToFind)
                if(validVehicle){
                    console.log("desde anh")
                }
            }
		    // const vehicle1= validVehicle.oResultado[0];
            // setVehicleToFind({ ...vehicleToFind, vehicle1 })
            // let vehicleToSave1={
            //     color:vehicle1.color,
            //     brand:vehicle1.marca,
            //     type:vehicle1.clase,
            //     photography:vehicle1.imagenRegistro,
            //     plaque:vehicleToFind.Identificador
            // }
            // setVehicleToSave(vehicleToSave1)
		}else{
			console.log("esta mal")
		}
	}
    return (
        <>
         <div  className="form pt-3" >
			
            <FormControl className='formInput' variant="outlined">
            <TextField
                name="placa"
                id="placa"
                type="text"
                label="Introduce tu Placa `123ABC`"
                onChange={handleChange('Identificador')}
                InputLabelProps={{
                    shrink: true,
                }}
                />
    
            </FormControl>
       
            <button 
            onClick={handleSubmit}
            className="bg-principal mb-1 primary-button login-button">
            Buscar
            </button>
 
        </div>
    
        </>
    );
};

export default VehicleFinder;