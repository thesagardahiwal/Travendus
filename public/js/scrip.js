

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  });
// Search Engine
let searchBar1 = document.querySelector(".bar1");
let searchBar = document.querySelector(".bar");
let searchBtn1 = document.querySelector(".searchBtn1");
let searchBtn = document.querySelector(".searchBtn");
let cardLists = document.querySelectorAll(".card-listing");
let result = document.querySelector(".search-result");
let bar = "";
let btn = "";
if (document.defaultView.window.innerWidth > 809) {
  bar = searchBar;
  btn = searchBtn;
} else {
  bar = searchBar1;
  btn = searchBtn1;
}


btn.addEventListener("click", (e) => {
  e.preventDefault();
  let counter = 0;
  for (card of cardLists) {
    let textValue = card.children[2].innerText.toUpperCase();
    let sea = bar.value.toUpperCase();
    if (textValue.indexOf(sea) !== -1) {
      card.style.display = "";
      counter ++;
    } else {
      card.style.display = "none";
    }
  }
  if (counter == 0){
    result.style.display = "inline";
  } else {
    result.style.display = "none";
  }
})
// Categories
let rooms = document.querySelector(".Rooms");
let Iconic = document.querySelector(".Iconic");
let Castles = document.querySelector(".Castles");
let Beach = document.querySelector(".Beach");
let Boats = document.querySelector(".Boats");
let Campervan = document.querySelector(".Campervan");

if (rooms || Iconic || Castles || Campervan || Beach || Boats) {
  rooms.addEventListener("click", categories);
  Iconic.addEventListener("click", categories);
  Castles.addEventListener("click", categories);
  Beach.addEventListener("click", categories);
  Boats.addEventListener("click", categories);
  Campervan.addEventListener("click", categories);
}




function categories () {
  console.dir(this.classList[2])
  
  for (card of cardLists) {
    let val = card.children[3].children[2].innerText;
    if (val != `( ${this.innerText} )`) {
      card.style.display = "none";
    } else {
      card.style.display = "";
      this.style.opacity = 1;
      
    }
  }
  this.style.opacity = "";
}


  