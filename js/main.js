var data = [];
var links = document.querySelectorAll('.navbar .nav-link');

getResipec('pizza');

for ( var i=0 ; i<links.length ; i++)
{
  links[i].addEventListener('click' , function(e){
    var cureentMeal = e.target.text;
    getResipec(cureentMeal);
  })
}

function getResipec(meal)
{
  var httpRequest = new XMLHttpRequest();
  httpRequest.open('GEt' , `https://forkify-api.herokuapp.com/api/search?q=${meal}`);
  httpRequest.send();

  httpRequest.addEventListener('readystatechange' , function(){
  if(httpRequest.readyState == 4)
  {
    data = JSON.parse(httpRequest.response).recipes;
    // console.log(data)
    displayData()
  }
})
}


function displayData()
{
  var cols ="";

  for (var i=0 ; i< data.length ; i++)
  {
    cols +=
    `
    <div class="col-md-3 col-sm-6 my-2">
      <div class="test">
        <img class="w-100 height-img" src="${data[i].image_url}">
        <h5>${data[i].title}</h5>
        <a href="${data[i].source_url}" class="btn btn-primary" target="_blank">Source</a>
        <a onclick="getRecipeDetiales(${data[i].recipe_id})" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-warning" target="_blank">Details</a>
      </div>
    </div>
    `
  }

  document.getElementById('rowData').innerHTML = cols;
}


// --------- send id ----------
async function getRecipeDetiales(recipetId)
{
  var response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipetId}`)
  var result =await response.json()

  var x  = result.recipe.ingredients;
  
  var cartonaIng=``
  for(var i=0 ; i<x.length ; i++)
  {
    cartonaIng+= `( ${i+1} ) -  ${x[i]} <br/>`
  }
  console.log(cartonaIng);

  var rescepieDetialsData = 
  `
  <img class="w-100 height-img" src="${result.recipe.image_url}" >
  <h2>${result.recipe.publisher}</h2>
  <div>${cartonaIng}</div>
  `
 //
  
  document.getElementById('bodyPoper').innerHTML = rescepieDetialsData;
}

