function cutoff(text, index) {
 return  text.length < index ? text : text.slice(0, index) + '...';
}

function displaySavedCards() {
  let localSavedDataArray = JSON.parse(localStorage.getItem("saved"))
  let appendingContainer = $('.cardRow')    

  localSavedDataArray.forEach(element => {
    if (localSavedDataArray[i].primary_photo_cropped) {
      // TODO: Fix this
    } else {
      element.primary_photo_cropped = ('./assets/images/comingsoon.jpg')
    }
    //Add comment explaining what we are appending
    appendingContainer.append(` <div class="card column  savedCards text-align:center">
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
</div>`)
  });
}

let clearListner = $('#clearID')
//card listner for save 

function clearSaved(event){
  localStorage.removeItem("saved");
  location.reload();
}

clearListner.on('click', clearSaved)

displaySavedCards();