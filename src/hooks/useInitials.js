import {  useEffect, useContext } from "react";
import { TicGeneration } from "../api";
import ValidationContext from "../context/ValidationContext";
import { AccountContext } from "../context/AccountContext";
const vehicleCtrl= new TicGeneration();

const useBusiness =() =>{
    const {addPerson,setTic, getRoles,newTic, setVehiclesRole, vehiclesRole, setHeadings, setRadioTaxis, setAsociacion,setSindicato, headings}= useContext(ValidationContext)
    const {user}= useContext(AccountContext);
    
    useEffect(()=>{
        async function vehiclesRenew(){
            try{
                const response=await vehicleCtrl.getVehicleRole()
                await localStorage.setItem('vehicles', JSON.stringify(response))
                await setVehiclesRole(response)
    
            }catch(error){
                throw error
            }
        }
        vehiclesRenew()
    },[vehiclesRole])
    useEffect(()=>{
        async function test2(){
            try{
                const response=await vehicleCtrl.getTic()
                await localStorage.setItem('tic', JSON.stringify(response))
                await setTic(response)
    
            }catch(error){
                throw error
            }
        }
        test2()
    },[newTic])
    useEffect(()=>{
        async function test3(){
            await addPerson(user.person)
            await getRoles()
            const headings= await vehicleCtrl.getHeadings()
            await setHeadings(headings)
        }
        async function test5(){
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
        test3();
        test5()
    },[]);

    
    return headings
    
}

export default useBusiness