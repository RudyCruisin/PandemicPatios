const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/add', async (req, res)=> {
    const { name, address, city, state, zipCode, phoneNumber } = req.body

    const newRestaurant = await db.Restaurant.create({
        name,
        address,
        city,
        state,
        zipCode,
        phoneNumber
    })

    res.send(newRestaurant)
})

module.exports = router