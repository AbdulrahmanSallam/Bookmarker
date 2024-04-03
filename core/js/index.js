const nameInput = document.getElementById("name");
const nameErr = document.getElementById("nameErr");
const nameRepeat = document.getElementById("nameRepeat");
const urlInput = document.getElementById("url");
const urlErr = document.getElementById("urlErr");
const searchInput = document.getElementById("searchInput");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");
const visitBtn = document.getElementById("visitBtn");
const deleteBtn = document.getElementById("deleteBtn");
const tableBody = document.getElementById("tableBody");

let allData = [];
let updateIndex;

if (localStorage.getItem("bookmarkList") != null) {
  allData = JSON.parse(localStorage.getItem("bookmarkList"));
  displayData(allData);
}

function addItem() {
  if (validationName() && validationUrl()) {
    const item = {
      name: nameInput.value,
      url: urlInput.value,
    };
    allData.push(item);
    clearInputs();
    localStorage.setItem("bookmarkList", JSON.stringify(allData));
    displayData(allData);
  } else {
    console.log("no");
  }
}

function deleteItem(index) {
  allData.splice(index, 1);
  localStorage.setItem("bookmarkList", JSON.stringify(allData));
  displayData(allData);
}
// update
function setCurrentItem(index) {
  submitBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  nameInput.value = allData[index].name;
  urlInput.value = allData[index].url;
  updateIndex = index;
}

function updateItem() {
  if (validationName() && validationUrl()) {
    const item = {
      name: nameInput.value,
      url: urlInput.value,
    };
    allData.splice(updateIndex, 1, item);
    localStorage.setItem("bookmarkList", JSON.stringify(allData));
    clearInputs();
    displayData(allData);
    updateBtn.classList.add("d-none");
    submitBtn.classList.remove("d-none");
  }
}
// display
function displayData(arr) {
  let container = ``;
  for (let i = 0; i < arr.length; i++) {
    container += `
        <tr>
        <td>${i + 1}</td>
        <td>${arr[i].name}</td>
        <td><a href="${
          arr[i].url
        }" target="_blank" class="btn text-white" id="visitBtn"> <i class="fas fa-eye"></i> Visit</a></td>
        <td><button onClick="setCurrentItem(${i})" class="btn bg-secondary text-white" id="updateBtn"><i class="fa-solid fa-pen-to-square"></i> Update</button>
        </td>
        <td>
        <button onClick="deleteItem(${i})" class="btn bg-danger text-white" id="deleteBtn"> <i class="fas fa-trash"></i> Delete</button>
        </td>
    </tr>
        `;
  }

  tableBody.innerHTML = container;
}

function clearInputs() {
  nameInput.value = "";
  urlInput.value = "";
  nameInput.classList.remove("is-valid");
  nameInput.classList.remove("is-inValid");
  urlInput.classList.remove("is-valid");
  urlInput.classList.remove("is-inValid");
}
// name
function checkName() {
  const nameVal = nameInput.value;
  const nameRegex = /^[\w ]{3,12}$/;
  if (nameRegex.test(nameVal)) {
    nameErr.classList.add("d-none");
    return true;
  } else {
    nameErr.classList.remove("d-none");
    return false;
  }
}

function nameAlreadyExist(name) {
  for (let item of allData) {
    if (name == item.name) {
      nameRepeat.classList.remove("d-none");
      return true;
    }
  }
  nameRepeat.classList.add("d-none");
  return false;
}

function validationName() {
  if (checkName() && !nameAlreadyExist(nameInput.value)) {
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-inValid");
    return true;
  } else {
    nameInput.classList.add("is-inValid");
    nameInput.classList.remove("is-valid");
    return false;
  }
}
// url
function checkUrl() {
  const urlVal = urlInput.value;
  var urlRegex =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?$/g;
  if (urlRegex.test(urlVal)) {
    urlErr.classList.add("d-none");
    return true;
  } else {
    urlErr.classList.remove("d-none");
    return false;
  }
}

function validationUrl() {
  if (checkUrl()) {
    urlInput.classList.add("is-valid");
    urlInput.classList.remove("is-inValid");
    return true;
  } else {
    urlInput.classList.add("is-inValid");
    urlInput.classList.remove("is-valid");
    return false;
  }
}

function search() {
  const newArr = allData.filter((item) => {
    return item.name.toLowerCase().includes(searchInput.value.toLowerCase());
  });
  displayData(newArr);
}
