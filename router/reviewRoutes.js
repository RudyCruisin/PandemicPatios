const express = require('express');
const router = express.Router();
const db = require('../models');
const fetch = require('node-fetch')



function loggedIn(req, res, next) {
    // console.log("i am here" + req.isAuthenticated())
    if(req.user){
        next()
    } else {
        res.redirect('/')
    }

}


//Sends every review back
router.get('/all', async (req, res)=> {
    // console.log(req.isAuthenticated())
    console.log(req.user)
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
    console.log(req.user.provider)
    //gets logged in user's authID
    const UserId = req.user.id
    //passes UserId to getAuthID in order to return Id of that user
    var strat;

    if (req.user.provider == "twitter") {
        strat = 1
    }
    else if (req.user.provider == "facebook") {
        strat = 2
    }
    else if (req.user.provider == "google") {
        strat = 3
    }
    else if (req.user.provider == "github") {
        strat = 4
    }

    const authId = await getAuthID(UserId, strat)
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



//returns ID field of user when passed an authID
const getAuthID = async (id, strat)=> {

    var user = await fetch(`http://localhost:9000/user/reviewUser/${id}/${strat}`, {
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
    console.log(user[0].provider)
    return user[0].id
    
}




module.exports = router