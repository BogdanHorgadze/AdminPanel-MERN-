const {Router} = require('express')
const router = Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')

router.post('/data',async (req,res)=>{
   const user = await User.findById(req.body.id)
   res.json(user)
})

router.post('/edit',auth,async (req,res)=>{
    const {id} = req.body
    delete req.body.id
    const hashpassword = await bcrypt.hash(req.body.password,10)
    req.body.password = hashpassword
    await User.findByIdAndUpdate(id, req.body)
    res.json({message:'user created'})
 })


module.exports = router