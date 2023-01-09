export class MainApi {
    endpoint=`${process.env.REACT_APP_SERVER_URL}`

    async savePerson(body){
    let user={
        ci:body.NumeroDocumento,
        name:body.Nombres,
        firstSurname:body.PrimerApellido,
        secondSurname:body.SegundoApellido,
        picture:body.Fotografia,
        birthDate:body.FechaNacimiento,
        gender:body.Genero,
        address:body.Domicilio,
        province:body.LugarNacimientoProvincia,
        locality:body.LugarNacimientoLocalidad,
        bloodType:body.GrupoSanguineo,
        city:body.LugarNacimientoDepartamento,
        country:body.LugarNacimientoPais,
        profession:body.ProfesionOcupacion,
    }
    try {
        const response= await fetch(this.endpoint+"createPerson", {
            method: 'POST',
            cache: 'no-cache',
            credentials:"include",
            headers: {
            'Content-Type': 'application/json'
             },
            redirect: 'follow',
            body: JSON.stringify(user)
        })
        const result= await response.json();
        if(response.status !== 200) throw result
        let user1={
            id:result.person._id,
            NumeroDocumento:result.person.ci,
            Nombres:result.person.name,
            PrimerApellido:result.person.firstSurname,
            SegundoApellido:result.person.secondSurname,
            Fotografia:result.person.picture,
            FechaNacimiento:result.person.birthDate,
            Genero:result.person.gender,
            Domicilio:result.person.address,
            LugarNacimientoProvincia:result.person.province,
            LugarNacimientoLocalidad:result.person.locality,
            GrupoSanguineo:result.person.bloodType,
            LugarNacimientoDepartamento:result.person.city,
            LugarNacimientoPais:result.person.country,
            ProfesionOcupacion:result.person.profession,
        }
        return user1
    } catch (error) {
        throw error
    }

    
    };

    async findPersonCI(params){
        try {
            const response= await fetch(this.endpoint+"findPersonCi/"+params, {
                method: 'GET',
                cache: 'no-cache',
                credentials:"include",
                headers: {
                'Content-Type': 'application/json'
                 },
                redirect: 'follow',
            })
        const result= await response.json();
        if(response.status !== 200) throw result
        let user1={
            id:result.person._id,
            NumeroDocumento:result.person.ci,
            Nombres:result.person.name,
            PrimerApellido:result.person.firstSurname,
            SegundoApellido:result.person.secondSurname,
            Fotografia:result.person.picture,
            FechaNacimiento:result.person.birthDate,
            Genero:result.person.gender,
            Domicilio:result.person.address,
            LugarNacimientoProvincia:result.person.province,
            LugarNacimientoLocalidad:result.person.locality,
            GrupoSanguineo:result.person.bloodType,
            LugarNacimientoDepartamento:result.person.city,
            LugarNacimientoPais:result.person.country,
            ProfesionOcupacion:result.person.profession,
        }
        return user1
        } catch (error) {

            throw error
        }
 
    }
    async createuser(password ,person){
    let user={
        personId:person.id,
        image:person.Fotografia,
        password:password,      
    }
    try {
        const response= await fetch(this.endpoint+"registerByPerson", {
            method: 'POST',
            cache: 'no-cache',
            credentials:"include",
            headers: {
            'Content-Type': 'application/json'
             },
            redirect: 'follow',
            body: JSON.stringify(user)
        })
        const result= await response.json();
        if(response.status !== 200) throw result
        return result
    } catch (error) {
        throw error
    }

    
    };
    async getRole(token){
        try {
            const response= await fetch(this.endpoint+"getRoles", {
                method: 'GET',
                cache: 'no-cache',
                credentials:"include",
                headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
                 },
                redirect: 'follow',
            })
            const result= await response.json();
            if(response.status !== 200) throw result
            return result
        } catch (error) {
            throw error
        }
    }
    async login(body){
        let user={
            ci:body.ci,
            password:body.password,
        }
     try {
            const response= await fetch(this.endpoint+"loginCi", {
                method: 'POST',
                mode: 'cors', 
                cache: 'no-cache',
                credentials:"include",
                headers: {
                'Content-Type': 'application/json'
                 },
                redirect: 'follow',
                body: JSON.stringify(user)
            })
            const result= await response.json();
            if(response.status !== 200) throw result
            
            return result
        } catch (error) {
            throw error
        }
    
        
        };
        async loginEmail(body){
            let user={
                email:body.email,
                password:body.password,
            }
         try {
                const response= await fetch(this.endpoint+"login", {
                    method: 'POST',
                    mode: 'cors', 
                    cache: 'no-cache',
                    credentials:"include",
                    headers: {
                    'Content-Type': 'application/json'
                     },
                    redirect: 'follow',
                    body: JSON.stringify(user)
                })
                const result= await response.json();
                if(response.status !== 200) throw result
                
                return result
            } catch (error) {
                throw error
            }
        
            
            };

        async logout(){
         try {
                const response= await fetch(this.endpoint+"logout", {
                    method: 'POST',
                    mode: 'cors', 
                    cache: 'no-cache',
                    credentials:"include",
                    headers: {
                    'Content-Type': 'application/json'
                     },
                    redirect: 'follow',
                    
                })
                const result= await response.json();
                if(response.status !== 200) throw result                
                return result
            } catch (error) {
                throw error
            }    
        };

}

