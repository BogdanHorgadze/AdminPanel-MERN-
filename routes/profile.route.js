const {Router} = require('express')
const router = Router()
const Profile = require('../models/profiles')
const auth = require('../middleware/auth')

router.post('/',auth,async(req,res)=>{
    const profile = await Profile.findById(req.user.userId)
    
    const toChange = {}
    if(req.file){
        toChange.avatarUrl = req.file.path
    }
    Object.assign(profile,toChange)
    await profile.save()
    res.json({img : req.file.path})
})


router.get('/',auth,async(req,res)=>{
    const profile = await Profile.findById(req.user.userId)
    if(profile.avatarUrl){
        res.json({
            img:profile.avatarUrl,
            email:profile.email
        })
    }
    else{
        res.json({
            img:false,
            email:profile.email
        })
    }
})

module.exports = router