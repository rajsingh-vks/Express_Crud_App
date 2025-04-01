// import mongoose from "mongoose";
// import validator from "validator"

const mongoose = require('mongoose')
const validator = require('validator')

// Mongoose Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if(value <  0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    city: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)){
                throw new Error('Email format is invalide')
            }
        }
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if(!validator.isMobilePhone(value)){
                throw new Error('Invalid Phone number')
            } 
        }
        // validate(value) {
        //     if (existingUser) {
        //         return res.status(400).json({ message: 'Phone number already in use' });
        //     }
        // }
    },
    post: {
        type: String
    }
});

// Mongoose model
const User = mongoose.model('User', userSchema)

module.exports = User