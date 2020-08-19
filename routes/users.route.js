const {Router} = require('express')
const router = Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.get('/', auth, async (req,res)=>{
    try{
    const user = await User.find({profileId : req.user.userId})
    if(user){
        res.json(user)
    }
    }catch(e){
        console.log(e)
    }
})

router.get('/:id',async (req,res)=>{
    const user = await User.findById(req.params.id)
    res.json(user)
})

router.delete('/',auth,async (req,res)=>{
    try{
        await User.deleteOne({_id: req.body.id})
        res.json({message:'user deleted'})
    }catch(e){
        console.log(e)
    }
})

module.exports = router