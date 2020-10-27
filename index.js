document.addEventListener(
  "DOMContentLoaded",
  function () {
    setupNotes();
  },
  false
);

const list = document.getElementById("list");
const notes = document.getElementById("notes");
const addButton = document.getElementById("addBtn");
const noteInput = document.getElementById("noteInput");

function setupNotes() {
  const storedList = JSON.parse(sessionStorage.getItem("list"));

  if (storedList && storedList.length) {
    storedList.forEach((element, index) => {
      if (element.length) {
        addNote(element, index);
      }
    });
  }

  if (!list.hasChildNodes()) {
    createHelperText();
  }

  let heading = document.getElementById("heading");
  if (!heading) {
    createHeading();
  }
}

function addNote(noteContent, index) {
  const helperText = document.getElementById("helper");
  if (helperText) {
    helperText.remove();
  }

  let heading = document.getElementById("heading");
  if (!heading) {
    createHeading();
  }

  const date = new Date();
  const noteId = `${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}${index}`;

  const newNote = document.createElement("li");

  let span = document.createElement("span");
  span.id = "li_" + noteId;
  span.innerHTML = noteContent;

  let editBtn = document.createElement("a");
  editBtn.href = "#";
  editBtn.className = "waves-effect waves-light light-blue lighten-2";
  editBtn.innerHTML = "Edit";
  editBtn.addEventListener("click", editNote, false);

  let deleteBtn = document.createElement("a");
  deleteBtn.href = "#";
  deleteBtn.className = "waves-effect waves-light red darken-3";
  deleteBtn.innerHTML = "Delete";
  deleteBtn.addEventListener("click", deleteNote, false);

  newNote.appendChild(span);
  newNote.appendChild(editBtn);
  newNote.appendChild(deleteBtn);

  list.appendChild(newNote);

  noteInput.value = "";
}

function createHeading() {
  heading = document.createElement("h4");
  heading.innerHTML = "My Notes";
  heading.setAttribute("id", "heading");

  notes.insertBefore(heading, notes.childNodes[0]);
}

function createHelperText() {
  let helperText = document.createElement("p");
  helperText.innerHTML =
    "You have no notes yet, use the form below to get started!";
  helperText.setAttribute("id", "helper");

  notes.appendChild(helperText);
}

let noteId = "";

addButton.onclick = function () {
  let buttonName = this.innerText;
  if (buttonName == "Add") {
    if (!noteInput.value || noteInput.value === "" || noteInput.value === " ") {
      return false;
    }
    addNote(noteInput.value);
  }

  if (buttonName == "Edit") {
    this.innerText = "Add";
    if (!noteInput.value || noteInput.value === "" || noteInput.value === " ") {
      return false;
    }
    document.getElementById(noteId).innerHTML = noteInput.value;

    noteInput.value = "";
  }
};

function editNote() {
  addButton.innerHTML = "Edit";
  const currentNote = this.parentNode;
  const item = currentNote.getElementsByTagName("*");
  noteInput.value = item[0].innerHTML;
  noteId = item[0].id;
}

function deleteNote() {
  const currentNote = this.parentNode;
  currentNote.remove();

  const helperText = document.getElementById("helper");
  if (helperText) {
    helperText.remove();
  }
}

const colorPicker = document.getElementById("noteColour");
colorPicker.addEventListener("change", changeColour, false);

function changeColour(event) {
  const card = document.getElementById("notes");
  card.style.backgroundColor = event.target.value;
}

// Before refreshing the page, save the form data to sessionStorage
window.onbeforeunload = function () {
  const listArray = Array.from(document.querySelectorAll("#list>li"));
  let storageList = [];

  let anchors = document.getElementsByTagName("a");
  while (anchors[0]) {
    anchors[0].parentNode.removeChild(anchors[0]);
  }

  if (listArray != []) {
    listArray.forEach((item) => {
      let textContent = item.textContent;
      storageList.push(textContent);
    });
  }
  sessionStorage.setItem("list", JSON.stringify(storageList));
};
