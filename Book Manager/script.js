const form = document.querySelector("#bookmarkForm");
const bookmarksList = document.querySelector("#bookmarksList");
const filterBtns = document.querySelectorAll(".filter-btn");

let bookmarks = [];
let currentFilter = "All";
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let title = document.querySelector("#websiteTitle").value;
  let url = document.querySelector("#websiteUrl").value;
  let category = document.querySelector("#category").value;

  let newBookmark = {
    id: Date.now(),
    title: title,
    url: url,
    category: category
  };

  bookmarks.push(newBookmark);

  form.reset();

  save();
  show();
});
function show() {
  bookmarksList.innerHTML = "";

  let filtered = filterData(currentFilter);

  if (filtered.length === 0) {
    bookmarksList.innerHTML = "<p>No bookmarks found.</p>";
    return;
  }

  filtered.forEach((item) => {
    let div = document.createElement("div");
    div.classList.add("bookmark-item");

    div.innerHTML = `
      <div>
        <h3>${item.title}</h3>
        <a class="bookmark-link" href="${item.url}" target="_blank">${item.url}</a>
        <div class="bookmark-category">${item.category}</div>
      </div>
      <button onclick="removeBookmark(${item.id})">Delete</button>
    `;

    bookmarksList.appendChild(div);
  });
}
function filterData(type) {
  if (type === "All") return bookmarks;

  return bookmarks.filter(item => item.category === type);
}
filterBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    currentFilter = btn.dataset.category;
    show();
  });
});
function removeBookmark(id) {
  bookmarks = bookmarks.filter(item => item.id !== id);

  save();
  show();
}
function save() {
  localStorage.setItem("bookmarksData", JSON.stringify(bookmarks));
}
function load() {
  let data = localStorage.getItem("bookmarksData");

  if (data) {
    bookmarks = JSON.parse(data);
  }

  show();
}

load();