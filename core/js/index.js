class Home {
  constructor() {
    this.nameInput = document.getElementById("name");
    this.nameErr = document.getElementById("nameErr");
    this.nameRepeat = document.getElementById("nameRepeat");
    this.urlInput = document.getElementById("url");
    this.urlErr = document.getElementById("urlErr");
    this.searchInput = document.getElementById("searchInput");
    this.submitBtn = document.getElementById("submitBtn");
    this.updateBtn = document.getElementById("updateBtn");
    this.tableBody = document.getElementById("tableBody");

    this.allData = [];
    this.updateIndex;
    if (localStorage.getItem("bookmarkList") != null) {
      this.allData = JSON.parse(localStorage.getItem("bookmarkList"));
      this.displayData(this.allData);
    }
    this.setEvents();
    // events
    this.submitBtn.addEventListener("click", () => {
      this.addItem();
    });
    this.updateBtn.addEventListener("click", () => {
      this.updateItem();
    });
    this.nameInput.addEventListener("input", () => {
      this.validationName();
    });
    this.urlInput.addEventListener("input", () => {
      this.validationUrl();
    });
    this.searchInput.addEventListener("input", () => {
      this.search();
    });
  }

  addItem() {
    console.log("hello");
    if (this.validationName() && this.validationUrl()) {
      const item = {
        name: this.nameInput.value,
        url: this.urlInput.value,
      };
      this.allData.push(item);
      this.clearInputs();
      localStorage.setItem("bookmarkList", JSON.stringify(this.allData));
      this.displayData(this.allData);
    } else {
      console.log("no");
    }
  }

  setEvents() {
    document.querySelectorAll(".update").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.setCurrentItem(e.target.dataset.index);
      });
    });
    document.querySelectorAll(".delete").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.deleteItem(e.target.dataset.index);
      });
    });
  }

  deleteItem(index) {
    this.allData.splice(index, 1);
    localStorage.setItem("bookmarkList", JSON.stringify(this.allData));
    this.displayData(this.allData);
  }
  // update
  setCurrentItem(index) {
    this.submitBtn.classList.add("d-none");
    this.updateBtn.classList.remove("d-none");
    this.nameInput.value = this.allData[index].name;
    this.urlInput.value = this.allData[index].url;
    this.updateIndex = index;
  }

  updateItem() {
    if (this.validationName() && this.validationUrl()) {
      const item = {
        name: this.nameInput.value,
        url: this.urlInput.value,
      };
      this.allData.splice(this.updateIndex, 1, item);
      localStorage.setItem("bookmarkList", JSON.stringify(this.allData));
      this.clearInputs();
      this.displayData(this.allData);
      this.updateBtn.classList.add("d-none");
      this.submitBtn.classList.remove("d-none");
    }
  }
  // display
  displayData(arr) {
    let container = ``;
    for (let i = 0; i < arr.length; i++) {
      container += `
          <tr>
          <td>${i + 1}</td>
          <td>${arr[i].name}</td>
          <td><a href="${
            arr[i].url
          }" target="_blank" class="btn text-white" id="visitBtn"> <i class="fas fa-eye"></i> Visit</a></td>
          <td><button data-index="${i}" class="update btn bg-secondary text-white" id="this.updateBtn"><i class="fa-solid fa-pen-to-square"></i> Update</button>
          </td>
          <td>
          <button data-index="${i}" class="delete btn bg-danger text-white" id="deleteBtn"> <i class="fas fa-trash"></i> Delete</button>
          </td>
      </tr>
          `;
    }
    this.tableBody.innerHTML = container;
    this.setEvents();
  }

  clearInputs() {
    this.nameInput.value = "";
    this.urlInput.value = "";
    this.nameInput.classList.remove("is-valid");
    this.nameInput.classList.remove("is-inValid");
    this.urlInput.classList.remove("is-valid");
    this.urlInput.classList.remove("is-inValid");
  }

  // name
  validationName() {
    if (this.checkName() && !this.nameAlreadyExist(this.nameInput.value)) {
      this.nameInput.classList.add("is-valid");
      this.nameInput.classList.remove("is-inValid");
      return true;
    } else {
      this.nameInput.classList.add("is-inValid");
      this.nameInput.classList.remove("is-valid");
      return false;
    }
  }
  checkName() {
    const nameVal = this.nameInput.value;
    const nameRegex = /^[\w ]{3,12}$/;
    if (nameRegex.test(nameVal)) {
      this.nameErr.classList.add("d-none");
      return true;
    } else {
      this.nameErr.classList.remove("d-none");
      return false;
    }
  }
  nameAlreadyExist(name) {
    for (let item of this.allData) {
      if (name == item.name) {
        this.nameRepeat.classList.remove("d-none");
        return true;
      }
    }
    this.nameRepeat.classList.add("d-none");
    return false;
  }

  // url
  validationUrl() {
    if (this.checkUrl()) {
      this.urlInput.classList.add("is-valid");
      this.urlInput.classList.remove("is-inValid");
      return true;
    } else {
      this.urlInput.classList.add("is-inValid");
      this.urlInput.classList.remove("is-valid");
      return false;
    }
  }
  checkUrl() {
    const urlVal = this.urlInput.value;
    var urlRegex =
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?$/g;
    if (urlRegex.test(urlVal)) {
      this.urlErr.classList.add("d-none");
      return true;
    } else {
      this.urlErr.classList.remove("d-none");
      return false;
    }
  }

  search() {
    const newArr = this.allData.filter((item) => {
      return item.name
        .toLowerCase()
        .includes(this.searchInput.value.toLowerCase());
    });
    this.displayData(newArr);
  }
}
new Home();
