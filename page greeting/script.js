let heading = document.getElementById("mainHeading");
heading.innerText = "Welcome to DOM!";

let para = document.getElementById("para");
para.style.color = "green";

let info = document.getElementById("info");
info.innerHTML = "<strong>This is bold text now!</strong>";

let notes = document.querySelectorAll(".note");

notes.forEach(function(note) {
    note.style.fontStyle = "italic";
});

let container = document.getElementById("container");

let newParagraph = document.createElement("p");
newParagraph.innerText = "This paragraph was added using JavaScript!";

container.appendChild(newParagraph);

let image = document.getElementById("myImage");
image.src = "image2.jpg";

let mainHeading = document.getElementById("main-heading");

console.log(mainHeading.innerText);

mainHeading.innerHTML = "Welcome <span>Student</span>";

let description = document.querySelector(".description");

description.textContent = "DOM is powerful";
description.style.color = "blue";console.log("Before button");


let buttons = document.querySelectorAll("button");
buttons[1].innerText = "Clicked!";

let span = document.querySelector("div span");

console.log(span.innerText);
console.log(span.textContent);