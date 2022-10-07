//Api request for token


// curl -d "grant_type=client_credentials&client_id={4qgBwPSpirb0sfhKy4fnxXnZYfXz3oxidw9zGBd5TNfHgu3LDH}&client_secret={QtApSseMQP3RoSnLINI3xHaT5TRMRPA1wK7O3aRD}" https://api.petfinder.com/v2/oauth2/token

function getToken() {
  fetch('https://api.petfinder.com/v2/oauth2/token', {              //general oauth url post request template
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

// curl -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" GET https://api.petfinder.com/v2/{CATEGORY}/{ACTION}?{parameter_1}={value_1}&{parameter_2}={value_2}


function getPetData(data) {




  fetch(`https://api.petfinder.com/v2/animals`, {
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







// // //Primary getApi function
// function getApi(event, city) {
//   var city = input.value
//   var requestUrl = ``


//   //fetch URL convert to json format
//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {})
//   }