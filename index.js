// URL der API
const url = "https://swapi.dev/api/people/";
const output = document.querySelector("#output");
const moreBtn = document.querySelector("#showMore");
const goBackBtn = document.querySelector("#goback");
const dataArray = [];
// const cache = [];
let text = "";
let cnt = 1;
function showResult(url) {
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      dataArray.push(...data.results);
      show(dataArray);
    });
}

function show(data) {
  console.log(data);

  text = '<div class="row">';

  data.forEach((c) => {
    text += `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 ">
      <div class="card mb-2">
     
      <div class="card-body">
        <h5 class="card-title">${c.name}</h5>
        <hr/>
      <div class="row ">  
       <div class="col-6">Mass:</div><div class="col-6"><span class="badge badge-primary">${c.mass}</span> </div>
        </div>
        <div class="row ">    
       <div class="col-6">Height:</div><div class="col-6"><span class="badge badge-success">${c.height}</span> </div>
       </div>
       <div class="row ">  
       <div class="col-6">Birthyear:</div><div class="col-6"><span class="badge badge-info">${c.birth_year}</span> </div>
       </div>
        
      </div>
    </div>
    </div>
      `;
  });
  text += "</div>";
  moreBtn.style.display = "block";
  output.innerHTML = text;
}
function addContent(num) {
  cnt += num;
  showResult(`https://swapi.dev/api/people/?page=${cnt}`);
  if (cnt > 1) {
    goBackBtn.style.display = "block";
  } else {
    goBackBtn.style.display = "none";
  }
}
window.onload = showResult(url);
moreBtn.addEventListener("click", () => addContent(1));
goBackBtn.addEventListener("click", () => show(dataArray.slice(0, 8)));
