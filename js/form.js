const stringifyFormData = fd => {
    const data = {}
    for(let field of fd.keys()){
        data[field] = fd.get(field)
    }
    return JSON.stringify(data, null, 2)
}

const handleSubmit = e => {
    e.preventDefault();
    let restaurantId = localStorage.getItem("restaurantId");
    const data = new FormData(e.target);
    console.log(data)
    data.append('RestaurantId', restaurantId);
    const stringified = stringifyFormData(data)
    sendReview(stringified)
    window.location.assign("/")
    console.log(stringified)

}

//$("#form").on("submit", handleSubmit())

const form = document.getElementById('form')
form.addEventListener('submit', handleSubmit)


const sendReview = async (review, RestaurantId)=> {
    await fetch ('/review/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        body: review
        })
}