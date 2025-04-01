const path = require('path')
const express = require("express")

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express();

// find the public directory
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

// find the public directory

// app.get('', (req, res) => {
//     res.send("Hello express")
// })

app.get('/help', (req, res) => {
    res.send("Hello helpç")
})

app.get('/about', (req, res) => {
    res.send("Hello about")
})

app.get('/wheather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'india'
    })
})

app.listen(2000, () => {
    console.log('server is running')
})