import {useState} from "react";

const useInitialState= () =>{
	const [codigo, setCodigo]= useState({
		cod:"",
		error:"",
		errorStatus:false,
	})

	const [business, setBusiness]= useState({
		businessName:"",
		type:"",
		whatsapp:"",
		address:"",
		city:"",
		country:"",
		email:""
	})
	const [user, setUser] = useState({
		personId:'',
		device:'',
		email: '',
		password: '',
        name:'',
		ci:'',
        phone:'',
		showPassword: false,
		passwordExist:false,
		errors:{},
	  });

    const [checked, setChecked] = useState({
        email:false,
        name:false,
		phone:false,
		ci:false,
		cod:false,
    })
	const businessBlank=()=>{
		setBusiness({
			businessName:"",
			type:"",
			whatsapp:"",
			address:"",
			city:"",
			country:"",
			email:""});
	}
    const handleValidationEmail=()=> {
		let fields = user;
		let formIsValid = true;
		//Email
		if (!fields["email"]) {
		  formIsValid = false;
		  user.errors["email"] = "Este espacio no puede estar vacio";
		}
	
		if (typeof fields["email"] !== "undefined") {
		  let lastAtPos = fields["email"].lastIndexOf("@");
		  let lastDotPos = fields["email"].lastIndexOf(".");
	
		  if (
			!(
			  lastAtPos < lastDotPos &&
			  lastAtPos > 0 &&
			  fields["email"].indexOf("@@") === -1 &&
			  lastDotPos > 2 &&
			  fields["email"].length - lastDotPos > 2
			)
		  ) {
			formIsValid = false;
			user.errors["email"] = "Ingresa un email valido";
		  }
		}
		return(formIsValid);
	  }
	  const handleValidationCod=()=> {
		let fields = codigo;
		let formIsValid;
		//Email
		if (!fields["cod"] || fields["cod"].length<6) {
		  formIsValid = false;
		  codigo.error= "Ingresa un Codigo valido";
		}else{
		  formIsValid = true;
		}

		return(formIsValid);
	  }


    return {
        user,
		setUser,
        handleValidationEmail,		
		handleValidationCod,
        checked,
        setChecked,
		codigo,
		business,
		setBusiness,
		businessBlank,
		setCodigo
    }
}

export default useInitialState;