const {Schema,model} = require('mongoose')

const profilesSchema = Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    resetToken:{
        type:String
    },
    avatarUrl:{
        type:String
    }
})

module.exports = model('Profiles',profilesSchema)