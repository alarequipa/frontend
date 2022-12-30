import * as React from "react";

const useAuth=()=> {
  const [authed, setAuthed] = React.useState(false);

  const loginAuth=async()=>{
     setAuthed(true);
  }
  const logoutAuth=()=>{
    setAuthed(false);
  }
  
  
  return {
    authed,
    loginAuth,
    logoutAuth,
  };
}

export default useAuth