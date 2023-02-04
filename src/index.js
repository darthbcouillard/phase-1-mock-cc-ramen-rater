// write your code here
document.addEventListener("DOMContentLoaded", () => {
    getRamen()

})
const imageContainer = document.getElementById("ramenMenu")
const submitRamen = document.getElementById("new-ramen")
submitRamen.addEventListener("submit", createNewRamen)


let currentRamen
const deleteButton = document.getElementById("deleteButton")
deleteButton.addEventListener("click", () => {
    
    fetch(`http://localhost:3000/ramens/${currentRamen.id}`, {
        method: "DELETE"
        
    })
    imageContainer.innerHTML = ""
    getRamen()
    
})







function getRamen() {
    fetch("http://localhost:3000/ramens")
    .then(res => res.json())
    .then (data => {
        const ramens = data
        ramens.map(ramen => displayImage(ramen))
        ramenDetails(ramens[0])
    })
}


function displayImage(ramen) {
    const img = document.createElement("img")
    img.src = ramen.image
    img.addEventListener("click", () => ramenDetails(ramen))
    imageContainer.append(img)
}

ramenRating = document.getElementById("rating-display")
const ramenComment = document.getElementById("comment-display")

function ramenDetails(ramen) {
    currentRamen = ramen
    const ramenImage = document.getElementById("detailImage")
    ramenImage.src = ramen.image
    const ramenName = document.getElementById("detailName")
    ramenName.innerText = ramen.name
    const restaurantName = document.getElementById("detailRestaurant")
    restaurantName.innerText = ramen.restaurant
    ramenRating.innerText = ramen.rating
    ramenComment.innerText = ramen.comment
    
   
    
}

const editRamen = document.getElementById("edit-ramen")
editRamen.addEventListener("submit", editDetails)

function editDetails() {
    event.preventDefault()
    const newRating = document.getElementById("editedRating").value
    ramenRating.innerText = newRating
    const newComment = document.getElementById("editedComment").value
    ramenComment.innerText = newComment

}


function createNewRamen(event) {
    event.preventDefault()
    const name = document.getElementById("new-name").value
    const restaurant = document.getElementById("new-restaurant").value
    const image = document.getElementById("new-image").value
    const rating = document.getElementById("new-rating").value
    const comment = document.getElementById("new-comment").value
    const ramen = {name, restaurant, image, rating, comment}
    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(ramen)
    })
    .then(res => res.json())
    .then(data => {
        event.target.reset()
        displayImage(data)

    })
}