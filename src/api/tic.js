export class TicGeneration {
    endpoint=`${process.env.REACT_APP_SERVER_URL}`

    async saveVehicle(token, body){
        
        try {
            console.log("estamosguardado")
            const response= await fetch(this.endpoint+"createVehicle", {
                method: 'POST',
                mode: 'cors', 
                cache: 'no-cache',
                credentials:"include",
                headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
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

        async findVehicle(params){
            try {
                console.log("hasta aqui")
                const response= await fetch(this.endpoint+"findVehicle/"+params, {
                    method: 'GET',
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
        }
        async getHeadings(){
            try {
                const response= await fetch(this.endpoint+"getHeadings", {
                    method: 'GET',
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
     
        }
        async getBusinesses(){
            try {
                const response= await fetch(this.endpoint+"getBusiness", {
                    method: 'GET',
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
     
        }
        async updateBusiness(token, id, business){
            try {
                const response= await fetch(this.endpoint+"updateBusiness/"+id, {
                    method: 'PUT',
                    mode: 'cors', 
                    cache: 'no-cache',
                    credentials:"include",
                    headers: {
                    'Content-Type': 'application/json',
                    "authorization": `Bearer ${token}`
                     },
                    redirect: 'follow',
                    body: JSON.stringify(business)
                })
          
            const result= await response.json();
            if(response.status !== 200) throw result
            return result
            } catch (error) {
              throw error
            }
     
        }
        async updateBusinessVehicles(id, business){
            try {
                console.log(id, business)
                const response= await fetch(this.endpoint+"updateBusinessVehicles/"+business, {
                    method: 'PUT',
                    mode: 'cors', 
                    cache: 'no-cache',
                    credentials:"include",
                    headers: {
                    'Content-Type': 'application/json'
                     },
                    redirect: 'follow',
                    body: JSON.stringify({id})
                })
          
            const result= await response.json();
            if(response.status !== 200) throw result
            return result
            } catch (error) {
              throw error
            }
     
        }
        async deleteBusiness(token, id){
            try {
                const response= await fetch(this.endpoint+"deleteBusiness/"+id, {
                    method: 'PUT',
                    mode: 'cors', 
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
    async uploadBusinessImage(data, id){
        try {
            const response= await fetch(this.endpoint+"uploads/business/image/"+id, {
                method: 'PUT',
                mode: 'cors', 
                cache: 'no-cache',
                redirect: 'follow',
                body: data
            })
            const result= await response.json();
            if(response.status !== 200) throw result
            return result
        } catch (error) {
            throw error
        }       
    } 
    async saveDriver(token, vehicle, heading, business=null){        
            try {
                console.log(vehicle, heading, business)
                const response= await fetch(this.endpoint+"createDriver", {
                    method: 'POST',
                    mode: 'cors', 
                    cache: 'no-cache',
                    credentials:"include",
                    headers: {
                    'Content-Type': 'application/json',
                    "authorization": `Bearer ${token}`
                     },
                    redirect: 'follow',
                    body: JSON.stringify({vehicleSave:vehicle, heading:heading, business:business})
                })
                const result= await response.json();
                if(response.status !== 200) throw result
                return result
            } catch (error) {
                throw error
            }
                
            };
            async saveOwner(token, vehicle, heading, business=null){        
                try {
                    const response= await fetch(this.endpoint+"createOwner", {
                        method: 'POST',
                        mode: 'cors', 
                        cache: 'no-cache',
                        credentials:"include",
                        headers: {
                        'Content-Type': 'application/json',
                        "authorization": `Bearer ${token}`
                         },
                        redirect: 'follow',
                        body: JSON.stringify({vehicleSave:vehicle, heading:heading, business:business})
                    })
                    const result= await response.json();
                    if(response.status !== 200) throw result
                    return result
                } catch (error) {
                    throw error
                }
                    
                };
                async getOwner(){
                    try {
                        const response= await fetch(this.endpoint+"findOwner", {
                            method: 'GET',
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
                }
                async getDriver(){
                    try {
                        const response= await fetch(this.endpoint+"findDriver", {
                            method: 'GET',
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
                }
                async getVehicleRole(token){
                    try {
                        const response= await fetch(this.endpoint+"findVehicleRole", {
                            method: 'GET',
                            mode: 'cors', 
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

            async saveTic(token, vehicle){        
                try {
                    const response= await fetch(this.endpoint+"createTic", {
                        method: 'POST',
                        mode: 'cors', 
                        cache: 'no-cache',
                        credentials:"include",
                        headers: {
                        'Content-Type': 'application/json',
                        "authorization": `Bearer ${token}`
                            },
                        redirect: 'follow',
                        body: JSON.stringify({vehicle})
                    })
                    const result= await response.json();
                    if(response.status !== 200) throw result
                    return result
                } catch (error) {
                    throw error
                }
                    
                };
            async getTic(token){        
            try {
                    const response= await fetch(this.endpoint+"findTic", {
                        method: 'GET',
                        mode: 'cors', 
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
            };
            async findTicByPlaque(plaque){        
                try {
                        const response= await fetch(this.endpoint+"findTicByPlaque/"+plaque, {
                            method: 'GET',
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
                async findTicByCi(ci){        
                    try {
                            const response= await fetch(this.endpoint+"findTicByCi/"+ci, {
                                method: 'GET',
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
            async updateTic(id, qr){        
                try {
                        const response= await fetch(this.endpoint+"updateTic/"+id, {
                            method: 'POST',
                            mode: 'cors', 
                            cache: 'no-cache',
                            credentials:"include",
                            headers: {
                            'Content-Type': 'application/json'
                                },
                            redirect: 'follow',
                            body: JSON.stringify({qrcode:qr})
                        })
                        const result= await response.json();
                        if(response.status !== 200) throw result
                        return result
                    } catch (error) {
                        throw error
                    }                
                };
                async printTic(id){        
                    try {
                            const response= await fetch(this.endpoint+"printedTic/"+id, {
                                method: 'PUT',
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
                async verifyVehicleBusiness(id){        
                    try {
                            const response= await fetch(this.endpoint+"verifyVehicleBusiness/"+id, {
                                method: 'PUT',
                                mode: 'cors', 
                                cache: 'no-cache',
                                credentials:"include",
                                redirect: 'follow',
                        })
                        const result= await response.json();
                        if(response.status !== 200) throw result
                        return result
                    } catch (error) {
                        throw error
                    }                
                };
                async saveBusiness(token, business, type){        
                    try {
                        const response= await fetch(this.endpoint+"createBusiness", {
                            method: 'POST',
                            mode: 'cors', 
                            cache: 'no-cache',
                            credentials:"include",
                            headers: {
                            'Content-Type': 'application/json',
                            "authorization": `Bearer ${token}`
                                },
                            redirect: 'follow',
                            body: JSON.stringify({business, type})
                        })
                        const result= await response.json();
                        if(response.status !== 200) throw result
                        return result
                    } catch (error) {
                        throw error
                    }
                        
                    };

                    async activateVehicle(token, id){        
                        try {
                                const response= await fetch(this.endpoint+"activateVehicleRole/"+id, {
                                    method: 'PUT',
                                    mode: 'cors', 
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
                        };
                        
            async deleteVehicleRole(id){        
                try {
                        const response= await fetch(this.endpoint+"deleteVehicleRole/"+id, {
                            method: 'PUT',
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
                async getVehicleRoleById(id){
                    try {
                        const response= await fetch(this.endpoint+"findVehicleRoleById/"+id, {
                            method: 'GET',
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
                }

                async getTicById(id){
                    try {
                        const response= await fetch(this.endpoint+"findTicById/"+id, {
                            method: 'GET',
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
                }
}

