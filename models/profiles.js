const {Schema,model} = require('mongoose')

const profilesSchema = Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = model('Profiles',profilesSchema)