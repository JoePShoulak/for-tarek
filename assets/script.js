//jQuery DOM element selectors
let zipcodeInput = $('input:text')
let searchButton = $('.search-button')
let ageInput = $('#ages')
let sizeInput = $('#size')
let genderInput = $('#gender')
let kidsInput = $('#kids')

const dataArray = [] //Takes API data and puts into array
let searchArray = []


//function to make default page "no prefrence", then save last search

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
      getPetData(data)

    })
}

//Getting pet data in a json object format
function getPetData(data) {

  let zipCode = zipcodeInput.val()
  let age = ageInput.val()
  let size = sizeInput.val()
  let gender = genderInput.val()
  let good_with_children = kidsInput.val()


  console.log(zipCode)
  console.log(age)
  console.log(size)
  console.log(gender)
  console.log(good_with_children)


  if (localStorage.search) {
    // localStorage.clear()
    // localStorage.setItem("search", "")
    searchArray = []
  }

  searchArray.push(zipCode)
  searchArray.push(age)
  searchArray.push(size)
  searchArray.push(gender)
  searchArray.push(good_with_children)
  localStorage.setItem("search", JSON.stringify(searchArray));

  console.log(searchArray)

  fetch(`https://api.petfinder.com/v2/animals?type=Dog&location=${zipCode}&age=${age}&size=${size}&gender=${gender}&good_with_children=${good_with_children}`, {
    headers: {                                          //template for passing access token using Bearer 
      Authorization: `Bearer ${data.access_token}`,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      // console.log(data.animals) //consoles properly. it works
      dataArray.push(data.animals) //it pushes to empty array
      // console.log(dataArray[0][1].primary_photo_cropped)
      // console.log(dataArray[0][0].name)
      // console.log(dataArray[0].length)
      localStorage.setItem("data", JSON.stringify(dataArray))


      window.location.replace("./index2.html")
      
    })
}


function init() {
 let searchRetrieve = JSON.parse(localStorage.getItem("search")) || []
zipcodeInput.val(searchRetrieve[0])
ageInput.val(searchRetrieve[1])
sizeInput.val(searchRetrieve[2])
genderInput.val(searchRetrieve[3])
kidsInput.val(searchRetrieve[4])
}

init()


//event listner on search button
searchButton.on('click', getToken)
