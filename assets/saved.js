function displaySavedCards() {
  let localSavedDataArray = JSON.parse(localStorage.getItem("saved"))
  let appendingContainer = $('.cardRow')    

  localSavedDataArray.forEach((element, i) => {
    if (localSavedDataArray[i].primary_photo_cropped) {
      // TODO: Fix this
    } else {
      element.primary_photo_cropped = ('./assets/images/comingsoon.jpg')
    }
    //Add comment explaining what we are appending
    appendingContainer.append(newCard(element, i))
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