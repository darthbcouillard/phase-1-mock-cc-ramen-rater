// write your code here
document.addEventListener("DOMContentLoaded", () => {
    getRamen()

})
const submitRamen = document.getElementById("new-ramen")
submitRamen.addEventListener("submit", createNewRamen)


function getRamen() {
    fetch("http://localhost:3000/ramens")
    .then(res => res.json())
    .then (data => {
        const ramens = data
        ramens.map(ramen => displayImage(ramen))
    })
}


function displayImage(ramen) {
    const imageContainer = document.getElementById("ramenMenu")
    const img = document.createElement("img")
    img.src = ramen.image
    img.addEventListener("click", () => ramenDetails(ramen))
    imageContainer.append(img)
}


function ramenDetails(ramen) {
    const ramenImage = document.getElementById("detailImage")
    ramenImage.src = ramen.image
    const ramenName = document.getElementById("detailName")
    ramenName.innerText = ramen.name
    const restaurantName = document.getElementById("detailRestaurant")
    restaurantName.innerText = ramen.restaurant
    const ramenRating = document.getElementById("rating-display")
    ramenRating.innerText = ramen.rating
    const ramenComment = document.getElementById("comment-display")
    ramenComment.innerText = ramen.comment

}

function createNewRamen() {
    event.preventDefault()
    const name = document.getElementById("new-name").value
    const restaurant = document.getElementById("new-restaurant").value
    const image = document.getElementById("new-image").value
    const rating = document.getElementById("new-rating").value
    const comment = document.getElementById("new-comment").value
    const ramen = {name, restaurant, image, rating, comment}
    displayImage(ramen)
}