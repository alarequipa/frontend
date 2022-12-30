import React, {useContext, useRef} from 'react';
import {Card,CardContent,Modal,Box, Button, CircularProgress, ListItem, ListItemAvatar, Avatar, SpeedDial, SpeedDialAction} from '@mui/material';
import Print from '@mui/icons-material/Print';
import Page from '../containers/Page';
import { QrCode } from '@mui/icons-material';
import { ArrowBack } from '@mui/icons-material';
import {Settings} from '@mui/icons-material';
import { Verified } from '@mui/icons-material';
import logoEstadoDigital from '../assets/logos/estadodigitaltic.png'
import escplurinacional from '../assets/tic/escplurinacional.png'
import letras from '../assets/tic/letras.png'
import escudopolicia from '../assets/tic/escudopolicia.png'
import { useParams, useSearchParams, useNavigate} from 'react-router-dom';
import ValidationContext from '../context/ValidationContext';
import { useState, useEffect } from 'react';
import ReactToPrint from 'react-to-print';

const actions = [
    { icon: <ArrowBack />, name: 'Regresar' },
	{ icon: <QrCode />, name: 'QR' },
];
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    };
const TicInfo = () => {
    const {id}=useParams()
    const [searchParams] = useSearchParams();

    const computer = searchParams.get("computer");
    const police= searchParams.get("role");
    const [tic, setTic]= useState('')
    const [loading,setLoading]= useState(false)
    const [openQR, setOpenQR] = useState(false);
    const navigate = useNavigate();
    const {getTicById, printTic}=useContext(ValidationContext)
    let componentRef= useRef(null)
    let componentRefTic= useRef(null)
    useEffect(()=>{
        async function getTic(){
            try{
                
                await setLoading(true)
                const newTic= await getTicById(id)
                await console.log(newTic)
                await setTic(newTic)
            }catch(error){
                throw(error)
            }finally{
                await setLoading(false)
            }

        }
        getTic()
    },[1])
    const handleOpenQR = () => {setOpenQR(true)};
    const handleCloseQR = () => {setOpenQR(false)};

    const handleClick=(action)=>{
		if(action==="Regresar"){
            navigate(`/home/dashboard`)
		}
		if(action==="QR"){
			handleOpenQR()
		}
    }    
    function zfill(number, width) {
        var numberOutput = Math.abs(number); /* Valor absoluto del número */
        var length = number.toString().length; /* Largo del número */ 
        var zero = "0"; /* String de cero */  
        
        if (width <= length) {
            if (number < 0) {
                 return ("-" + numberOutput.toString()); 
            } else {
                 return numberOutput.toString(); 
            }
        } else {
            if (number < 0) {
                return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
            } else {
                return ((zero.repeat(width - length)) + numberOutput.toString()); 
            }
        }
    }
   
    return (
    <Page>               
    <div className="Register py-3 h-full relative">
    {(tic && tic!=='')?(
    <Card className='ticCard bg-ticprofile w-11/12 md:w-10/12 lg:w-9/12 xl:w-6/12 h-full max-h-full flex flex-wrap'>
    <div className=' max-h-screen md:h-full w-full md:w-6/12 p-3 items-center overflow-y-scroll  flex flex-wrap justify-center'>
        <div className="w-10/12 md:w-7/12 h-auto my-2 flex box-border justify-center content-center items-center">
            <div className='h-20 w-full sm:h-24 overflow-hidden relative'>
            <img className="box-border h-auto min-w-full relative m-auto" 
                src={logoEstadoDigital}
                alt="Logo Estado Digital"
            />
            </div>
        </div>
        <div className="w-2/4 h-auto md:w-full flex box-border pb-3 pt-2 justify-center content-center items-center">
            <div className='ticBorder border-solid border-4 h-36 w-36 rounded-full overflow-hidden relative'>
            <img className="box-border min-h-full min-w-full absolute m-auto" 
                src={`data:image/png;base64,${tic.userId.image}`}
                alt="Perfil"
            />
            </div>
        </div>

        <div className="w-full mb-0 md:w-full flex box-border justify-center content-center items-center">
        <div className="overflow-hidden w-full">
       <div>
            <dl>
            <div className="px-4 py-1 md:grid md:gap-4 md:px-6 text-center">
            <h3 className="ticCardTitle ticCarColorText text-base md:text-lg font-medium leading-6 text-gray-900">{tic.userId.personId.name} {tic.userId.personId.firstSurname} {tic.userId.personId.secondSurname} </h3>

            </div>
            <div className="py-1 grid grid-cols-3 gap-4 px-1 md:px-6">
                <div className='col-span-1 text-center'>
                <dt className="text-sm ticCardTitle ticCarColorText uppercase font-medium py-1  text-gray-500">Categoria</dt>
                <dd className="mt-0 text-sm text-gray-900 ">B</dd>
                </div>
                <div className='col-span-1 text-center'>
                <dt className="text-sm ticCardTitle ticCarColorText uppercase font-medium py-1  text-gray-500">Sangre</dt>
                <dd className="text-sm text-gray-900  mt-0">{tic.userId.personId.bloodType}</dd>
                </div>
                <div className='col-span-1 text-center'>
                <dt className="text-sm ticCardTitle ticCarColorText uppercase font-medium py-1  text-gray-500">Sticker</dt>
                <dd className=" text-sm text-gray-900  mt-0">{tic.stickerNumber}</dd>
                </div>
             
            </div>
            {tic.vehicleRoleId.map(vehicleRole=>(
                <>
                {(vehicleRole.active)?(
                    <div className="px-1 py-1 md:grid md:grid-cols-3 md:gap-4 md:px-6">
                    <dt className="text-sm col-span-3 ticCardTitle my-1 ticCarColorText uppercase font-medium text-gray-500">Datos del vehiculo</dt>
                    <div className='ticBackground col-span-3 grid grid-cols-3'>
                    <div className='col-span-3 my-3 p-0 text-white grid grid-cols-3'> 
                    <div className='col-span-1 text-center flex flex-wrap justify-center'>
                    <div className='h-20 w-20 col-span-1 rounded-full overflow-hidden relative'>
                        <img
                                className="max-w-none w-36 h-auto -top-11 -left-6 box-border min-h-full min-w-full absolute m-auto"                     
                                src={`data:image/png;base64,${vehicleRole.vehicleId.vehiclePhotos[0].image}`}
                                alt="Vehicle"
                            />
                        </div>
                    </div>

                        <div className='text-white mx-3 col-span-2 flex flex-col justify-center overflow-hidden relative'>
                            <dt className="ticCardTitle text-sm font-medium">{vehicleRole.vehicleId.brand} / {vehicleRole.vehicleId.type}</dt>
                            <dd className="mt-1 ticCard text-sm md:col-span-2 md:mt-0">
                                <span className='ticCardTitle'>PLACA: </span>
                            {vehicleRole.vehicleId.plaque}                  
                            </dd>   
                            <dd className="mt-1 ticCard text-sm md:col-span-2 md:mt-0">
                            <span className='ticCardTitle'>COLOR: </span>
                            {vehicleRole.vehicleId.color}                  
                            </dd>   
                        </div>
                    </div>

                        <div className='col-span-3 my-3 p-0 text-white grid grid-cols-3'>


                        {(tic.headingId.name==='RadioTaxi')?(
                            <>
                        <div className='col-span-1 text-center flex flex-col justify-center'>
                        <dt className="text-sm ticCardTitle uppercase font-medium py-1 ">RUBRO</dt>
                        <dd className="mt-0 text-sm ">{vehicleRole.heading.name}</dd>
                        </div>
                            <div className='col-span-1 text-center flex flex-col justify-center'>
                            <dt className="text-sm ticCardTitle uppercase font-medium py-1 ">EMPRESA
                            {vehicleRole.businessVerification?(<Verified className='ml-2 -mt-1'></Verified>):
                            ""}

                            </dt>
                            <dd className="text-sm mt-0">{vehicleRole.business.businessName}</dd>
                            </div>
                            <div className='col-span-1 text-center flex flex-wrap justify-center'>
                            <div className='h-20 w-20 col-span-1 rounded-md overflow-hidden relative'>
                            <img
                                    className="max-w-none w-full h-auto box-border min-h-full min-w-full absolute m-auto"                     
                                    src={`http://157.245.132.21:3003/uploads/business/image/${vehicleRole.business.image}`}
                                    alt="Empresa"
                                />
                                </div>
                                </div>
                            </>

                        ):(
                            <div className='col-span-3 text-center flex flex-col justify-center'>
                            <dt className="text-sm ticCardTitle uppercase font-medium py-1 ">RUBRO</dt>
                            <dd className="mt-0 text-sm ">{vehicleRole.heading.name}</dd>
                            </div>
                        )}

        
                        </div>
                    <div>
                    </div>                
                    </div>
                </div>  
                ):(
                    <div className=" px-1 py-1 mb-7 md:grid md:grid-cols-3 md:gap-4 md:px-6">
                    <dt className="text-sm ticCardTitle col-span-3 my-1 ticCarColorText uppercase font-medium">Otros vehiculos</dt>
                    <div className=' bg-gray-300 px-4 col-span-3 grid grid-cols-3'>
                    <ListItem
                        className='my-2 w-full'
                        key={vehicleRole.vehicleId._id}
                        disablePadding
                    >
                  <ListItemAvatar>
                        <Avatar
                        src={`data:image/png;base64,${vehicleRole.vehicleId.vehiclePhotos[0].image}`}
                        className="max-w-none w-40 absolute shadow-2xl rounded-xl"
                        />
                    </ListItemAvatar>
                    <div className='w-8 flex-wrap'>
                    <p className='flex font-medium text-gray-700 text-sm'>
                    {vehicleRole.vehicleId.type}/{vehicleRole.vehicleId.brand}/{vehicleRole.vehicleId.plaque}
                    </p>
                    </div>
                     </ListItem>
                    <div>
                    </div>                
                    </div>
                </div>  
                )}
                </>
 
 
            ))}

        </dl>
        </div>
        </div>     
        </div>

    </div>

    <div className='hidden max-h-screen h-3/4 md:h-full  w-full p-1 md:p-4  shadow md:w-6/12 items-center md:flex flex-col justify-center'>
    {police && police==="police"?(
                    <>
                <ReactToPrint
                trigger={()=>{
                    return (
                    <div className='w-full flex flex-wrap justify-center mb-5'>
                    <Button onClick={()=>{printTic(id)}} variant="outlined" color="success" endIcon={<Print />}>
                    Imprimir
                  </Button>
                        </div>
                    )
                }}
                content={()=>componentRef}
                documentTitle='QR print'
                pageStyle="print"
                />
                    </>

                 ):""}   
        <div className='p-2 w-full'>
        <div className="py-1 md:py-5 grid grid-cols-1 gap-4 px-2 md:px-6">
                <div className='w-full flex box-border justify-center content-center items-center'>
                        <div ref={el=>(componentRef=el)} className='print-container border-solid border-4 bg-white md:h-80 md:w-80 lg:h-96 lg:w-96 overflow-hidden relative'>
                        <img
                                className="box-border min-h-full min-w-full absolute m-auto" 
                                src={tic.qrCode}
                                alt="Vehicle"
                            />

                            </div>  
                            <div ref={el=>(componentRef=el)} className='print-container hidden bg-white overflow-hidden relative'>
                    <div className='w-full h-full flex flex-col'>
                        <div className='logos print-heading overflow-hidden w-full h-6 print-logos grid grid-cols-4 justify-center content-center'>
                            <div className='col-span-2 p-3'>
                            <div className='grid grid-cols-2 items-center'>
                            <img className='col-span-1 mr-2' src={escplurinacional}/>
                            <img className='col-span-1 ml-2' src={letras} />
                            </div>
                            </div>
                            <div className='col-span-2 p-3'>
                            <div className='grid grid-cols-2 items-center'>
                            <img className='col-end-3 col-span-1' src={escudopolicia}/>
                            </div>
                            </div>
                        </div>
                        <div className='print-tittle relative overflow-hidden w-full h-6 print-logos bg-black flex flex-wrap justify-center text-center items-center'>
                            <div className='lines absolute h-8 w-full'/>
                            <h2 className='tittle mx-11 text-center text-white'>ESCANÉA EL CÓDIGO QR PARA TENER LOS DATOS DEL CONDUCTOR Y DEL VEHÍCULO</h2>
                        </div>
                        <div className='print-qr relative overflow-hidden w-full bg-white flex flex-wrap justify-center text-center items-center'>
                            <div className='qr w-4/6 border border-solid border-black'>
                            <img
                                className="box-border m-auto w-full h-full" 
                                src={tic.qrCode}
                                alt="Vehicle"
                            /> 
                            </div>
                            <div className='w-4/6 flex flex-wrap text-center justify-center'>
                            {tic.stickerNumber && tic.stickerNumber!==""?(
                                <h2 className='text-lg font-bold mt-0 text-center text-black'>No:{zfill(tic.stickerNumber,5)}</h2>
                                ):""}
                            </div>
                        </div>
        
                        
                    </div>
                </div>   



                </div>            
            </div>
        </div>
    </div>

</Card>  
    ):loading?(
    <div className='w-full h-full flex flex-wrap items-center justify-center'>
            <Card className='w-11/12 h-1/3 flex flex-wrap justify-center items-center'>
            <CircularProgress />
            </Card>

        </div>):""}

          
            </div>
        {(computer && computer=="computer")?(
            <>
            <div className='block md:hidden'>
            <SpeedDial 
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<Settings />}
            >
                {actions.map((action) => (
                <SpeedDialAction
                    onClick={()=>handleClick(action.name)}
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    tooltipOpen
                />
                ))}
        </SpeedDial>
            </div>
            <div  className='hidden md:block'>
            <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<Settings />}
                >
                    <SpeedDialAction
                        onClick={()=>handleClick(actions[0].name)}
                        key={actions[0].name}
                        icon={actions[0].icon}
                        tooltipTitle={actions[0].name}
                        tooltipOpen
                    />
                </SpeedDial>
            </div>

            </>
       
        ):(
            <div>
            <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<Settings />}
                >
                    <SpeedDialAction
                        onClick={()=>handleClick(actions[1].name)}
                        key={actions[1].name}
                        icon={actions[1].icon}
                        tooltipTitle={actions[1].name}
                        tooltipOpen
                    />
                </SpeedDial>
            </div>
        )}
            

      <Modal
            open={openQR}
			onClose={handleCloseQR}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            police={police}
        >
            <Box sx={style} className="w-11/12 lg:w-2/4 max-h-screen">
            <CardContent >
                <div className='h-full w-full flex flex-wrap justify-center'>
                 {police && police==="police"?(
                    <>
                <ReactToPrint
                trigger={()=>{
                    return (
                    <div className='w-full flex flex-wrap justify-center mb-5'>
                    <Button onClick={()=>{printTic(id)}} variant="outlined" endIcon={<QrCode />}>
                    Imprimir QR
                  </Button>
                        </div>
                    )

                }}
                content={()=>componentRef}
                documentTitle='QR print'
                pageStyle="print"
                />
                <ReactToPrint
                trigger={()=>{
                    return (
                    <div className='w-full flex flex-wrap justify-center mb-5'>
                    <Button variant="outlined" color="success" endIcon={<Print />}>
                    Imprimir TIC
                  </Button>
                        </div>
                    )

                }}
                content={()=>componentRefTic}
                documentTitle='QR print'
                pageStyle="print"
                />
                    </>

                 ):""}   

                <div className='border-solid border-4 bg-white h-64 w-64 overflow-hidden relative'>
                        <img
                                className="box-border min-h-full min-w-full absolute m-auto" 
                                src={tic.qrCode}
                                alt="Vehicle"
                            />

                </div>   

                <div ref={el=>(componentRef=el)} className='print-container hidden bg-white overflow-hidden relative'>
                    <div className='w-full h-full flex flex-col'>
                        <div className='logos print-heading overflow-hidden w-full h-6 print-logos grid grid-cols-4 justify-center content-center'>
                            <div className='col-span-2 p-3'>
                            <div className='grid grid-cols-2 items-center'>
                            <img className='col-span-1 mr-2' src={escplurinacional}/>
                            <img className='col-span-1 ml-2' src={letras} />
                            </div>
                            </div>
                            <div className='col-span-2 p-3'>
                            <div className='grid grid-cols-2 items-center'>
                            <img className='col-end-3 col-span-1' src={escudopolicia}/>
                            </div>
                            </div>
                        </div>
                        <div className='print-tittle relative overflow-hidden w-full h-6 print-logos bg-black flex flex-wrap justify-center text-center items-center'>
                            <div className='lines absolute h-8 w-full'/>
                            <h2 className='tittle mx-11 text-center text-white'>ESCANÉA EL CÓDIGO QR PARA TENER LOS DATOS DEL CONDUCTOR Y DEL VEHÍCULO</h2>
                        </div>
                        <div className='print-qr relative overflow-hidden w-full bg-white flex flex-wrap justify-center text-center items-center'>
                            <div className='qr w-4/6 border border-solid border-black'>
                            <img
                                className="box-border m-auto w-full h-full" 
                                src={tic.qrCode}
                                alt="Vehicle"
                            /> 
                            </div>
                            <div className='w-4/6 flex flex-wrap text-center justify-center'>
                                {tic.stickerNumber && tic.stickerNumber!==""?(
                                <h2 className='text-lg font-bold mt-0 text-center text-black'>No:{zfill(tic.stickerNumber,5)}</h2>
                                ):""}
                            </div>

                        </div>
        
                        
                    </div>


                </div>
                
                <div ref={elTic=>(componentRefTic=elTic)} className='print-container hidden bg-white overflow-hidden relative'>
                    <div className='w-full h-full flex flex-col'>
                        <div className='logos print-heading overflow-hidden w-full h-6 print-logos grid grid-cols-4 justify-center content-center'>
                            <div className='col-span-2 p-3'>
                            <div className='grid grid-cols-2 items-center'>
                            <img className='col-span-1 mr-2' src={escplurinacional}/>
                            <img className='col-span-1 ml-2' src={letras} />
                            </div>
                            </div>
                            <div className='col-span-2 p-3'>
                            <div className='grid grid-cols-2 items-center'>
                            <img className='col-end-3 col-span-1' src={escudopolicia}/>
                            </div>
                            </div>
                        </div>
                        <div className='print-tittle relative overflow-hidden w-full h-6 print-logos bg-black flex flex-wrap justify-center text-center items-center'>
                            <h2 className='tittle mx-11 text-center text-white'>TARJETA DE IDENTIFICACIÓN DEL CONDUCTOR</h2>
                            <h2 className='tittle mx-11 text-center text-white'>TRANSPORTE SEGURO</h2>
                        </div>
                        <div className='print-tic relative overflow-hidden w-full flex flex-wrap justify-center text-center items-center'>
                        {tic.userId && tic.userId.image && tic.userId.image!==""?(
                            <>
                           <div className='w-full flex flex-wrap justify-center'>

                                <div className='perfil border border-solid border-black'>
                                <img
                                className="box-border m-auto w-full h-full" 
                                src={`data:image/png;base64,${tic.userId.image}`}
                                alt="Perfil"
                                />
                                </div>

                                </div>
                                <div className='info w-full flex flex-wrap text-justify justify-center'>
                                <div className=' w-3/6 justify-center'>
                                        <p className='text-2xl'>
                                        <strong>NOMBRE:</strong> {tic.userId.personId.name} {tic.userId.personId.firstSurname} {tic.userId.personId.secondSurname}
                                        </p>  
                                        <p className='text-2xl'>
                                        <strong>CI:</strong> {tic.userId.personId.ci}
                                        </p>
                                        <p className='text-2xl'>
                                        <strong>MATRÍCULA:</strong> {tic.vehicleId[0].plaque}
                                        </p>
                                        <p className='text-2xl'>
                                        <strong>MODELO:</strong> {tic.vehicleId[0].brand} {tic.vehicleId[0].type}
                                        </p>
                                        <p className='text-2xl'>
                                        <strong>COLOR:</strong> {tic.vehicleId[0].color}
                                        </p>                                 
                                </div>
                                </div>
                            </>

                         ):""}    
                            <div className='footer-print w-full bottom-0 relative flex flex-wrap text-center justify-center'>
                            <div className='articulo-footer text-justify'>
                                <p className='text-base font-light'>
                                    DE ACUERDO AL ART.134 DEL CNT CONCORDANTE CON EL ART.228 DEL REGLAMENTO DE TRÁNSITO, EL ORGANISMO OPERATIVO DE TRÁNSITO MEDIANTE LA DIVISIÓN SERVICIOS PÚBLICOS, ESTABLECE EL REGISTRO DE LOS CONDUCTORES Y MOTORIZADOS.
                                </p>  
                            </div>
                            <div className='info-footer justify-center'>
                                        <p className='text-lg font-medium text-yellow-300'>
                                            LA FALSIFICACIÓN TOTAL O PARCIAL DE ESTE DOCUMENTO, SERÁ SANCIONADA DE ACUERDO A NORMATIVA LEGAL VIGENTE.
                                        </p>  
                            </div>
                            </div>

                        </div>
        
                        
                    </div>


                </div>     
                </div>

                

		    </CardContent>
            </Box>
        </Modal>
        </Page>

    );
};

export default TicInfo;