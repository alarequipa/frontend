import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AccountContext= createContext();

const UserContext=({children})=>{
    const [user, setUser]=useState({loggedIn:null})
    const navigate = useNavigate()
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_SERVER_URL}:3008/loginCi`,{
            credentials:"include"
        }).catch(err=>{
            setUser({loggedIn:false})
            return
        }).then(res=>{
            if(!res||!res.ok|| res.status>=400){
                setUser({loggedIn:false})
                return
            }
            return res.json();
        }).then(data=>{
            if(!data){
                setUser({loggedIn:false})
                return
            }
            console.log(data)
            setUser({...data})
            navigate("/home")
        })
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
    <AccountContext.Provider value={{user, setUser}}>
        {children}
    </AccountContext.Provider>
    )
}

export default UserContext