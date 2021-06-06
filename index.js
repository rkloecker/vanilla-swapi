// URL der API
const url = "https://swapi.dev/api/people/";
const output = document.querySelector("#output");
const moreBtn = document.querySelector("#showMore");
const rw = document.querySelector("#rw");
const dataArray = [];

let cnt = 1;
async function showResult(url) {
  let response;

  try {
    response = await fetch(url);
  } catch (error) {
    console.error("Network error", error);
  }

  if (response && response.ok) {
    const data = await response.json();
    console.log("fetched data!");
    show(data.results);
  } else rw.innerText = "no data available";
}

function show(arr) {
  console.log(arr);

  arr.forEach(({ name, mass, height, birth_year }) => {
    const item = output.content.cloneNode(true);

    item.querySelector("[data-name]").innerText = name;
    item.querySelector("[data-mass]").innerText = mass;
    item.querySelector("[data-height]").innerText = height;
    item.querySelector("[data-birthyear]").innerText = birth_year;
    rw.append(item);
  });

  moreBtn.style.display = "block";
}
function addContent(num) {
  cnt += num;
  showResult(`https://swapi.dev/api/people/?page=${cnt}`);
}
window.onload = showResult(url);
moreBtn.addEventListener("click", () => addContent(1));
