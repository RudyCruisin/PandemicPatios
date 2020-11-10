const express = require('express');
const router = express.Router();
const db = require('../models');
const fetch = require('node-fetch')



async function loggedIn(req, res, next) {
    let strat;

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
    let userId = req.user.id;
    let authId = await getAuthID(userId, strat)
    let review = await db.Review.findAll({
        where: {
            UserId: authId
        }
    })


    if(req.user && review.length == 0){
        next()
    } else {
        res.redirect('/')
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

// Sends averages from all reviews for a specific restaurant and opens in a new tab as html
router.get('/restaurant/reviews/:resID', async (req, res) => {
    const resID = req.params.resID;
    let allReviews = await avgReviews(resID);
    reviewsHTML = `<html>
        <head>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
            <link rel="stylesheet" href="/review.css">
            </head>

        <body>
        <div class="container">
                <h1 class="name">${allReviews.name}</h1>
                <h4 class="review-total">${allReviews.total} Reviews</h4>
                <a href="/form"><button type="button" class="btn btn-outline-success">Add your Review</button></a>
            <div class="reviews">
                <div class="covid">
                    <h3>COVID-19 Ratings</h3>
                    <ul>
                        <li>
                            Mask Rating: <span>${allReviews.maskAvg}</span>
                        </li>
                        <li>
                            Social Distancing Rating: <span>${allReviews.socialDistancingAvg}</span>
                        </li>
                        <li>
                            Sanitation Rating: <span>${allReviews.sanitationAvg}</span>
                        </li>
                    </ul>
                </div>
                <hr>
                <div class="food">
                    <h3>Food and Service Ratings</h3>
                    <ul>
                        <li>
                            Alcohol: <span>${allReviews.alcoholAvg}% Say Yes</span>
                        </li>
                        <li>
                            Food Rating: <span>${allReviews.foodAvg}</span>
                        </li>
                        <li>
                            Service Rating: <span>${allReviews.serviceAvg}</span>
                        </li>
                    </ul>
                </div>
                <hr>
                <div class="patio">
                    <h3>Patio Ratings</h3>
                    <ul>
                        <li>
                            Atmosphere: <span>${allReviews.atmosphereAvg}</span>
                        </li>
                        <li>
                            Patio Space Rating: <span>${allReviews.patioAvg}</span>
                        </li>
                        <li>
                            Pet Friendly: <span>${allReviews.petFriendlyAvg}% Say Yes</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        </body>
    </html>`

    noReviewsHTML = `<html>
        <head>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
            <link rel="stylesheet" href="/review.css">
            </head>

        <body>
        <div class="container">
                <h1 class="name">${allReviews.name}</h1>
                <h4 class="review-total">There are no reviews yet.</h4>
                <a href="/form"><button type="button" class="btn btn-outline-success">Add your Review</button></a>
            <div class="reviews">
                <div class="covid">
        </body>
    </html>`

    if(allReviews.total === 0){
        res.send(noReviewsHTML);
    } else {
    res.send(reviewsHTML);
    }
})

async function getRestName(resID) {
    //GET THE RESTAURANT INFO
    var restaurant = await fetch(`http://localhost:9000/restaurant/getRestaurant/${resID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            },
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
    })

    restaurant = await restaurant.json();
    return restaurant[0].name
}

async function avgReviews(resID) {
    //GET ALL THE REVIEWS FOR A GIVEN RESTAURANT
    var restReviews = await fetch(`http://localhost:9000/review/restaurant/${resID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
          },
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
    })

    restReviews = await restReviews.json();

    let revLength = restReviews.length;
    let restName = await getRestName(resID);

    // Creating the variables to make averages for each category
    let maskTotal = 0;
    let socialDistancingTotal = 0;
    let sanitationTotal = 0;
    let alcoholYes = 0;
    let foodTotal = 0;
    let serviceTotal = 0;
    let atmosphere = [];
    let patioTotal = 0;
    let petFriendlyYes = 0;

    // Goes through all the reviews and sums up each category total
    for(let i=0; i<revLength; i++) {
        // sum up all the ratings for each category
        maskTotal += restReviews[i].maskRating;
        socialDistancingTotal += restReviews[i].socialDistancingRating;
        sanitationTotal += restReviews[i].sanitationRating;
        foodTotal += restReviews[i].foodRating;
        serviceTotal += restReviews[i].serviceRating;
        patioTotal += restReviews[i].patioSpaceRating;

        //keep track of the yes and no responses for alcohol and petfriendly
        if (restReviews[i].alcohol === "yes") {
            alcoholYes += 1
        }

        if (restReviews[i].petFriendly === "yes") {
            petFriendlyYes += 1
        }

        //only add an atmosphere response if it is not in the array already
        if(atmosphere.indexOf(restReviews[i].atmosphere) === -1) {
            atmosphere.push(restReviews[i].atmosphere)
        }

    }

    // Find the average of each
    let avgRestReviews = { 
        name: restName,
        total: revLength,
        maskAvg : Math.round((maskTotal / revLength) * 10) / 10,
        socialDistancingAvg : Math.round((socialDistancingTotal / revLength) * 10) / 10,
        sanitationAvg : Math.round((sanitationTotal / revLength) * 10) / 10,
        alcoholAvg: Math.round((alcoholYes / revLength) * 100),
        foodAvg : Math.round((foodTotal / revLength) * 10) / 10,
        serviceAvg : Math.round((serviceTotal / revLength) * 10) / 10,
        patioAvg : Math.round((patioTotal / revLength) * 10) / 10,
        atmosphereAvg: atmosphere,
        petFriendlyAvg: Math.round((petFriendlyYes / revLength) * 100)

    }

    return avgRestReviews
}

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
    return user[0].id
    
}




module.exports = router