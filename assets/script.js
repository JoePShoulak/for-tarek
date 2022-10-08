//Global trial zipcode:
let zipCode = 55432
let age = 'baby'
let size = 'medium'
let gender = 'male'
let good_with_children = true
let resultsArray = []
let savedArray = []

//jQuery DOM element selectors
let zipcodeInput = $('input:text')
let searchButton = $('.search-button')
let ageInput = $('#ages')
let sizeInput = $('#size')
let genderInput = $('#gender')
let kidsInput = $('#kids')



//function to make default page "no prefrence", then save last search


//event listner on search button

searchButton.on('click', function(event){
console.log(event.target)
console.log(zipcodeInput.val())
console.log(ageInput.val())
console.log(sizeInput.val())
console.log(genderInput.val())
console.log(kidsInput.val())

})



//Api request for token using the general oauth url post request template

function getToken() {
  fetch('https://api.petfinder.com/v2/oauth2/token', {              
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&client_id=4qgBwPSpirb0sfhKy4fnxXnZYfXz3oxidw9zGBd5TNfHgu3LDH&client_secret=QtApSseMQP3RoSnLINI3xHaT5TRMRPA1wK7O3aRD'
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data)
      getPetData(data)
      
    })
}

getToken();


//Getting pet data in a json object format
function getPetData(data) {

  fetch(`https://api.petfinder.com/v2/animals?type=Dog&location=${zipCode}&age=${age}&size=${size}&gender=${gender}&good_with_children=${good_with_children}`, {
    headers: {                                          //template for passing access token using Bearer 
      Authorization: `Bearer ${data.access_token}`,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) { 
      // console.log(data)
      savedArray.push(data)
    })
}

console.log(savedArray)
console.log(savedArray[0].animals)

function generateCards(savedArray) {

const appendingContainer = $('.cardRow')

for (let i = 0; i < savedArray[0].animals.length; i++) {
  const element = savedArray[0].animals[i];
  

appendingContainer.append(` <div class="card column  savedCards text-align:center">
<img id= "cardImage" src="${element.photos[0].small}" alt="Avatar" >
<div class="container">
  <h4><b>Pip</b></h4>
  <p>Labrador Retriever</p>
</div>
<ul class="list-group list-group-flush">
  <li class="list-group-item">Puppy</li>
  <li class="list-group-item">38 Miles away</li>
</ul>
<div class="card-body">
  <a href="#" class="card-link">Save</a>
  <a href="#" class="card-link">Info</a>
</div>
</div>`)

}
}

// generateCards()