// GET USERID WHEN LOGGED IN

// GET ALL REVIEWS FROM DB
function getReviews(userId) {
    return fetch(`/review/user/${userId}`)
    .then(response => response.json())
    .then((data) => {
        console.log("you are in the getReviews()", data)
        return data
    })
    .catch(err => console.log(err))
}

// GET RESTAURANT NAME BY RestaurantId
async function getRestaurantName(RestaurantId) {
    let restName = await fetch(`/restaurant/getRestaurant/${RestaurantId}`);
    let data = await restName.json()
    return data[0].name;
}

// SHOW ALL REVIEWS FOR A USER
async function showReviews() {
    // need to add userId as parameter, hardcode right now for testing
    let userReviews = await getReviews(6);
    console.log(userReviews);

    // declare html DOM variables
    let reviewContainer = document.getElementById("user-reviews-container");
    let review = document.createElement("div");

    // if user has no reviews, show that there are no reviews yet on their review page. 
    // if user has at least one review, show each review on their review page.
    if (userReviews.length === 0) {
        review.innerHTML = `<div>You have no reviews yet!</div>
        <a href="/">Start Reviewing Today</a>`;
    } else {
        for (let i=0; i<userReviews.length; i++) {
            let restName = await getRestaurantName(userReviews[i].RestaurantId); //can't use forEach with await, so decided to use a for loop
            review.insertAdjacentHTML('afterbegin', `<div>
                <ul> Restaurant Name: ${restName}
                <li> Mask Rating: ${userReviews[i].maskRating} </li>
                <li> Social Distancing Rating: ${userReviews[i].socialDistancingRating} </li>
                <li> Sanitation Rating: ${userReviews[i].sanitationRating} </li>
                <li> Alcohol: ${userReviews[i].alcohol} </li>
                <li> Food Rating: ${userReviews[i].foodRating} </li>
                <li> Service Rating: ${userReviews[i].serviceRating} </li>
                <li> Atmosphere: ${userReviews[i].atmosphere} </li>
                <li> Patio Space Rating: ${userReviews[i].patioSpaceRating} </li>
                <li> Pet Friendly: ${userReviews[i].petFriendly} </li>
                </ul>
                <button class="deleteRevBtn" onclick="deleteReview()">Delete Review</button>
                <button class="updateRevBtn" onclick="updateReview()">Update Review</button>
                </div>`)
        }
    }

    reviewContainer.append(review);
}

showReviews();

// NEED TO ADD DELETE AND UPDATE REVIEW FUNCTIONS AND ADD TO ONCLICK
function deleteReview(revId) {
    // calls delete route and deletes review from db
    alert("This functionality is coming soon...")
}

function updateReview(revId) {
    // calls update route and allows user to update review record from db
    alert("This functionality is coming soon...")
}

