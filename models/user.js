const {Schema,model} = require('mongoose') 


const userSchema = new Schema({
    name : {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    img:{
        type:String
    },
    profileId:{
        type:Schema.Types.ObjectId,
        ref:'Profiles',
        required:true
    }
})

module.exports = model('User',userSchema)