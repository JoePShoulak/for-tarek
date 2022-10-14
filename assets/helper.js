/* == API FUNCTIONS == */
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
  
/* == FORM FUNCTIONS == */
//jQuery DOM element selectors
let zipcodeInput = $('input:text')
let searchButton = $('.search-button')
let ageInput = $('#ages')
let sizeInput = $('#size')
let genderInput = $('#gender')
let kidsInput = $('#kids')

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

/* == FORMATTING == */
function cutoff(text, index) {
    return  text.length < index ? text : text.slice(0, index) + '...';
}

function newCard(element, i) {
    return ` <div class="card column  savedCards text-align:center">
    <img id= "cardImage" src= "${element.primary_photo_cropped.large ? element.primary_photo_cropped.large : element.primary_photo_cropped}" alt="dog image" >
    
    <div class="container saved-group">
      <h4 class="saved-group" ><b>${cutoff(element.name, 8)}</b></h4>
      <p class="saved-group2" >${cutoff(element.breeds.primary, 15)}</p>
    </div>
    <ul class="list-group saved-group list-group-flush">
      <li class="list-group-item saved-group">${element.age} </li>
      <li class="list-group-item saved-group">${element.distance.toFixed(0)} Miles away</li>
    </ul>
    <div class="card-body saved-group">
      <button data-index=${i} class= "cardButton cardListner"><a class = "cardButtonText" class="card-link saved-group">Save</a></button>
      <button class= "cardButton "><a class = "cardButtonText" href=${element.url} target="_blank" class="card-link saved-group">Info</a></button>
    </div>
  </div>`
  }
