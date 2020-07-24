// URL der API
const url = "https://swapi.dev/api/people/";
const output = document.querySelector("#output");
const moreBtn = document.querySelector("#showMore");
const goBackBtn = document.querySelector("#goback");
const rw = document.querySelector("#rw");
const dataArray = [];

let cnt = 1;
function showResult(url) {
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      dataArray.push(...data.results);
      show(dataArray);
    });
}

function show(el) {
  console.log(el);

  el.forEach(({ name, mass, height, birth_year }) => {
    const item = output.content.cloneNode(true);

    item.querySelector(`#name`).innerText = ` ${name}: `;
    item.querySelector("#mass").innerText = ` ${mass}`;
    item.querySelector("#height").innerText = ` ${height}`;
    item.querySelector("#birthyear").innerText = ` ${birth_year}`;
    rw.append(item);
  });

  moreBtn.style.display = "block";
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
