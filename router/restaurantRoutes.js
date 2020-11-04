const express = require('express');
const router = express.Router();
const db = require('../models');
const { route } = require('../strategy/google');


//Adds a business to the Restaurant table with fields from request body
router.post('/add', async (req, res)=> {
    const { name, street_number, route, locality, administrative_area_level_1, postal_code, phoneNumber, lat, lng } = req.body
    console.log(req.body);
    const newRestaurant = await db.Restaurant.create({
        name,
        streetNumber: street_number,
        streetName: route,
        city: locality,
        state: administrative_area_level_1,
        zipCode: postal_code,
        phoneNumber,
        lat,
        lng
    })

    res.send(newRestaurant)
})

//gets all business from DB
router.get('/getAll', async (req, res) => {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  });

//deletes business from DB 
router.delete('/remove/:id', async (req, res)=> {
    const id = req.params.id

    const deleteRest = await db.Restaurant.destroy({
        where: {
            id
        }
    })
    //add functionality that removes associated reviews 
    res.send('Restaurant Removed')

})
module.exports = router