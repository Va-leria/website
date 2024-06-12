"use strict";
//==========================================
const $ = document.querySelector.bind(document);

const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");
const buttonOut = $('.button_out');
const nextButton = $('.next');
const divClass = $('.e535_294')
nextButton.classList.add("hidden");
document.getElementById('next').style.visibility='hidden';
divClass.classList.add("hidden");
document.getElementById('e535_294').style.visibility='hidden';
let index = 0;
let score = 3;

draggableElements.forEach(elem => {
  elem.addEventListener("dragstart", dragStart); 
  // elem.addEventListener("drag", drag); 
  // elem.addEventListener("dragend", dragEnd); 
});

droppableElements.forEach(elem => {
  elem.addEventListener("dragenter", dragEnter); 
  elem.addEventListener("dragover", dragOver); 
  elem.addEventListener("dragleave", dragLeave); 
  elem.addEventListener("drop", drop); 
});

// Drag and Drop Functions

//Events fired on the drag target

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id); 
}


function dragEnter(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.add("droppable-hover");
  }
}

function dragOver(event) {
  if(!event.target.classList.contains("dropped")) {
    event.preventDefault(); // Prevent default to allow drop
  }
}

function dragLeave(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
  }
}

function drop(event) {
  event.preventDefault(); // Это нужно, чтобы предотвратить стандартное поведение браузера
  event.target.classList.remove("droppable-hover");

  const draggableElementId = event.dataTransfer.getData("text"); // Получаем ID перетаскиваемого элемента
  const droppableElementData = event.target.getAttribute("data-draggable-id");
  const isCorrectMatching = draggableElementId === droppableElementData;

  if (isCorrectMatching) {
    const draggableElement = document.getElementById(draggableElementId);
    
    event.target.classList.add("dropped");
    event.target.style.backgroundColor = ''; // Убираем фон, чтобы не было цвета
    event.target.innerHTML = ''; // Очищаем текст внутри элемента

    // Клонируем перетаскиваемый элемент и добавляем его в целевой элемент
    const clonedElement = draggableElement.cloneNode(true);
    clonedElement.classList.remove("dragged");
    clonedElement.setAttribute("draggable", "false");
    event.target.appendChild(clonedElement);

    draggableElement.classList.add("dragged");
    draggableElement.setAttribute("draggable", "false");
    index += 1;
  }

  if (index === 5) {
    nextButton.classList.remove("hidden");
    document.getElementById('next').style.visibility='visible';
    divClass.classList.remove("hidden");
    document.getElementById('e535_294').style.visibility='visible';
    const data ={
      score: score
    }

    fetch('http://localhost:3030/drag_comp', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
  }

}


buttonOut.addEventListener('click', exitAlert);

function exitAlert() {
  alert('Вы уверены, что хотите выйти?');
}
