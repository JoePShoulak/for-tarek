//Global trial zipcode:
let zipCode = 55432
let age = 'baby'
let size = 'medium'
let gender = 'male'
let good_with_children = true
const savedArray = []

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

window.location.replace("./index2.html")

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
      // console.log(data.animals) //consoles properly. it works
      savedArray.push(data.animals) //it pushes to empty array
      console.log(savedArray[0][0])
      console.log(savedArray[0][0].name)
      console.log(savedArray[0].length)

      setTimeout(() => {
        console.log("trying a timeout")
      }, 10)
    
    
      let appendingContainer = $('.cardRow')
      
      for (let i = 0; i < savedArray[0].length; i++) {
        const element = savedArray[0][i];
        
        
      
      appendingContainer.append(` <div class="card column  savedCards text-align:center">
      <img id= "cardImage" src="${element.primary_photo_cropped.small}" alt="Avatar" >
      <div class="container saved-group">
        <h4 class="saved-group" ><b>${element.name.length < 10 ? element.name : element.name.slice(0, 10)+'...'}</b></h4>
        <p class="saved-group2" >${element.breeds.primary}</p>
      </div>
      <ul class="list-group saved-group list-group-flush">
        <li class="list-group-item saved-group">${ element.age === 'baby' ? 'puppy' : element.age } </li>
        <li class="list-group-item saved-group">${element.distance.toFixed(0)} Miles away</li>
      </ul>
      <div class="card-body saved-group">
        <a href="#" class="card-link saved-group">Save</a>
        <a href=${element.url} target="_blank" class="card-link saved-group">Info</a>
      </div>
    </div>`)
      
      }
    
     
      // generateCards()
    })
}


// console.log(savedArray)
// console.log(savedArray[0])
// console.log(savedArray[0].animals) //Gives error for some reason
// const parsedArray = JSON.parse(savedArray)

