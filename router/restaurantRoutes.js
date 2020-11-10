const express = require('express');
const router = express.Router();
const db = require('../models');
const fetch = require('node-fetch');
const { route } = require('../strategy/google');


//Adds a restaurant to the Restaurant table with fields from request body
router.post('/add', async (req, res)=> {
    const { name, street_number, route, locality, administrative_area_level_1, postal_code, phoneNumber, lat, lng } = req.body
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

//gets all restaurants from DB
router.get('/getAll', async (req, res) => {
    const restaurants = await db.Restaurant.findAll();
    res.json(restaurants);
});

//gets restaurant by DB
router.get('/getRestaurant/:id', async (req, res) => {
    const restId = req.params.id;
    const restaurant = await db.Restaurant.findAll({
        where: {
            id: restId
        }
    })
        res.send(restaurant)
});

//deletes restaurant from DB 
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

router.get('/weather', async (req,res) => {
    console.log(req.query)
    const {lat,lng} = req.query
    console.log(lat,lng)
    await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&appid=${process.env.OW_API_KEY}`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err))
})

router.get('/testing123', (req,res) => {
    console.log("I AM HERE")
    res.json({"is": "working"})
})


module.exports = router