const express = require('express')
const User = require('../modals/user')
const { body, validationResult } = require("express-validator");

const router = new express.Router()

// router.get('/test', (req, res) => {
//     res.send("This is test frames")
// })

// Create User (POST /users)

// router.post('/users', async (req, res) => {
//     const user = new User(req.body)
//     try {
//         await user.save()
//         res.status(201).send(user)
//     } catch (err) {
//         res.status(400).send(err)
//     }
// })

router.post('/users', [
    body("email")
        .isEmail().withMessage('Invalid email format')
        .custom(async (value) => {
            const user = await User.findOne({ email: value });
            if (user) {
                throw new Error('Email already exists');
            }
        }),
    ],[
    body("phone")
        .isMobilePhone()
        .isNumeric().withMessage('Phone number must contain only digits')
        .isLength({ min: 10, max: 10 })
        .withMessage('Phone number must be containe 10 digits')
        // .withMessage("Invalid phone number format")
        .custom(async (value) => {
            const existingUser = await User.findOne({ phone: value });
            if (existingUser) {
                throw new Error("Phone number already registered");
            }
            return true;
        }),
    ],
    async (req, res) => {
        // console.log(req.body)
        // res.send('testing')

        const user = new User(req.body)

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //Await

        try {
            const { phone } = req.body;
            const newUser = new User({ email: req.body.email, phone: req.body.phone });

            await user.save()
            res.status(201).send({ message: "User registered successfully", user: newUser })
        } catch (err) {
            res.status(400).send(err)
        }


        //Await

        // user.save().then(() => {
        //     res.send(user)
        // }).catch((err) => {
        //     res.status(400).send(err)
        // })
    })

// Update User (PUT /users/:id)

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'city', 'email', 'phone', 'post']
    // const isValidOperation = updates.every((update) =>{
    //      return allowedUpdates.includes()
    // })
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            res.status(404).send(user)
        }
        res.send(user)
    } catch (err) {
        res.status(400).send(err)
    }
})

// Delete User (DELETE /users/:id)

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            res.status(404).send()
        }
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

//  Get User Details (GET /users/:id)

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (err) {
        res.send(500).send(err)
    }

    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((err) => {
    //     res.status(500).send(err)
    // })
    // console.log(req.params)
})

// Get All Users (GET /users) (Bonus Task)

router.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(500).send(err)
    }

    // User.find().then((users) => {
    //     res.send(users)
    // }).catch((err) => {
    //     res.status(500).send(err)
    // })
})

module.exports = router