const addBooksection = document.querySelector(".add-book-section");
const toggleFormBtn = document.querySelector("#toggle-form");
const typeSelect = document.querySelector("#type");
const ebookDetails = document.querySelector("#ebook-details");
const bookForm = document.querySelector("#book-form");
const bookList = document.querySelector("#book-list");

let books = [];

toggleFormBtn.addEventListener("click", function () {
    if (addBooksection.style.display === "none") {
        addBooksection.style.display = "block";
        toggleFormBtn.innerText = "Hide Form";
    } else {
        addBooksection.style.display = "none";
        toggleFormBtn.innerText = "Add New Book";
    }
});

typeSelect.addEventListener("change", function () {
    if (typeSelect.value === "ebook") {
        ebookDetails.style.display = "block";
    } else {
        ebookDetails.style.display = "none";
    }
});

class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.id = Date.now();
        this.type = "physical";
        this.available = true;
        this.borrower = null;
    }

    borrow(name) {
        this.borrower = name;
        this.available = false;
    }

    markReturned() {
        this.borrower = null;
        this.available = true;
    }

    getHTML() {
        const card = document.createElement("div");

        card.className = `book-card ${this.available ? "available" : "borrowed"}`;
        card.dataset.id = this.id;

        card.innerHTML = `
            <h3 class="book-title">${this.title}</h3>

            <div class="book-meta">
                Author: ${this.author}
            </div>

            <div class="book-meta">
                Status: ${this.available ? "Available" : `Borrowed by ${this.borrower}`}
            </div>

            <div class="book-actions">
                <button class="${this.available ? "btn btn-borrow" : "btn btn-return"}">
                    ${this.available ? "Borrow" : "Return"}
                </button>

                <button class="btn btn-remove">
                    Remove
                </button>
            </div>
        `;

        return card;
    }
}

class Ebook extends Book {
    constructor(title, author, fileSize) {
        super(title, author);

        this.type = "ebook";
        this.fileSize = fileSize;
    }

    borrow(name) {
        this.borrower = name;
    }

    markReturned() {
        this.borrower = null;
    }

    getHTML() {
        const card = document.createElement("div");

        card.className = "book-card ebook";
        card.dataset.id = this.id;

        card.innerHTML = `
            <h3 class="book-title">${this.title}</h3>

            <div class="book-meta">
                Author: ${this.author}
            </div>

            <div class="book-meta">
                File Size: ${this.fileSize} MB
            </div>

            <div class="book-meta">
                Status: ${this.borrower ? `Downloaded by ${this.borrower}` : "Available"}
            </div>

            <div class="book-actions">
                <button class="${this.borrower ? "btn btn-return" : "btn btn-borrow"}">
                    ${this.borrower ? "Return" : "Download"}
                </button>

                <button class="btn btn-remove">
                    Remove
                </button>
            </div>
        `;

        return card;
    }
}

bookForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const type = document.querySelector("#type").value;
    const fileSize = document.querySelector("#file-size").value;

    let book;

    if (type === "ebook") {
        book = new Ebook(title, author, fileSize);
    } else {
        book = new Book(title, author);
    }

    books.push(book);

    saveBooks();
    displayBooks();

    bookForm.reset();
    ebookDetails.style.display = "none";
});

function displayBooks() {
    bookList.innerHTML = "";

    if (books.length === 0) {
        bookList.innerHTML = "<p>No Books Found</p>";
        return;
    }

    books.forEach(function (book) {
        const card = book.getHTML();
        bookList.appendChild(card);
    });

    const borrowButtons = document.querySelectorAll(".btn-borrow");

    borrowButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const bookId = Number(
                button.closest(".book-card").dataset.id
            );

            const bookBorrower = prompt("Enter borrower name");

            if (bookBorrower) {
                borrowBooks(bookId, bookBorrower);
            }
        });
    });

    const returnButtons = document.querySelectorAll(".btn-return");

    returnButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const bookId = Number(
                button.closest(".book-card").dataset.id
            );

            returnBooks(bookId);
        });
    });

    const removeButtons = document.querySelectorAll(".btn-remove");

    removeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const confirmed = confirm(
                "Are you sure you want to remove this book?"
            );

            if (!confirmed) {
                return;
            }

            const bookId = Number(
                button.closest(".book-card").dataset.id
            );

            removeBooks(bookId);
        });
    });
}

function borrowBooks(bookId, bookBorrower) {
    const book = books.find(function (book) {
        return book.id === bookId;
    });

    if (book) {
        book.borrow(bookBorrower);

        saveBooks();
        displayBooks();
    }
}

function returnBooks(bookId) {
    const book = books.find(function (book) {
        return book.id === bookId;
    });

    if (book) {
        book.markReturned();

        saveBooks();
        displayBooks();
    }
}

function removeBooks(bookId) {
    books = books.filter(function (book) {
        return book.id !== bookId;
    });

    saveBooks();
    displayBooks();
}

function saveBooks() {
    localStorage.setItem(
        "booksArray",
        JSON.stringify(books)
    );
}

function loadBooks() {
    const storedBooks = localStorage.getItem("booksArray");

    if (storedBooks !== null) {
        const bookObjects = JSON.parse(storedBooks);

        books = bookObjects.map(function (obj) {
            let book;

            if (obj.type === "ebook") {
                book = new Ebook(
                    obj.title,
                    obj.author,
                    obj.fileSize
                );
            } else {
                book = new Book(
                    obj.title,
                    obj.author
                );
            }

            book.id = obj.id;
            book.available = obj.available;
            book.borrower = obj.borrower;

            return book;
        });
    }

    displayBooks();
}

loadBooks();