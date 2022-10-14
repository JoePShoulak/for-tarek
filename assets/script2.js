//add event listener
//everytime you click save, pushes object into global object
//set array into local storage
//save page different html, when you go to it, do init function(pull local storage)


let savedCardArray = [] 
if (localStorage.getItem("saved")) {
  savedCardArray = localStorage.getItem("saved");
} 



function displayCards() {

  let localDataArray = JSON.parse(localStorage.getItem("data"))
  console.log(localDataArray)


  let appendingContainer = $('.cardRow')

  for (let i = 0; i < localDataArray[0].length; i++) {
    const element = localDataArray[0][i];

    if (localDataArray[0][i].primary_photo_cropped) {
      console.log(true)
    } else {
      console.log(false)
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

  }

  let cardListner = $('.cardListner')
//card listner for save 


  
  cardListner.on('click', function(event){
    console.log($(this).attr("data-index"))
    let savedIndex = $(this).attr("data-index")
    let savedData = localDataArray[0][+savedIndex]
    savedCardArray.push(savedData)
    console.log(savedCardArray)


    

    localStorage.setItem("saved", JSON.stringify(savedCardArray));


  })
  
}



displayCards();