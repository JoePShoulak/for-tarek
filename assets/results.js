let savedCardArray = [] 

if (localStorage.getItem("saved")) {
  savedCardArray = localStorage.getItem("saved");
} 

function displayCards() {
  let localDataArray = JSON.parse(localStorage.getItem("data"))

  let appendingContainer = $('.cardRow')

  localDataArray[0].forEach(element => {
    if (element.primary_photo_cropped) {
      // TODO: Fix this
    } else {
      element.primary_photo_cropped= ('./assets/images/comingsoon.jpg')
    }
    //Add comment explaining what we are appending
    appendingContainer.append(` <div class="card column  savedCards text-align:center">
  <img id= "cardImage" src= "${element.primary_photo_cropped.large ? element.primary_photo_cropped.large : element.primary_photo_cropped}" alt="dog image" >
  
  <div class="container saved-group">
    <h4 class="saved-group" ><b>${element.name.length < 8 ? element.name : element.name.slice(0, 8) + '...'}</b></h4>
    <p class="saved-group2" >${element.breeds.primary.length < 15 ? element.breeds.primary : element.breeds.primary.slice(0, 15) + '..'}</p>
  </div>
  <ul class="list-group saved-group list-group-flush">
    <li class="list-group-item saved-group">${element.age} </li>
    <li class="list-group-item saved-group">${element.distance.toFixed(0)} Miles away</li>
  </ul>
  <div class="card-body saved-group">
    <button data-index=${i} class= "cardButton cardListner"><a class = "cardButtonText" class="card-link saved-group">Save</a></button>
    <button class= "cardButton "><a class = "cardButtonText" href=${element.url} target="_blank" class="card-link saved-group">Info</a></button>
  </div>
</div>`)
  })

  let cardListner = $('.cardListner')

  function saveFavorite(event) {
    let savedIndex = $(this).attr("data-index")
    let savedData = localDataArray[0][+savedIndex]

    savedCardArray.push(savedData)
    
    localStorage.setItem("saved", JSON.stringify(savedCardArray));
  }

  cardListner.on('click', saveFavorite)
  
}

displayCards();
