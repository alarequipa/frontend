import React, {useContext} from 'react';
import { Card, Button, IconButton, FormControl,CircularProgress,TextField } from '@mui/material';
import ValidationContext from '../context/ValidationContext';
import { Delete, Edit, WhatsApp, Image, Send, AlternateEmail, Store, Work, Public} from '@mui/icons-material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PlaceIcon from '@mui/icons-material/Place';
import VehicleInfoResume from '../components/VehicleInfoResume';

import {useParams, useNavigate } from 'react-router-dom';

import { useState } from 'react';
const BusinessInfo = () => {
  const {id}= useParams();
  const navigate = useNavigate();

  const [image,setImage]= useState("");
  const [edit, setEdit]=useState(false);

  const {loadingBusiness, deleteBusiness,updateBusiness, uploadBusinessImage, setSelectedBusiness, selectedBusiness}=useContext(ValidationContext)
  const handleChangeEdit =(prop)=>(event) => {
    setSelectedBusiness({...selectedBusiness,[prop]: event.target.value})
     };
    const saveBusiness=async()=>{
        await updateBusiness(id, selectedBusiness)
        await setEdit(false)
        console.log(selectedBusiness)
    }
    const deleteBusinessClick=async()=>{
      await deleteBusiness(id)
      await navigate("/business")
    }
  const handleChange= async(event)=>{
      console.log(event.target.files)
      setImage(event.target.files[0])

    }
    const handleEdit=async()=>{
      await setEdit(true)
    }
    const handleUpload= async()=>{   
        const formData= await new FormData()
        await formData.append('image', image)
        await uploadBusinessImage(formData, id)
        await setImage("")
    }
    return (
      <>
            <div className=" bg-blue-400 px-3 w-full h-14 md:h-24" />
		  <div className='px-3 -my-12 md:px-8 w-full mb-7 what flex flex-wrap'>
        <Card className='w-full cardBusiness my-2 overflow-hidden rounded-3xl'>
            <div className="relative flex flex-col flex-auto min-w-0 p-4 mx-3 md:mx-6 overflow-hidden break-words  border-0 dark:bg-slate-850 dark:shadow-dark-xl shadow-3xl rounded-2xl bg-clip-border"> 
            <div className="flex flex-wrap ">
            <div className="flex flex-wrap justify-start w-full md:w-6/12">
            <div className="flex-none w-auto px-3"> 
            <div className="relative inline-flex items-center justify-center text-white transition-all duration-200 ease-in-out text-base h-24 w-24 overflow-hidden rounded-xl">

                    <img  alt="business_image" src={`http://157.245.132.21:3003/uploads/business/image/${selectedBusiness.image}`} className="max-w-none w-full absolute shadow-2xl rounded-xl" />
                </div>
                </div>
      <div className="flex flex-row justify-start w-auto max-w-full ml-6 my-auto">
              <div className="h-full">
                <h5 className="font-bold mb-1 text-principal text-xl uppercase dark:text-white">{selectedBusiness.businessName}</h5>
                <p className="mb-0 font-medium leading-normal dark:text-white dark:opacity-60 text-sm">{selectedBusiness.type.name}</p>
                <p className="mb-0 font-medium leading-normal dark:text-white dark:opacity-60 text-lg">
                  <WhatsApp className='mr-2 text-green-500'/> 
                  {selectedBusiness.whatsapp}
                  </p>

              </div>
            </div>
            </div>
            <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-4/12">
              <div className="relative right-0">
                <ul className="relative flex flex-wrap p-1 list-none bg-gray-50 rounded-xl" >
                  <li className="z-30 flex-auto text-center">
                    <IconButton onClick={()=>{handleEdit()}} color="primary" aria-label="add to shopping cart">
                    <Edit/>
                    </IconButton>
   
                  </li>
                  <li className="z-30 flex-auto text-center">
                  <IconButton onClick={()=>{deleteBusinessClick()}} color="warning" aria-label="add to shopping cart">
                    <Delete />
                    </IconButton>
            
                  </li>
                  <li className=" z-30 flex-auto text-center">
                  {(image && image!=="")?"":(
                    <>
                    <Button variant="contained" component="label" color="success">
                    <Image/>
                      Subir Imagen
                      <input hidden onChange={handleChange} accept="image/*" type="file" />
                    </Button>
            
                    </>
                  )}
             
                  </li>
                  {(image && image!=="")?(
                      <li className=" z-30 flex-auto mt-3 text-center">  
                      Imagen a subir: {image.name}
                      <Button onClick={()=>handleUpload()} variant="contained" component="label" >
                      <Send/>
                        Enviar Imagen
                      </Button>  
                    </li>
                      ):""}
                </ul>
              </div>
            </div>  
            </div>
            </div> 
      </Card> 
      </div>
      <div className='w-full px-3 md:px-8 mb-10 flex flex-wrap justify-between'>
        <div className='w-full md:pr-4 mb-10 lg:w-4/12'>
            <Card className='w-full p-4 md:p-7'>
            <h2 className='text-xl font-bold mb-4 uppercase'>Información de la empresa o sindicato</h2>
     
       <div className="text-center justify-evenly my-0 w-full">

       {!edit ?(
                      <div className='max-w-sm w-full'>
                      <div className="mb-3 text-gray-700 flex items-center justify-start gap-2">
                      <Store fontSize="medium" className='mr-2 ticCarColorText'/>
                         <h4 className="font-bold">Nombre:</h4> 
                         <span>{selectedBusiness.businessName} </span> 
                      </div>
                      <div className="mb-3 text-gray-700 flex items-center justify-start gap-2">
                      <Work fontSize="medium" className='mr-2 ticCarColorText'/>
                      <h4 className="font-bold">Tipo:</h4> 
                      <span>{selectedBusiness.type.name} </span> 
                      </div>
                      <div className="mb-3 text-gray-700 flex items-center justify-start gap-2">
                      <AlternateEmail className='mr-2 ticCarColorText'/>
                      <h4 className=" font-bold">Correo:</h4> 
                         <span>{selectedBusiness.email} </span> 
                      </div>
                      <div className="mb-3 text-gray-700 flex items-center justify-start gap-2">
                      <LocationCityIcon className='mr-2 ticCarColorText'/>
                      <h4 className="font-bold">Dirección:</h4> 
                      <span>{selectedBusiness.address} </span> 
                      </div>
                      <div className="mb-3 text-gray-700 flex items-center justify-start gap-2">
                      <PlaceIcon className='mr-2 ticCarColorText'/>
                      <h4 className="font-bold">Ciudad:</h4> 
                      
                      <span>{selectedBusiness.city} </span> 
                      </div>
                      <div className="mb-3 text-gray-700 flex items-center justify-start gap-2">
                      <Public className='mr-2 ticCarColorText'/>
                      <h4 className="font-bold">País:</h4> 
                         <span>{selectedBusiness.country} </span> 
                      </div>
                      <div className="mb-3 text-gray-700 flex items-center justify-start gap-2">
                      <WhatsApp className='mr-2 text-green-500'/> 
                      <h4 className="font-bold">Whatsapp:</h4> 
                         <span>{selectedBusiness.whatsapp} </span> 
                      </div>
                      </div>     
       ):(
         <div className='w-full'>
         {!loadingBusiness?(
              <>  
         <div className="mb-3 text-gray-700 w-full flex flex-wrap items-center justify-start">
           <div className='flex flex-wrap mb-3 justify-start w-full lg:w-5/12'>
           <Store fontSize="medium" className='mr-2 ticCarColorText'/>
            <h4 className="font-bold ">Nombre:</h4> 
           </div>
         
            <FormControl className='formInput w-full lg:w-7/12' variant="outlined">
           <TextField
             name="businessName"
             id="businessName"
             label="Nombre"
             type="text"
             disabled
             value={selectedBusiness.businessName}
             InputLabelProps={{
               shrink: true,
             }}
             />
           </FormControl>
         </div>
         <div className="mb-3 text-gray-700 flex items-center justify-start gap-2">
         <div className='flex flex-wrap mb-3 justify-start w-full  lg:w-5/12'>

         <Work fontSize="medium" className='mr-2 ticCarColorText'/>
         <h4 className="font-bold">Tipo:</h4> 
             </div>
         <FormControl className='formInput w-full lg:w-7/12' variant="outlined">
           <TextField
             name="type"
             id="type"
             label="Tipo"
             type="text"
             disabled
             value={selectedBusiness.type.name}
             InputLabelProps={{
               shrink: true,
             }}
             />
           </FormControl>
         
         </div>
         <div className="mb-3 text-gray-700 flex items-center justify-start gap-2">
         <div className='flex flex-wrap mb-3 justify-start w-full  lg:w-5/12'>
         <AlternateEmail className='mr-2 ticCarColorText'/>
         <h4 className=" font-bold">Correo:</h4> 
         </div>
            <FormControl className='formInput w-full lg:w-7/12' variant="outlined">
           <TextField
             name="email"
             id="email"
             label="Correo"
             type="email"
             onChange={handleChangeEdit('email')}
             value={selectedBusiness.email}
             InputLabelProps={{
               shrink: true,
             }}
             />
           </FormControl>
         </div>
         <div className="mb-3 text-gray-700 flex items-center justify-start gap-2">
         <div className='flex flex-wrap mb-3 justify-start w-full  lg:w-5/12'>
         <LocationCityIcon className='mr-2 ticCarColorText'/>
         <h4 className="font-bold">Dirección:</h4> 
         </div>
         <FormControl className='formInput w-full lg:w-7/12' variant="outlined">
           <TextField
             name="address"
             id="address"
             label="Dirección"
             type="text"
             onChange={handleChangeEdit('address')}
             value={selectedBusiness.address}
             InputLabelProps={{
               shrink: true,
             }}
             />
           </FormControl>
         </div>
         <div className="mb-3 text-gray-700 flex items-center justify-start gap-2">
         <div className='flex flex-wrap mb-3 justify-start w-full  lg:w-5/12'>
         <PlaceIcon className='mr-2 ticCarColorText'/> 
         <h4 className="font-bold">Ciudad:</h4> 
         </div>

         <FormControl className='formInput w-full lg:w-7/12' variant="outlined">
           <TextField
             name="city"
             id="city"
             label="Ciudad"
             type="city"
             onChange={handleChangeEdit('city')}
             value={selectedBusiness.city}
             InputLabelProps={{
               shrink: true,
             }}
             />
           </FormControl>
         </div>
         <div className="mb-3 text-gray-700 flex items-center justify-start gap-2">
         <div className='flex flex-wrap mb-3 justify-start w-full  lg:w-5/12'>
         <Public className='mr-2 ticCarColorText'/> 
         <h4 className="font-bold">País:</h4> 
         </div>

            <FormControl className='formInput w-full lg:w-7/12' variant="outlined">
           <TextField
             name="country"
             id="country"
             label="País"
             type="country"
             onChange={handleChangeEdit('country')}
             value={selectedBusiness.country}
             InputLabelProps={{
               shrink: true,
             }}
             />
           </FormControl>
         </div>
         <div className="mb-3 text-gray-700 flex items-center justify-start gap-2">
         <div className='flex flex-wrap mb-3 justify-start w-full  lg:w-5/12'>
         <WhatsApp className='mr-2 text-green-500'/> 
         <h4 className="font-bold">Whatsapp:</h4> 
         </div>
            <FormControl className='formInput w-full lg:w-7/12' variant="outlined">
           <TextField
             name="whatsapp"
             id="whatsapp"
             label="Whatsapp"
             type="whatsapp"
             onChange={handleChangeEdit('whatsapp')}
             value={selectedBusiness.whatsapp}
             InputLabelProps={{
               shrink: true,
             }}
             />
           </FormControl>
         </div>
           <div className='w-full flex flex-wrap justify-around'>
           <Button className='w-5/12' onClick={()=>{setEdit(false)}}variant="contained" component="label" color="warning">
                      Cancelar
               </Button>
           <Button className='w-5/12' onClick={()=>{saveBusiness()}}variant="contained" component="label" color="success">
                      Guardar
               </Button>
           </div>
           </>
            ):(
              <div className='w-full'>
               <CircularProgress />
              </div>
            )} 
         </div>     
       )}
       </div>


            </Card>
        </div>
        <div className='w-full md:pl-4 lg:w-8/12'>
          <Card className='w-full p-4 md:p-7'>
            <h2 className='text-xl font-bold mb-4 uppercase'>Solicitudes de afiliación</h2>     
            {(selectedBusiness.vehicles && selectedBusiness.vehicles.length>0)?(
            <div className="text-center flex flex-wrap justify-evenly my-0 w-full">
            {selectedBusiness.vehicles.map(vehicle=>(
            <Card key={vehicle._id} className='w-full md:w-6/12 my-2 overflow-hidden rounded-3xl'>
            <div className="relative flex flex-col flex-auto min-w-0 p-4 mx-3 md:mx-6 overflow-hidden break-words bg-white border-0 dark:bg-slate-850 dark:shadow-dark-xl shadow-3xl rounded-2xl bg-clip-border"> 
            <div className="flex flex-wrap -mx-3">
            <div className="flex-none w-auto px-3"> 
            <div className="relative inline-flex items-center justify-center text-white transition-all duration-200 ease-in-out text-base h-24 w-24 overflow-hidden rounded-xl">
                    <img src={`data:image/png;base64,${vehicle.vehicleId.vehiclePhotos[0].image}`} alt="profile_image" className="max-w-none w-40 -top-10 -left-7 absolute shadow-2xl rounded-xl" />
                </div>
                </div>
                    <VehicleInfoResume vehicle={vehicle} isBusiness={true}></VehicleInfoResume>

                </div>
            </div>
            </Card> 
        ))}      
      
            </div>
            ):(
              <div className='h-full flex flex-col justify-evenly'>
              <h2 className="text-center text-xl font-semibold tracking-tight text-principal">
              Actualmente no cuentas con ninguna solicitud
              </h2>                       
              </div> 
            )}
            </Card>
        </div>

      </div>

      </>
    );
};

export default BusinessInfo;