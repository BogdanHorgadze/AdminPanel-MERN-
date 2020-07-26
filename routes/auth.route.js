const {Router} = require('express')
const router = Router()
const Profiles = require('../models/profiles')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

router.post('/register',async(req,res)=>{
    const {email , password} = req.body
    const candidate = await Profiles.findOne({email})
    if(candidate){
        res.json({message : 'такой пользователь уже есть'})
    }
    else{
        const hashpassword = await bcrypt.hash(password,12)
            const profile = new Profiles({
                email,
                password:hashpassword
            })
            await profile.save()
            res.json({message : 'профиль создан'})
    }
})

router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    const candidate = await Profiles.findOne({email})
    if(candidate){
        const isMatch = await bcrypt.compare(password, candidate.password)
        if(isMatch){
        const token = jwt.sign({
                email,
                userId: candidate._id
            },config.get('jwt'),{expiresIn:'1h'})
            res.json({token:`Bearer ${token}`})
            res.redirect('/users')
        }
        else{
            res.json({message:'неверный пароль'})
        }
    }
    else{
        res.json({message:'такого юзера нет'})
    }
})



module.exports = router