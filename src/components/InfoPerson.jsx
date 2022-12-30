import React from 'react';
import { useContext } from 'react'
import PlaceIcon from '@mui/icons-material/Place';
import EventIcon from '@mui/icons-material/Event';
import BadgeIcon from '@mui/icons-material/Badge';
import { CircularProgress } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import ValidationContext from '../context/ValidationContext';
import profile from '../assets/img/profile.png'

const InfoPerson = ({isHome=false}) => {
    const {person, loading}=useContext(ValidationContext);

      
    return (
<>
        <div className="w-full px-4 lg:order-2 flex justify-center">
                <div className="relative felx flex-wrap">
                <div className="w-32 h-32 -mt-12 rounded-full overflow-hidden items-center">
                {person.Nombres ?(
                        <img
                        className="w-full h-full" 
                        src={`data:image/png;base64,${person.Fotografia}`}
                        alt="Profile"
                    />
                ):(
                    <img
                    className="w-full h-full" 
                    src={profile}
                    alt="Profile"
                />
                )}

                    </div>
                </div>
            </div>
        <div className="flex min-h-full items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="w-full text-center space-y-3">
          <div>
            {!isHome?(
                <h2 className="text-center text-xl font-bold tracking-tight text-principal">
            Verifica tu información
                </h2>
            ):
            <h2 className="text-center text-4xl font-semibold tracking-tight text-principal">
            Bienvenido
          </h2>}
           
          </div>

          <h2 className='text-base font-bold mb-2'>{person.Nombres} {person.PrimerApellido} {person.SegundoApellido}</h2>
          {!isHome?(
         
            <div className="text-center justify-evenly my-0 w-full">
        {person.Nombres ?(
            <>
             <div className='max-w-sm w-full'>
            <div className="text-sm mb-2 text-gray-700 font-medium flex items-center justify-start gap-2">
                <PlaceIcon fontSize="small" />
                {person.Domicilio}
            </div>
            <div className="text-sm  mb-1 text-gray-700 flex items-center justify-start gap-2">
            <EventIcon fontSize="small"/>
            {person.FechaNacimiento}
            </div>
            <div className=" text-sm mb-1 text-gray-700 flex items-center justify-start gap-2">
            <LocationCityIcon fontSize="small"/>
            {person.LugarNacimientoProvincia}, {person.LugarNacimientoDepartamento}, {person.LugarNacimientoPais}
            </div>
            </div>
  
            <div className='max-w-sm w-full'>
            <div className="text-sm mb-1 text-gray-700 flex items-center justify-start gap-2">
            {person.Genero==="MASCULINO" ? (
            <MaleIcon fontSize="small"/>
            ):<FemaleIcon fontSize="small"/>}      
            {person.Genero}
            </div>
            <div className="text-sm mb-1 text-gray-700 flex items-center justify-start gap-2">
            <BadgeIcon fontSize="small"/>
            {person.ProfesionOcupacion}
            </div>
            <div className="text-sm mb-1 text-gray-700 flex items-center justify-start gap-2">
            <BloodtypeIcon fontSize="small"/>
            {person.GrupoSanguineo}
            </div>
            </div>          
            </>           
            ):loading.person?(
                <div className='w-full'>
                <CircularProgress />
            </div>
            ):""}
            </div>
         
            ):
            <div className="text-center justify-evenly my-0 w-full lg:flex ">
            <div className='max-w-sm w-full lg:w-4/12'>
            <div className="text-sm mb-1 text-gray-700 font-medium flex items-center justify-start gap-2">
            <PlaceIcon fontSize="small" />
            {person.Domicilio}
            </div>
            <div className="mb-1 text-gray-700 flex items-center justify-start gap-2">
            <EventIcon fontSize="small"/>
            {person.FechaNacimiento}
            </div>
            <div className="text-sm mb-1 text-gray-700 flex items-center justify-start gap-2">
            <LocationCityIcon fontSize="small"/>
            {person.LugarNacimientoProvincia}, {person.LugarNacimientoDepartamento}, {person.LugarNacimientoPais}
            </div>
            </div>

            <div className='max-w-sm w-full lg:w-4/12'>
            <div className="text-sm mb-1 text-gray-700 flex items-center justify-start gap-2">
            {person.Genero==="MASCULINO" ? (
            <MaleIcon fontSize="small"/>
            ):<FemaleIcon fontSize="small"/>}      
            {person.Genero}
            </div>
            <div className="text-sm mb-1 text-gray-700 flex items-center justify-start gap-2">
            <BadgeIcon fontSize="small"/>
            {person.ProfesionOcupacion}
            </div>
            <div className="text-sm mb-1 text-gray-700 flex items-center justify-start gap-2">
            <BloodtypeIcon fontSize="small"/>
            {person.GrupoSanguineo}
            </div>
            </div>


          
        </div>}

        </div>
      </div>
</>
        

    );
};

export default InfoPerson;