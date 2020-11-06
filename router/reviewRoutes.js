const express = require('express');
const router = express.Router();
const db = require('../models');
const fetch = require('node-fetch')



function loggedIn(req, res, next) {

    if(req.user){
        next()
    } else {

    }

}




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
            UserID: userID
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

router.post('/add', loggedIn,  async (req, res)=> {
    
    const UserId = req.user.id
    const authId = await getAuthID(UserId)
    console.log(authId)
    const { maskRating, socialDistancingRating, sanitationRating, alcohol, foodRating, serviceRating, atmosphere, patioSpaceRating, petFriendly, RestaurantId } = req.body

    const newReview = await db.Review.create({
        maskRating,
        socialDistancingRating,
        sanitationRating,
        alcohol,
        foodRating,
        serviceRating,
        atmosphere,
        patioSpaceRating,
        petFriendly,
        RestaurantId,
        UserId: authId
    })

    res.send(newReview)
})

router.patch('/update/:id', async (req, res)=> {
    const { id } = req.params;

    const updateReview = await db.Review.update(req.body, {
        where: {
            id
        }
    })

    res.send(updateReview)
})




const getAuthID = async (id)=> {

    var user = await fetch(`http://localhost:9000/user/reviewUser/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
    })

    user = await user.json()

    return user[0].id
    
}




module.exports = router