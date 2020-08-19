const {Router} = require('express')
const router = Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')


router.post('/create',auth, async (req,res)=>{

    const {email , password, name} = req.body
    try{
        const candidate = await User.findOne( {email} )
        if(candidate){
            res.json({message : 'такой email есть'})
        }
        else{
            const hashpassword = await bcrypt.hash(password,12)
            const user = new User({
                name,
                email,
                password:hashpassword,
                profileId: req.user.userId,
            })
            await user.save()
            res.json({message : 'юзер создан'})
        }
    } 
    catch(e){
        console.log(e)
    }
})


router.post('/image',(req,res)=>{
    console.log(req.file)
    res.json({message : 'some'})
})

module.exports = router