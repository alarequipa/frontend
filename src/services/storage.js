export class Storage {
    async saveStorage (person, user, role, vehicles, tic){
        if(person!==""){
            await localStorage.setItem('person', JSON.stringify(person))
        }
        if(user!==""){
            await localStorage.setItem('user', JSON.stringify(user));
        }        
        if(role!==""){
            await localStorage.setItem('role', JSON.stringify(role))
        }
        if(vehicles!==""){
            await localStorage.setItem('vehicles', JSON.stringify(vehicles))
        }
        if(tic!==""){
            await localStorage.setItem('tic', JSON.stringify(tic))
        }
    }

    async loadStorage(){
        try {
            const state={
                person:JSON.parse(await localStorage.getItem('person')),
                user:JSON.parse(await localStorage.getItem('user')),
                roles:JSON.parse(await localStorage.getItem('role')),
                headings:JSON.parse(await localStorage.getItem('headings')),
                vehicles:JSON.parse(await localStorage.getItem('vehicles')),
                tic:JSON.parse(await localStorage.getItem('tic')),
            }
            return state
        } catch (error) {
            return false
        }
    }

}