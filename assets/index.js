//jQuery DOM element selectors
let zipcodeInput = $('input:text')
let searchButton = $('.search-button')
let ageInput = $('#ages')
let sizeInput = $('#size')
let genderInput = $('#gender')
let kidsInput = $('#kids')

let dataArray = [] //Takes API data and puts into array

/* == HELPER FUNCTIONS == */
// Api request for token using the general oauth url post request template
function getToken() {
  fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&client_id=4qgBwPSpirb0sfhKy4fnxXnZYfXz3oxidw9zGBd5TNfHgu3LDH&client_secret=QtApSseMQP3RoSnLINI3xHaT5TRMRPA1wK7O3aRD'
  })
  .then(response =>
    response.json()
  )
  .then(data =>
    getPetData(data)
  )
}

// Form helper functions
function getFormData() {
  return {
    zip: zipcodeInput.val(),
    age: ageInput.val(),
    size: sizeInput.val(),
    gender: genderInput.val(),
    kids: kidsInput.val()
  };
}

function populateForm() {
  let searchRetrieve = JSON.parse(localStorage.getItem("search")) || [];
  zipcodeInput.val(searchRetrieve.zip);
  ageInput.val(searchRetrieve.age);
  sizeInput.val(searchRetrieve.size);
  genderInput.val(searchRetrieve.gender);
  kidsInput.val(searchRetrieve.kids);
}

// Perform the main search and navigate to the new page with the relevant data
function searchAndDisplayResults() {
  fetch(`https://api.petfinder.com/v2/animals?type=Dog&location=${search.zip}&age=${search.age}&size=${search.size}&gender=${search.gender}&good_with_children=${search.kids}`, {
    headers: {                                          //template for passing access token using Bearer 
      Authorization: `Bearer ${data.access_token}`,
    },
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    dataArray.push(data.animals)
    localStorage.setItem("data", JSON.stringify(dataArray))
    window.location.replace("./results.html")
  })
}

//Getting pet data in a json object format
function getPetData(data) {
  let search = getFormData();

  localStorage.setItem("search", JSON.stringify(search));

  searchAndDisplayResults();
}

function init() {
  populateForm();
}

init()

//event listner on search button
searchButton.on('click', getToken)
