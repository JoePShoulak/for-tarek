let savedCardArray = [] 
let appendingContainer = $('.cardRow')
let cardListner = $('.cardListner')

if (localStorage.getItem("saved")) {
  savedCardArray = localStorage.getItem("saved");
} 

function displayCards() {
  let localDataArray = JSON.parse(localStorage.getItem("data"))

  localDataArray[0].forEach((element,i) => {
    if (element.primary_photo_cropped) {
      // TODO: Fix this
    } else {
      element.primary_photo_cropped= ('./assets/images/comingsoon.jpg')
    }
    //Add comment explaining what we are appending
    appendingContainer.append(newCard(element, i));
  })

}

function saveFavorite() {
  let savedIndex = $(this).attr("data-index")
  console.log("saveFavorite got called")
  let savedData = localDataArray[0][+savedIndex]

  console.log(savedData)

  savedCardArray.push(savedData)
  
  localStorage.setItem("saved", JSON.stringify(savedCardArray));
}

$('.cardListner').on('click', saveFavorite)
  
displayCards();