import React, { useContext, useState } from 'react';
import { Card,TextField, Button, Box, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { RemoveRedEye } from '@mui/icons-material';
import ValidationContext from '../context/ValidationContext';
import { useNavigate } from 'react-router-dom';

const Polices =  () => {
    const navigate = useNavigate();
    const {findTicByPlaque, findTicByCi, setSelectedTic}=useContext(ValidationContext)
    const [ticFinded, setTicFinded]=useState('')
    const [plaque, setPlaque]=useState('')
    const [ci, setCi]=useState('')
    const handleChange = (event) => {
        setPlaque(event.target.value);
      };


      const handleChangeCi = (event) => {
        setCi(event.target.value);
      };
      const testCi=async ()=>{
        const finded= await findTicByCi(ci)
        if (finded && finded!==""){
         await setTicFinded(finded)
         console.log(plaque, finded )
        }else{
         await setTicFinded("notFinded")
        }
     }
    const test=async ()=>{
       const finded= await findTicByPlaque(plaque)
       if (finded && finded!==""){
        await setTicFinded(finded)
        console.log(plaque, finded )
       }else{
        await setTicFinded("notFinded")
       }
    }
    const handleClick =async (ticValue) => {
        await setSelectedTic(ticValue)
        await navigate(`/home/tic/${ticValue._id}?computer=computer&role=police`)
         };
	return (
<>
<div className="px-3 md:px-8 h-16 " />
		<div className='px-3 md:px-8 w-full mb-10 flex flex-wrap justify-evenly'>
        <Card className='w-full my-2 overflow-hidden rounded-3xl'>
        <div className="relative flex flex-col flex-auto min-w-0 p-4 mx-3 md:mx-6 overflow-hidden break-words bg-white border-0 dark:bg-slate-850 dark:shadow-dark-xl shadow-3xl rounded-2xl bg-clip-border"> 
            <div className="w-full flex flex-wrap">
            <Box className='w-full md:w-6/12' sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField className='w-10/12' onChange={handleChange} id="input-plaque" label="Busca la Placa" variant="standard" />
                <Button onClick={()=>test()} color="success">
                    Buscar
                    </Button>  
            </Box>

            <Box className='w-full md:w-6/12' sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField className='w-10/12' onChange={handleChangeCi} id="input-plaque" label="Busca por CI" variant="standard" />
                <Button onClick={()=>testCi()} color="success">
                    Buscar
                    </Button>  
            </Box>
            </div>
            {(ticFinded && ticFinded!=='' && ticFinded!=="notFinded")?(
            <Card className='w-48 mr-4 md:h-full overflow-hidden rounded-3xl'>
            <div className="relative flex flex-col flex-auto min-w-0 p-4 overflow-hidden break-words bg-white border-0 dark:bg-slate-850 dark:shadow-dark-xl shadow-3xl rounded-2xl bg-clip-border"> 
            <div className="flex flex-wrap">
            <div className="flex-none w-auto"> 
            <div className="relative inline-flex items-center justify-center text-white transition-all duration-200 ease-in-out text-base h-40 w-40 overflow-hidden rounded-xl">
                    <img src={ticFinded.qrCode} alt="profile_image" className="max-w-none w-40 relative shadow-2xl rounded-xl" />
                </div>
                </div>
                </div>
                <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 ">
              <div className="relative right-0">
                <ul className="relative flex flex-wrap p-1 list-none bg-gray-50 rounded-xl" >
                <li className="z-30 flex-auto text-center">
                    <IconButton onClick={()=>handleClick(ticFinded)} color="primary" aria-label="Ver tic">
                    <RemoveRedEye />
                    </IconButton> 
                  </li>
                </ul>
              </div>
            </div>  
            </div>
            </Card>
            ):(ticFinded==="notFinded")?(
                <>
                no existe
                </>
            ):""}

                </div>

        </Card> 
        </div>
</>
			
	
	);}

export default Polices;
