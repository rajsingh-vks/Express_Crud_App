// import mongoose from "mongoose";
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/crud-operation-api')

// const me = new User({
//     name: 'Singh',
//     age: 27,
//     city: 'Buxar',
//     email: 'rajsingh@gmail.com',
//     phone: 1234567890,
//     post: 'Designer'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error', error)
// })

// export default mongoose;