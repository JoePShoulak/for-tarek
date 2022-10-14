let dataArray = [] //Takes API data and puts into array

// Perform the main search and navigate to the new page with the relevant data
function searchAndDisplayResults(search, data) {
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

  searchAndDisplayResults(search, data);
}

function init() {
  populateForm();
}

init()

//event listner on search button
searchButton.on('click', getToken)
