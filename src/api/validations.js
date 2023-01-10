export class Validations {
    endpoint=`${process.env.REACT_APP_SERVER_URL}`
    // endpoint=`http://localhost:3008/`
    async verifyPerson(body){
    try {
        const response= await fetch(this.endpoint+"validatePerson", {
            method: 'POST',
            mode: 'cors', 
            cache: 'no-cache',
            headers: {
            'Content-Type': 'application/json'
             },
            redirect: 'follow',
            body: JSON.stringify(body)
        })
        const result= await response.json();
        if(response.status !== 200) throw result
        return result
    } catch (error) {
        throw error
    }
 
    };
    async verifyVehicle(body){

        try {
            const response= await fetch(this.endpoint+"validateAnh", {
                method: 'POST',
                mode: 'cors', 
                cache: 'no-cache',
                headers: {
                'Content-Type': 'application/json'
                 },
                redirect: 'follow',
                body: JSON.stringify({Identificador:body.Identificador, SubIdentificador:body.SubIdentificador })
            })
            const result= await response.json();
            if(response.status !== 200) throw result
            return result
        } catch (error) {
            throw error
        }
       
    }

    async verifyCudap(body){

        try {
            const response= await fetch(this.endpoint+"validateCudapTest", {
                method: 'POST',
                mode: 'cors', 
                cache: 'no-cache',
                headers: {
                'Content-Type': 'application/json'
                 },
                redirect: 'follow',
                body: JSON.stringify({idproceso:body})
            })
            const result= await response.json();
            if(response.status !== 200) throw result
            return result
        } catch (error) {
            throw error
        }
       
    }

}

