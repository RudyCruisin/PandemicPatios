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
// async function getReviews(userId) {
//     let allReviews = await fetch(`/review/user/${userId}`)
//     allReviews = await allReviews.json() 
//     return allReviews;
// }

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
        userReviews.forEach((currentReview) => {
            review.insertAdjacentHTML('afterbegin', `<div>
                <ul> Restaurant Name: TBD
                <li> Mask Rating: ${currentReview.maskRating} </li>
                <li> Social Distancing Rating: ${currentReview.socialDistancingRating} </li>
                <li> Sanitation Rating: ${currentReview.sanitationRating} </li>
                <li> Alcohol: ${currentReview.alcohol} </li>
                <li> Food Rating: ${currentReview.foodRating} </li>
                <li> Service Rating: ${currentReview.serviceRating} </li>
                <li> Atmosphere: ${currentReview.atmosphere} </li>
                <li> Patio Space Rating: ${currentReview.patioSpaceRating} </li>
                <li> Pet Friendly: ${currentReview.petFriendly} </li>
                </ul>
                <button class="deleteRevBtn">Delete Review</button>
                <button class="updateRevBtn">Update Review</button>
                </div>`)
        })
    }
    reviewContainer.append(review);
}

showReviews();

// NEED TO ADD DELETE AND UPDATE REVIEW FUNCTIONS AND ADD TO ONCLICK
// function deleteReview() {

// }

// function updateReview() {

// }

