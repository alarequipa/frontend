import React, {useState, useContext} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {Dashboard, Logout, AssignmentInd, LocalPolice}from '@mui/icons-material/';
import AdminNavbar from './NavBar';
import AuthContext from '../context/AuthContext';
import ValidationContext from '../context/ValidationContext';
import { AccountContext } from "../context/AccountContext";


const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState('-left-64');
    const navigate = useNavigate();
    const {role}= useContext(ValidationContext)
    const {setUser}= useContext(AccountContext);

    const {logoutAuth}=useContext(AuthContext);
    const handleLogout =() => {
        localStorage.clear();
        setUser({loggedIn:false, token:""})
        navigate('/login')
        logoutAuth()
        };

    return (
        <>
            <AdminNavbar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
            <div
                className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 py-4 px-6 transition-all duration-300 z-50`}
            >
                <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
                    <a
                        href="https://material-tailwind.com?ref=mtd"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 text-center w-full inline-block"
                    >
                        <h6>asd</h6>
                    </a>
                    <div className="flex flex-col">
                        <div className='flex flex-col'>
                        <hr className="my-4 min-w-full" />

                        <ul className="flex-col min-w-full flex list-none">
                            <li className="rounded-lg mb-4">
                                <NavLink
                                    to="/home/dashboard"
                                    className={(state) => "flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg" + (!state.isActive ? "text-gray-700": "bg-gradient-to-tr bg-blue-400 text-white shadow-md")} 
                                >
                                    <Dashboard></Dashboard>
                                    Dashboard
                                </NavLink>
                            </li>

                            {(role.business && role.business.length>=1 && role.business!=="")?(
                                <li className="rounded-lg mb-4">
                                <NavLink
                                    to="/home/business"
                                    className={(state) => "flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg" + (!state.isActive ? "text-gray-700": "bg-gradient-to-tr bg-blue-400 text-white shadow-md")} 
                                >
                                    <AssignmentInd></AssignmentInd>
                                    Empresas
                                </NavLink>
                            </li>
                            ):""}
                           {(role.police && role.police!==[] &&role.police!=="")?(
                                <li className="rounded-lg mb-4">
                                <NavLink
                                    to="/home/polices"
                                    className={(state) => "flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg" + (!state.isActive ? "text-gray-700": "bg-gradient-to-tr bg-blue-400 text-white shadow-md")} 
                                >
                                    <LocalPolice></LocalPolice>
                                    Policias
                                </NavLink>
                            </li>
                            ):""}

                            {/* <li className="rounded-lg mb-4">
                                <NavLink
                                    to="/registerPeople"
                                    className={(state) => "flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg" + (!state.isActive ? "text-gray-700": "bg-gradient-to-tr bg-blue-400 text-white shadow-md")} 
                                >
                                    <AssignmentInd></AssignmentInd>
                                    Registrar
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/settings"
                                    className={(active) =>"flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg" + (!active.isActive ? "text-gray-700": "bg-gradient-to-tr bg-blue-400 text-white shadow-md")} 
                                >
                                <Settings></Settings>
                                Configuración
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 ">
                                <NavLink
                                    to="/conductores"
                                    className={(active) =>"flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg" + (!active.isActive ? "text-gray-700": "bg-gradient-to-tr bg-blue-400 text-white shadow-md")} 
                                >
                                <Groups></Groups>
                                Conductores
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/maps"
                                    className={(active) =>"flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg" + (!active.isActive ? "text-gray-700": "bg-gradient-to-tr bg-blue-400 text-white shadow-md")} 
                                >
                                <Map></Map>
                                    Maps
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/find"
                                    className={(active) =>"flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg" + (!active.isActive ? "text-gray-700": "bg-gradient-to-tr bg-blue-400 text-white shadow-md")} 
                                >
                                <Fingerprint></Fingerprint>
                                 Buscar
                                </NavLink>                               
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/generarTic"
                                    className={(active) =>"flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg" + (!active.isActive ? "text-gray-700": "bg-gradient-to-tr bg-blue-400 text-white shadow-md")} 

                                >
                                <Article></Article>
                                 Generar TIC
                                </NavLink>  
                            </li> */}
                        </ul>
                        </div>
                        <div className='flex flex-col bottom-0 '>
                        <hr className="my-4 min-w-full" />

                        <ul className="flex-col min-w-full flex list-none">
                            <li className="rounded-lg mb-4 ">
                            
                            <button
                            onClick={handleLogout}
                            className="flex items-center w-full gap-4 text-sm font-light px-4 py-3 text-gray-700">
                            <Logout></Logout>
                                    Cerrar Sesión
                            </button>
                                
                          </li>
                            {/* <li className="rounded-lg mb-4">
                                <NavLink
                                    to="/registerPeople"
                                    className={(state) => "flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg" + (!state.isActive ? "text-gray-700": "bg-gradient-to-tr bg-blue-400 text-white shadow-md")} 
                                >
                                    <AssignmentInd></AssignmentInd>
                                    Registrar
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/settings"
                                    className={(active) =>"flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg" + (!active.isActive ? "text-gray-700": "bg-gradient-to-tr bg-blue-400 text-white shadow-md")} 
                                >
                                <Settings></Settings>
                                Configuración
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 ">
                                <NavLink
                                    to="/conductores"
                                    className={(active) =>"flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg" + (!active.isActive ? "text-gray-700": "bg-gradient-to-tr bg-blue-400 text-white shadow-md")} 
                                >
                                <Groups></Groups>
                                Conductores
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/maps"
                                    className={(active) =>"flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg" + (!active.isActive ? "text-gray-700": "bg-gradient-to-tr bg-blue-400 text-white shadow-md")} 
                                >
                                <Map></Map>
                                    Maps
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/find"
                                    className={(active) =>"flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg" + (!active.isActive ? "text-gray-700": "bg-gradient-to-tr bg-blue-400 text-white shadow-md")} 
                                >
                                <Fingerprint></Fingerprint>
                                 Buscar
                                </NavLink>                               
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/generarTic"
                                    className={(active) =>"flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg" + (!active.isActive ? "text-gray-700": "bg-gradient-to-tr bg-blue-400 text-white shadow-md")} 

                                >
                                <Article></Article>
                                 Generar TIC
                                </NavLink>  
                            </li> */}
                        </ul>
                        </div>


                      </div>
                </div>
            </div>
        </>

    );
};

export default Sidebar;