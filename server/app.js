require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Score = require('./models/Score')

const app = express()

// const leaderboardRouter = require('./routes/leaderboard')


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.get('/leaderboard', async (req, res) => {
    const scores = await Score.find({}).sort({"time": 1})
    const names = scores.map((score) => {
        return [score.name, score.time]
    })
    res.send(names)
    console.log(names)
})

app.post('/', async (req, res) => {
    await Score.create({name: req.body.name, time: req.body.time})
    console.log(req.body)
})

const port = process.env.PORT || 3000
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()

module.exports = app