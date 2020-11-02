const express = require('express');
const router = express.Router();
const db = require('../models');

//Sends every review back
router.get('/all', async (req, res)=> {
    const reviews = await db.Review.findAll();
    res.send(reviews);
})
//Sends every review about a specific Restaurant
router.get('/restaurant/:resID', async (req, res)=> {
    const resID = req.params.resID;
    const resRev = await db.Review.findAll({
        where: {
            RestaurantId: resID
        }
    })
    res.send(resRev);
})
//Sends every review made by a specific user
router.get('/user/:userID', async (req, res)=> {
    const userID = req.params.userID;
    const userRev = await db.Review.findAll({
        where: {
            userID: userID
        }
    })
    res.send(userRev);
})
//Deletes a review
router.delete('/:id', async (req, res)=> {
    const id = req.params.id;
    const deletedReview = await db.Review.destroy({
        where: {
            id: id
        }
    });
    res.send(deletedReview)
})

router.post('/add', async (req, res)=> {
    const { maskRating, socialDistancingRating, sanitationRating, alcohol, foodRating, serviceRating, atmosphere, patioSpaceRating, petFriendly } = req.body

    const newReview = await db.Review.create({
        maskRating,
        socialDistancingRating,
        sanitationRating,
        alcohol,
        foodRating,
        serviceRating,
        atmosphere,
        patioSpaceRating,
        petFriendly
    })
    res.send(newReview)
})

module.exports = router