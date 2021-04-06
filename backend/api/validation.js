module.exports=app=>{
    function existsOrError(value, msg){
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }
    
    function notExistsOrError(value, msg){
        try{
            existsOrError(value, msg)
        } catch(msg){
            return
        }
        throw msg
    }
    
    function equalsOrError(valueA, valueB, msg){
        if(valueA !== valueB) throw msg
    }

    function verifyState(valueA, msg){
        if(valueA.length > 2) throw msg
        
        const uf = [
            'AC','AL','AP','AM','BA','CE','DF','ES','GO',
            'MA','MT','MS','MG','PA','PB','PR','PE','PI',
            'RJ','RN','RS','RO','RR','SC','SP','SE','TO'
        ]

        for (item of uf){
            if(item == valueA) {
                return
            } 
        }

        throw msg
    }

    return { existsOrError, notExistsOrError, equalsOrError, verifyState}
}