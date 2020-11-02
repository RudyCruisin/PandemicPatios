const express = require('express');
const router = express.Router();
const db = require('../models');


//Adds a business to the Restaurant table with fields from request body
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

//deletes business from DB 
router.delete('/remove/:id', async (req, res)=> {
    const id = req.params.id

    const deleteRest = await db.Restaurant.destroy({
        where: {
            id
        }
    })
    //add functionality that removes associated reviews 
    res.send('Business Removed')

})
module.exports = router