//Global trial zipcode:
let zipCode = 55432
let age = 'baby'
let size = 'medium'
let gender = 'male'
let good_with_children = true
const savedArray = []
const trialArray = []
console.log(trialArray)

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


zipCode = zipcodeInput.val()
age = ageInput.val()
size = sizeInput.val()
gender = genderInput.val()
good_with_children = kidsInput.val()


console.log(zipCode)
console.log(age)
console.log(size)
console.log(gender)
console.log(good_with_children)

trialArray.push(zipCode)
trialArray.push(age)
trialArray.push(size)
trialArray.push(gender)
trialArray.push(good_with_children)

console.log(trialArray)
// window.location.replace("./index2.html")

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
      console.log(savedArray[0][1].primary_photo_cropped)
      console.log(savedArray[0][0].name)
      console.log(savedArray[0].length)

      setTimeout(() => {
        console.log("trying a timeout")
      }, 10)
    
    
      let appendingContainer = $('.cardRow')
      
      
      for (let i = 0; i < savedArray[0].length; i++) {
        const element = savedArray[0][i];

        if(savedArray[0][i].primary_photo_cropped){console.log(true) 
        }else {console.log(false)
         savedArray[0][i].primary_photo_cropped = ('#missing_image.jpeg')}
        
      appendingContainer.append(` <div class="card column  savedCards text-align:center">
      <img id= "cardImage" src= " ${element.primary_photo_cropped.large} " alt="dog image" >
      <div class="container saved-group">
        <h4 class="saved-group" ><b>${element.name.length < 8 ? element.name : element.name.slice(0, 8)+'...'}</b></h4>
        <p class="saved-group2" >${element.breeds.primary.length < 15 ? element.breeds.primary: element.breeds.primary.slice(0, 15)+'..'}</p>
      </div>
      <ul class="list-group saved-group list-group-flush">
        <li class="list-group-item saved-group">${element.age} </li>
        <li class="list-group-item saved-group">${element.distance.toFixed(0)} Miles away</li>
      </ul>
      <div class="card-body saved-group">
        <button class= "cardButton"><a class = "cardButtonText" href="#" class="card-link saved-group">Save</a></button>
        <button class= "cardButton"><a class = "cardButtonText" href=${element.url} target="_blank" class="card-link saved-group">Info</a></button>
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

