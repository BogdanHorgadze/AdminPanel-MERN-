const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const app = express()
const fileMiddleware = require('./middleware/file')
const PORT = config.get('port') || 5000
const path = require('path')
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(fileMiddleware.single('avatar'))
app.use('/images',express.static(path.join(__dirname,'images')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/auth',require('./routes/auth.route'))
app.use('/users',require('./routes/users.route'))
app.use('/users',require('./routes/create.route'))
app.use('/users/:id',require('./routes/userEdit.route'))
app.use('/profile',require('./routes/profile.route'))


async function start(){
    try{
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        app.listen(PORT, ()=> {
            console.log(`server running on ${PORT}`)
        })
    }catch(e){
        console.log(e)
        process.exit(1)
    }
}

start()
