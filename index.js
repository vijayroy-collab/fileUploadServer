const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')


//Middleware
app.use(cors())
app.use(express.json())
app.use('/api',require('./routes/ImageKit/fileKit'))

//listen post
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})