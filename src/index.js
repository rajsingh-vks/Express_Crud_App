// import express from 'express'
// import './db/mongoose'

const express = require('express')
require('./db/mongoose');

const User = require('./modals/user')
const userRouter = require('./routers/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use(userRouter)


// Port listing

app.listen(port, () => {
    console.log('server is running on port =' + port)
})