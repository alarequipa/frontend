import {  useEffect, useContext } from "react";
import { TicGeneration } from "../api";
import ValidationContext from "../context/ValidationContext";
import { AccountContext } from "../context/AccountContext";
const vehicleCtrl= new TicGeneration();

const useBusiness =() =>{
    const {addPerson, getRoles,getTic,newTic, getVehicleRoles, vehiclesRole, setHeadings, setRadioTaxis, setAsociacion,setSindicato, headings}= useContext(ValidationContext)
    const {user}= useContext(AccountContext);
    const initialData=async()=>{
        await addPerson(user.person)
        await getRoles()
        const headings= await vehicleCtrl.getHeadings()
        await setHeadings(headings)
    }
    const getInitials= async()=>{
		try{            
			const response= await vehicleCtrl.getBusinesses()
            const radioTaxis = await response.filter((business)=>{
                return business.type.name.includes("RadioTaxi");
            })
            const sindicato = await response.filter((business)=>{
                return business.type.name.includes("Sindicato");
            })
            const asociacion = await response.filter((business)=>{
                return business.type.name.includes("Asociación de taxis / trufis");
            })
			await console.log(response, radioTaxis, sindicato, asociacion)

            await setRadioTaxis(radioTaxis)
            await setAsociacion(asociacion)
            await setSindicato(sindicato)

		}catch(error){
			console.log(error)
		}
	  }
    useEffect(()=>{
        async function vehiclesRenew(){
            await getVehicleRoles()
        }
        vehiclesRenew()
    },[vehiclesRole])
    useEffect(()=>{
        async function test2(){
            await getTic()
        }
        test2()
    },[newTic])
    useEffect(()=>{
        getInitials();
        initialData();
    },[]);

    
    return headings
    
}

export default useBusiness