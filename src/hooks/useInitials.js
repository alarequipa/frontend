import { useEffect, useContext, useCallback } from "react";
import ValidationContext from "../context/ValidationContext";
import { AccountContext } from "../context/AccountContext";
import { TicGeneration } from "../api";

const vehicleCtrl= new TicGeneration();
const useBusiness =() =>{
    const {addPerson, getRoles,getTic,setVehiclesRole,reload, getBusinesses, qrcode, getHeadings, headings}= useContext(ValidationContext)
    const {user}= useContext(AccountContext);
    const initialData = useCallback(async () => {
        await addPerson(user.person)
        await getRoles()
        await getHeadings()
 //eslint-disable-next-line react-hooks/exhaustive-deps
        }, [reload]);
    
    useEffect(()=>{
            async function businessRenew(){
                await console.log("ejecutado3")
                await getBusinesses()
            }
            businessRenew()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[reload])
    
    useEffect(()=>{
        async function vehiclesRenew(){
            await console.log("ejecutado2")
            const vehicles=await vehicleCtrl.getVehicleRole(user.token)
            await setVehiclesRole(vehicles)
        }
        vehiclesRenew()
         //eslint-disable-next-line react-hooks/exhaustive-deps
    },[reload])

    useEffect(()=>{
        async function test2(){
            await console.log("ejecutado")
            await getTic()
        }
        test2()
         //eslint-disable-next-line react-hooks/exhaustive-deps
    },[qrcode])

    useEffect(()=>{
        initialData();
     //eslint-disable-next-line react-hooks/exhaustive-deps
    },[initialData]);
    
    return headings
    
}

export default useBusiness