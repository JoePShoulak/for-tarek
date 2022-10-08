//Global trial zipcode:
let zipCode = 55432
let age = 'baby'
let size = 'medium'

let gender = 'male'
let good_with_children = true



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
      console.log(data)
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
      console.log(data)
    })
}
