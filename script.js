// Getting input value or note to save and display in local storage...
let getNote = document.getElementById("form-input");
let mode = document.querySelector(".light-mode-icon");
let formSelector = document.getElementsByTagName("form");

// Here we have to check whether localStorage is empty or having content in it.
let arrayItem = localStorage.getItem("TODO")
  ? JSON.parse(localStorage.getItem("TODO"))
  : [];
console.log(arrayItem);

// Storing the input value in Local Storage
const storingNote = () => {
  let noteValue = getNote.value;
  arrayItem.push(noteValue);
  localStorage.setItem("TODO", JSON.stringify(arrayItem));
  // Clear the input field after processing, if needed.
  getNote.value = "";
};

// Displaying the content present in localStorage.
const displayItems = () => {
  let item = "";
  for (let i = 0; i < arrayItem.length; i++) {
    item += `<div class="form border-bottom-radius-1px border-bottom-radius-none">
      <div class="form-check padding-right-1rem">
        <input
          class="form-check-input checkbox-input checkbox-js"
          type="checkbox"
          value=""
          id="flexCheckDefault1"
          placeholder="--"
          onclick = "checkboxActiveListner()"
        />
      </div>
      <p class="item-display-area margin-bottom-0">${arrayItem[i]}</p>
      <img src="./images/icon-cross.svg" alt="Cross Icon" class="img-fluid cross-icon-img">
    </div>`;
  }
  document.querySelector(".todo-list").innerHTML = item;
  activateDeleteListener(); // Fixed typo here
};

// Function to Delete Item
const activateDeleteListener = () => {
  let deleteBtn = document.querySelectorAll(".cross-icon-img");
  deleteBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      arrayItem.splice(index, 1);
      localStorage.setItem("TODO", JSON.stringify(arrayItem));
      displayItems();
    });
  });
};

// Getting input value just by pressing Enter.
getNote.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    storingNote();
    displayItems();
  }
});

// Function to change the text decoration when checkbox is activated
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".checkbox-js").forEach((checkbox, index) => {
    checkbox.addEventListener("change", () => {
      const textArea = document.querySelectorAll(".item-display-area")[index];
      if (checkbox.checked) {
        textArea.style.textDecoration = "line-through";
        textArea.style.opacity = 0.5;
      } else {
        textArea.style.textDecoration = "none";
        textArea.style.opacity = 1;
      }
    });
  });
});

// Changing Dark Mode to Light Mode
let isDarkMode = false; // Variable to track the mode

const activateModeListener = () => {
  mode.addEventListener("click", () => {
    if (isDarkMode) {
      // Toggle to light mode
      mode.src = "../images/icon-sun.svg";
      document.body.style.backgroundColor = "var(--Very-Dark-Blue)";
      // formSelector.style.backgroundColor = "var(--Very-Dark-Blue)";
      // input.style.backgroundColor = "var(--Very-Dark-Blue)";
      isDarkMode = false;
    } else {
      // Toggle to dark mode
      mode.src = "../images/icon-moon.svg";
      document.body.style.backgroundColor = "white";
      // formSelector.style.backgroundColor = "white";
      // input.style.backgroundColor = "white";
      // input.style.color = "black";
      isDarkMode = true;
    }
  });
};

// Display the initial items on page load
displayItems();
