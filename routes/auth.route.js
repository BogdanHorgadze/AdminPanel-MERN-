const {Router} = require('express')
const router = Router()
const Profiles = require('../models/profiles')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const config = require('config')
const nodemailer = require('nodemailer')
const sgMail = require('nodemailer-sendgrid-transport');
const registerMail = require('../email/registerMail')
const resetMail = require('../email/reset')

const transporter = nodemailer.createTransport(sgMail({
    auth:{api_key: config.get('emailKey')}
}))


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
            await transporter.sendMail(registerMail(email));
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
        }
        else{
            res.json({message:'неверный пароль'})
        }
    }
    else{
        res.json({message:'такого юзера нет'})
    }
})

router.post('/reset',async(req,res)=>{
    try{    
            const {email} = req.body
            const candidate = await Profiles.findOne({email})
            if(candidate){
            const token = jwt.sign({
                    email,
                    userId: candidate._id
                },config.get('jwt'),{expiresIn:'1h'})
                candidate.resetToken = token
                await candidate.save()
                await transporter.sendMail(resetMail(email,token))
                res.json({message:"письмо на восстановление отправлено",token})
            }else{
                res.json({message:'нет такого юзера'})
            }
        
    }
    catch(e){
        console.log(e)
    }
})

router.get('/password/:token',async(req,res)=>{
    if(!req.params.token){
        res.json({message:'нет такого токена'})
    }
    try{
        const profile = await Profiles.findOne({resetToken:req.params.token})
        if(profile){
            const user = jwt.verify(profile.resetToken,config.get('jwt'))
            res.json({user})
        }
        else{
            res.json({message:"нет юзера"});
        }
    }catch(e){
        console.log(e)
        res.json({message:"время токена вышло"})
    }
})

router.post('/password',async(req,res)=>{
    const {password,userId} = req.body
    const profile = await Profiles.findOne({
        _id:userId,
    })
    if(profile){
        const hashpassword = await bcrypt.hash(password,12)
        profile.password = hashpassword
        profile.resetToken = undefined
        await profile.save()
        res.json({message:"пароль изменен"})
    }else{
        res.json({message:"такого юзера нет"})
    }
})


module.exports = router