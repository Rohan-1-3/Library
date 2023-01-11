const mainContent = document.querySelector(".main-content")
const container = document.getElementById("main-container");
// adding elements for bookInputContainer
const addBook = document.createElement("div");
const addBookForm = document.createElement("form");
const titleLabel = document.createElement("label");
const titleInput = document.createElement("input");
const authorLabel = document.createElement("label");
const authorInput = document.createElement("input");
const pagesLabel = document.createElement("label");
const pagesInput = document.createElement("input");
const readStatusLabel = document.createElement("label");
const readStatusInput = document.createElement("input");
const bookAddSubmit = document.createElement("button");
const addButton = document.querySelector(".add-book");// getting the add button

// Constructor for getting info on book
function Book(title, author, pages, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}
// get info of book from the user
function addBookToLibrary(){
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const status = prompt("Enter");
    const newBook = new Book(title, author, pages, status)
    added(newBook);// calling constructor 
}

function added(newBook){
    // creating container for holding book infos
    const newDiv = document.createElement("div");
    const title= document.createElement("p");
    const author= document.createElement("p");
    const pages= document.createElement("p");
    const readStatus= document.createElement("p");
    const removeButton = document.createElement("button");

    // Adding class for the contianer info
    newDiv.classList.add("book-item");
    removeButton.classList.add("remove-button");

    // calling constructor value and inserting in book info
    title.textContent= `Title: ${newBook.title}`
    author.textContent= `Author: ${newBook.author}`
    pages.textContent= `Pages: ${newBook.pages}`
    readStatus.textContent= `Status: ${newBook.status}`
    removeButton.textContent = "Remove";

    // inserting the book info container into the HTML file
    mainContent.appendChild(newDiv);
    newDiv.appendChild(title);
    newDiv.appendChild(author);
    newDiv.appendChild(pages);
    newDiv.appendChild(readStatus);
    newDiv.appendChild(removeButton);
}



function add(){

    // setting CSS grid for main content and bookInputContainer
    container.style.display = "grid";
    container.style.gridTemplateColumns = "8fr 2fr";
    container.style.backgroundColor = "green";


    // setting textContent for label
    titleLabel.textContent = "Title";
    authorLabel.textContent = "Author";
    pagesLabel.textContent = "Pages";
    bookAddSubmit.textContent = "Submit";
    readStatusLabel.textContent = "Have you read this book?";
    
    // adding properties for different elements
    addBookForm.method = "post";
    addBook.classList.add("book-input");
    titleInput.classList.add("title-input");
    authorInput.classList.add("author-input");
    pagesInput.classList.add("pages-input");
    pagesInput.type = "number"
    readStatusInput.type = "checkbox";
    bookAddSubmit.classList.add("book-input-button");

    // inserting all the elements of bookInputContainer into HTML file
    container.appendChild(addBook);// creates a grid container for bookInputContainer in HTML file
    addBook.appendChild(addBookForm);
    addBookForm.appendChild(titleLabel);
    addBookForm.appendChild(titleInput);
    addBookForm.appendChild(authorLabel);
    addBookForm.appendChild(authorInput);
    addBookForm.appendChild(pagesLabel);
    addBookForm.appendChild(pagesInput);
    addBookForm.appendChild(readStatusLabel);
    addBookForm.appendChild(readStatusInput);
    addBookForm.appendChild(bookAddSubmit);
    
    
    addButton.disabled = true;// disabling the addBook button
}
function submitNewBook(e){
    e.preventDefault(); // preventing form from submitting
    addBookToLibrary();
    // resets the value to null for further adding 
    titleInput.value = "";
    authorInput.value="";
    pagesInput.value="";

    container.removeChild(addBook);
    container.style.display = null;
    container.style.gridTemplateColumns = null;
    container.style.backgroundColor = null;
    addButton.disabled = false;// enables back the addBook
}
// pressing the submit button removes the bookInputContainer from HTML file
bookAddSubmit.addEventListener("click", submitNewBook)

addButton.addEventListener("click", add);// adds new section for adding book