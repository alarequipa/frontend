import { useState, useContext } from "react";
import {initialState} from "../initialstate";
import { MainApi, Validations, TicGeneration } from "../api";
import { Storage } from "../services/storage";
import QRCode from 'qrcode';
import Swal from 'sweetalert2';
import { AccountContext } from "../context/AccountContext";
const apiCtrl= new MainApi();
const validationsCtrl= new Validations();
const vehicleCtrl= new TicGeneration();
const storageCtrl= new Storage();
const useValidations = () => {   
    const {user}= useContext(AccountContext);
    const [state, setState]= useState(initialState);  
    const [person, setPerson]=useState('');
    const [vehicles, setVehicles]= useState([]);
    const [vehiclesRole, setVehiclesRole]= useState([]);
    const [selectedTic, setSelectedTic]=useState('');
    const [selectedBusiness, setSelectedBusiness]=useState('');
    const [loadingBusiness, setLoadingBusiness]= useState(false);
    const [tic, setTic]=useState('');
    const [newTic, setNewTic]=useState('');
    const [cudap, setCudap]=useState('')
  	const [vehicleToSave, setVehicleToSave]=useState('')
    const [role, setRole]= useState('');
    const [rubro, setRubro] = useState('');
    const [radicatoria, setRadicatoria] = useState('');
	const [empresa, setEmpresa] = useState('');
    const url = `${process.env.REACT_APP_SERVER_URL}tic/`
    const [headings, setHeadings]=useState([])
    const [radioTaxis, setRadioTaxis]=useState([])
    const [asociacion, setAsociacion]=useState([])
    const [sindicato, setSindicato]=useState([])
    const [date, setDate]=useState("");
    const [reload, setReload]=useState(false);



    const [qrcode, setQrcode]= useState('')

	const [relacion, setRelacion] = useState({
	  conductor: false,
	  propietario: false,
	});  
    const [loading, setLoading]=useState({
		vehicle:false,
		person:false,
        user:false,
        business:false
	})
	const [error,setError]= useState({
		message:"",
		status:false
	})
    const GenerateQRCode=async(param)=>{
        let urlCode= await url+param
        await console.log(urlCode)
        await QRCode.toDataURL(urlCode, (err,url)=>{
          if(err) return console.log(err)
          setQrcode(url)
        })
      }

    const addPerson= (payload)=>{
        setPerson(payload)
	}
    const addLogedUser=payload=>{
        setState({
            ...state,
            logedUser:payload
        })
    }
    const addRole=payload=>{
        setState({
            ...state,
            role:payload
        })
    }
	const addVehicle=payload=>{
		setVehicles([
            ...vehicles,
			payload
        ])
	}
    const addTic=payload=>{
		setTic([
            ...tic,
			payload
        ])
	}
    const[vehicleToFind, setVehicleToFind]=useState({
		Identificador:'',
		SubIdentificador: '0'
	});
    // PERSON AND USERS
	const getPersonByCi= async(ci)=>{
        try {
            setLoading({
                ...loading,
                person:true
            });
            const response= await apiCtrl.findPersonCI(ci)

			await addPerson(response)
			await localStorage.setItem("person", JSON.stringify(response))
			return response
        } catch (error) {
            setError({
                message:error.message,
                status:true
            })
        } finally {
            setLoading({
                ...loading,
                person:false
            });
        }
    }
    const verifyPerson= async(personFind)=>{
        try {
            setLoading({
                ...loading,
                person:true
            });
            const response= await validationsCtrl.verifyPerson(personFind);
            if(response.person.respuesta)throw response
			await addPerson(response.person)
			return response

        } catch (error) {
            console.log(error)
            setError({
                message:error.person.respuesta,
                status:true
            })

        } finally {
            setLoading({
                ...loading,
                person:false
            });
        }
    }

	const savePerson= async(body)=>{
		try {
			setLoading({
                ...loading,
                person:true
            });
			const response=await apiCtrl.savePerson(body)
			await addPerson(response)
            return response
		} catch (error) {
			setError({
                message:error.message,
                status:true
            })
            console.log(error)
		} finally {
            setLoading({
                ...loading,
                person:false
            });
        }
	}
    const saveUser= async(password,person)=>{
        try {
			const response=await apiCtrl.createuser(password,person)
            await localStorage.setItem("token", response.token)
            await storageCtrl.saveStorage(response.person, response.user, response.role)
            await addPerson(response.person)
            console.log(response)
            return response

    	} catch (error) {
            setError({
                message:error.message,
                status:true
            })
            Swal.fire({
                title: 'Error!',
                text: `${error.message}, por favor ingresa con tu carnet y contraseña`,
                icon: 'error',
                confirmButtonText: 'ok',
                confirmButtonColor:'#42a5f5'
              })
            return error
		} finally {
            console.log("ok")
        }
    }
    const login= async(body)=>{
		try {
			setLoading({
                ...loading,
                user:true
            });
			const response=await apiCtrl.login(body)
            await localStorage.setItem("token", response.token)
            await storageCtrl.saveStorage(response.person, response.user, response.roles, "","")
            await addRole(response.roles)
            if(response.roles.owner || response.roles.driver){
                console.log("aqui llego")
                const vehicleRoles= await vehicleCtrl.getVehicleRole(user.token);
                const ticFinded= await vehicleCtrl.getTic(user.token);
                await setTic(ticFinded);
                await setVehiclesRole(vehicleRoles);                
                await storageCtrl.saveStorage("","","",vehicleRoles, ticFinded);
            }
            return response
		} catch (error) {
			setError({
                message:error.message,
                status:true
            })
		} finally {
            setLoading({
                ...loading,
                user:false
            });
        }
	}
    const loginEmail= async(body)=>{
		try {
			setLoading({
                ...loading,
                user:true
            });
			const response=await apiCtrl.loginEmail(body)
            console.log(response)
            await storageCtrl.saveStorage("", response.user, response.roles, "", "")
            await addRole(response.roles)
            return response
		} catch (error) {
			setError({
                message:error.message,
                status:true
            })
		} finally {
            setLoading({
                ...loading,
                user:false
            });
        }
	}
    const logout= async()=>{
		try {
			setLoading({
                ...loading,
                user:true
            });
			const response=await apiCtrl.logout()
            return response
		} catch (error) {
			setError({
                message:error.message,
                status:true
            })
		} finally {
            setLoading({
                ...loading,
                user:false
            });
        }
	}
    const getRoles=async()=>{
        try{
            const response=await apiCtrl.getRole(user.token)
            await localStorage.setItem('role', JSON.stringify(response))
            await setRole(response)
            await setState({
                ...state,
                roles:response
            })
        }catch(error){
            throw error
        }
    }
    
    const loadStorage=async()=>{
        try{
          const store=await storageCtrl.loadStorage();
          await addPerson(store.person)
          await setVehiclesRole(store.vehicles)
          await setTic(store.tic)
          console.log(store)
          return store
        }catch(error){
            await console.log(error)
        }
    }


    // VEHICLES
    const saveVehicle= async(body)=>{
		try {
			setLoading({
                ...loading,
                vehicle:true
            });
			const response=await vehicleCtrl.saveVehicle(user.token, body)
             let vehicleToSave1={
                    id:response._id,
                    color:response.color,
                    brand:response.brand,
                    type:response.type,
                    photography:response.vehiclePhotos[0].image,
                    plaque:response.plaque
                }
               await setVehicleToSave(vehicleToSave1)
               console.log(response)
               await addVehicle(response)
               await localStorage.setItem("vehicles", JSON.stringify([vehicles]))
               return response
		} catch (error) {
			setError({
                message:error.message,
                status:true
            })
		} finally {
            setLoading({
                ...loading,
                vehicle:false
            });
        }
	}
    const verifyVehicle= async(vehicleFind)=>{
        try {
            setLoading({
                ...loading,
                vehicle:true
            });
            const response= await validationsCtrl.verifyVehicle(vehicleFind);
            if(response.respuesta)throw response
            const vehicle1= response.oResultado[0];
            await setVehicleToFind({ ...vehicleToFind, vehicle1 })
            let vehicleToSave1={
                color:vehicle1.color,
                brand:vehicle1.marca,
                type:vehicle1.clase,
                photography:vehicle1.imagenRegistro,
                plaque:vehicleToFind.Identificador
            }
            await setVehicleToSave(vehicleToSave1)
   			return response

        } catch (error) {
            setError({
                message:error.respuesta,
                status:true
            })

        } finally {
            setLoading({
                ...loading,
                vehicle:false
            });
        }
    }
	const findVehicleByPlaque= async(plaque)=>{
        try {
            setLoading({
                ...loading,
                vehicle:true
            });
            const response= await vehicleCtrl.findVehicle(plaque)
           return response
        } catch (error) {

            setError({
                message:error.message,
                status:true
            })
        } finally {
            setLoading({
                ...loading,
                vehicle:false
            });
        }
    }


//DRIVERS AND OWNERS
    const saveDriver=async(vehicleToSave, heading, business, radicatory)=>{
        let vehicle=""
        try{
            console.log(vehicleToSave)
            const response=await vehicleCtrl.saveDriver(user.token, vehicleToSave, heading, business, radicatory)
            vehicle=response
        }catch(error){
            throw error
        }finally{
            if(business || business!==""){
                await vehicleCtrl.updateBusinessVehicles(vehicle._id, business._id)
            }
            await getVehicleRoles()

        }
    } 
    const saveOwner=async(vehicleToSave, heading, business, radicatory)=>{
        let vehicle=""
        try{
            console.log(vehicleToSave)
            const response=await vehicleCtrl.saveOwner(user.token, vehicleToSave, heading, business, radicatory)
            console.log(response)
            vehicle=response
        }catch(error){
            throw error
        }finally{
            if(business || business!==""){
                await vehicleCtrl.updateBusinessVehicles(vehicle._id, business._id)
            }
            await getVehicleRoles()


        }
    } 
    const saveTic=async(vehicle)=>{
        try{
            const response=await vehicleCtrl.saveTic(user.token, vehicle)
            await addTic(response.tic)
            await localStorage.setItem('tic', JSON.stringify(response.tic))
            console.log(response)
            await GenerateQRCode(response.tic._id)
            return response.tic            
        }catch(error){
            throw error
        }
    } 

    const getTic=async()=>{
        try{
            console.log(vehicleToSave)
            const response=await vehicleCtrl.getTic(user.token)
            await localStorage.setItem('tic', JSON.stringify(response))
            await setTic(response)

        }catch(error){
            throw error
        }
    } 
    const updateTic=async(id)=>{
        try{
            console.log(qrcode);
            const response=await vehicleCtrl.updateTic(id, qrcode)
            setNewTic(response)
        }catch(error){
            throw error
        }

    }
    const printTic=async(id)=>{
        try{
            const response=await vehicleCtrl.printTic(id)
            return response
        }catch(error){
            throw error
        }

    }
    const verifyQr=async(id)=>{
        if(qrcode!==''){
            await updateTic(id)
        }else{
            try{
                await GenerateQRCode(id)
            }catch(error){
                throw(error)
            }finally{
                await updateTic(id)
            }
        }
    }
    const findTicByPlaque= async(plaque)=>{
        try {

            const response= await vehicleCtrl.findTicByPlaque(plaque)
           return response
        } catch (error) {

            setError({
                message:error.message,
                status:true
            })
        } 
    }

    const findTicByCi= async(ci)=>{
        try {

            const response= await vehicleCtrl.findTicByCi(ci)
           return response
        } catch (error) {
            setError({
                message:error.message,
                status:true
            })
        } 
    }
    
//VEHICLEROLES
    const activateVehicle=async(id)=>{
        try{
            const response=await vehicleCtrl.activateVehicle(user.token, id)
            console.log(response);
        }catch(error){
            throw error
        }
    }
    const getVehicleRoles=async()=>{
        try{
            const response=await vehicleCtrl.getVehicleRole(user.token)
            await localStorage.setItem('vehicles', JSON.stringify(response))
            console.log(response)
            await setVehiclesRole(response)
            return response
        }catch(error){
            throw error
        }
    } 
    const deleteVehicleRole=async(id)=>{
        try{
            const response=await vehicleCtrl.deleteVehicleRole(id)
            console.log(response);
        }catch(error){
            throw error
        }
    }

    const getVehicleRolesById=async(id)=>{
        try{
            const response=await vehicleCtrl.getVehicleRoleById(id)
            return response
        }catch(error){
            throw error
        }
    } 

// RUBROS
const getHeadings= async()=>{
		try{
			const response= await vehicleCtrl.getHeadings()
			await console.log( await response)
            await localStorage.setItem('headings', JSON.stringify(response))
            await setHeadings(response)
		}catch(error){
			console.log(error)
		}
	  }

//BUSINESS
const getBusinesses= async()=>{
    try{
        const response= await vehicleCtrl.getBusinesses()
        if(response && response!=="" && response.length >=1){
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
        }
    }catch(error){
        console.log(error)
    }
  }

const saveBusiness=async(business, rubro)=>{
    try{
        const response=await vehicleCtrl.saveBusiness(user.token,business,rubro._id)
        await setEmpresa(response.business)
        return response.business            
    }catch(error){
        throw error
    }finally{
        await setReload(!reload)
        await getRoles()
    }
} 
const updateBusiness=async(id, business)=>{
    try{
        await setLoadingBusiness(true)
        const response=await vehicleCtrl.updateBusiness(user.token, id, business)
        return response.business            
    }catch(error){
        throw error
    }finally{
        await getRoles()
        await setLoadingBusiness(false)
    }
} 
const updateBusinessVehicles=async(id)=>{
    try{
        const response=await vehicleCtrl.updateBusinessVehicles(id)
        return response            
    }catch(error){
        throw error
    }
}
const deleteBusiness=async(id)=>{
    try{
        const response=await vehicleCtrl.deleteBusiness(user.token, id)     
        return response  
    }catch(error){
        throw error
    }finally{
        await getRoles()
    }
} 
const verifyVehicleBusiness=async(id)=>{
    try{
        const response=await vehicleCtrl.verifyVehicleBusiness(id)       
        return response
    }catch(error){
        throw error
    }finally{
        await getRoles()
    }
}
//TIC
const getTicById=async(id)=>{
    try{
        const response=await vehicleCtrl.getTicById(id)
        return response
    }catch(error){
        throw error
    }
} 
//CUDAP
      const verifyCudap=async(codigo)=>{
        try{
            const response= await validationsCtrl.verifyCudap(codigo)
            setCudap(response.status)
            await console.log(response)
        }catch(error){
            console.log(error)
        }
      }
//DOCUMENTS

      const uploadBusinessImage=async(data, id)=>{
        try{
            console.log(data)
            const response = await vehicleCtrl.uploadBusinessImage(data, id)
            await console.log(response)
        }catch(error){
            console.log(error)
        }

      }
 
    return {
        cudap,
        setState,
        person,
        vehicles,
		error,
		setError,
        rubro,
		setRubro,
		empresa,
		setEmpresa,
		relacion, 
		setRelacion,
        vehicleToSave,
        setVehicleToSave,
        vehicleToFind,
        setVehicleToFind,
        setVehiclesRole,
        vehiclesRole,
        saveVehicle,
        loading,
        setLoading,
        addPerson,
        addVehicle,
        state,
		verifyPerson,
		getPersonByCi,
		savePerson,
		verifyVehicle,
        saveUser,
        tic,
        role,
        setRole,
        addRole,
        addLogedUser,
        loadStorage,
        headings,
        setHeadings,
        radicatoria,
        setRadicatoria,
        getHeadings,
        login,
        loginEmail,
        logout,
        saveOwner,
        saveDriver,
        saveTic,
        setReload,
        reload,
        getBusinesses,
        getTic,
        getVehicleRolesById,
        getTicById,
        getVehicleRoles,
        deleteVehicleRole,
        verifyCudap,
        updateBusinessVehicles,
        selectedTic,
        newTic,
        setSelectedTic,
        qrcode,
        setQrcode,
        updateTic,
        printTic,
        activateVehicle,
        saveBusiness,
        getRoles,
        uploadBusinessImage,
        updateBusiness,
        loadingBusiness,
        setLoadingBusiness,
        deleteBusiness,
        radioTaxis,
        setRadioTaxis,
        asociacion,
        setAsociacion,
        sindicato,
        setSindicato,
        verifyQr,
        verifyVehicleBusiness,
        findTicByPlaque,
        findTicByCi,
        findVehicleByPlaque,
        selectedBusiness,
        date,
        setDate,
        setSelectedBusiness
    }

};

export default useValidations;