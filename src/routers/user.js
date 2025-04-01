const express = require('express')
const User = require('../modals/user')
const router = new express.Router()

// router.get('/test', (req, res) => {
//     res.send("This is test frames")
// })

// Create User (POST /users)

router.post('/users', async (req, res) => {
    // console.log(req.body)
    // res.send('testing')
    const user = new User(req.body)

    //Await

    try {
        await user.save()
        res.status(201).send(user)
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