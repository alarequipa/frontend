import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AccountContext= createContext();

const UserContext=({children})=>{
    const [user, setUser]=useState({loggedIn:null, token:localStorage.getItem("token")})
    const navigate = useNavigate()
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_SERVER_URL}loginCi`,{
            credentials:"include",
            mode: 'cors', 
            headers:{
                "authorization": `Bearer ${user.token}`,
                "Access-Control-Allow-Origin": "*"
            }
        }).catch(err=>{
            setUser({loggedIn:false})
            localStorage.clear()
            return
        }).then(res=>{
            if(!res||!res.ok|| res.status>=400){
                setUser({loggedIn:false})
                localStorage.clear()
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