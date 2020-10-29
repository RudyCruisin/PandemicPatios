const express = require('express')
const router = express.Router()
const db = require('../models')


router.get('/all', async (req, res)=> {
    const reviews = await db.Review.findAll()
    res.send(reviews)
})



module.exports = router