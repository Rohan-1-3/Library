const myLibrary = [];
let i=0;

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
const bookAddCancel = document.createElement("button");
const addButton = document.querySelector(".add-book");// getting the add button

// Constructor for getting info on book
function Book(title, author, pages, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

// get readStatus true false value
function bookReadStatus(){
    return readStatusInput.checked === true ? "Read" : "Not read";
}

function added(newBook){
    // creating container for holding book infos
    const newDiv = document.createElement("div");
    const title= document.createElement("p");
    const author= document.createElement("p");
    const pages= document.createElement("p");
    const readStatus= document.createElement("p")
    const readStatusCheckbox = document.createElement("input");
    const removeButton = document.createElement("button");

    // Adding class for the contianer info
    newDiv.classList.add("book-item");
    removeButton.classList.add("remove-button");
    readStatusCheckbox.type = "checkbox";

    // calling constructor value and inserting in book info
    title.textContent= `Title: ${newBook.title}`
    author.textContent= `Author: ${newBook.author}`
    pages.textContent= `Pages: ${newBook.pages}`
    readStatus.textContent= `Status: ${newBook.status}`
    readStatusCheckbox.checked = readStatusInput.checked;
    removeButton.textContent = "Remove";

    // changes read status accordingly to user
    readStatusCheckbox.addEventListener("click", ()=>{
        return readStatusCheckbox.checked === true 
        ? readStatus.textContent = "Status: Read"
        : readStatus.textContent = "Status: Not Read"})

    // inserting the book info container into the HTML file
    mainContent.appendChild(newDiv);
    newDiv.appendChild(title);
    newDiv.appendChild(author);
    newDiv.appendChild(pages);
    newDiv.appendChild(readStatus);
    newDiv.appendChild(readStatusCheckbox);
    newDiv.appendChild(removeButton);
}

// get info of book from the user
function addBookToLibrary(){
    // uppercases every first lettter of each word of the value taken and lowercases other
    const titleFull = titleInput.value;
    const titleFullSplit = titleFull.split(" ");
    const finalTitle = [];
    for(let k=0;k<titleFullSplit.length;k++){
        finalTitle[k] = titleFullSplit[k][0].toUpperCase() + titleFullSplit[k].substr(1).toLowerCase();
    }
    const title = finalTitle.join(" "); 
    // uppercases every first lettter of each word of the value taken and lowercases other
    const authorFull = authorInput.value;
    const authorFullSplit = authorFull.split(" ");
    const finalAuthor = [];
    for(let j=0;j<authorFullSplit.length;j++){
        finalAuthor[j] = authorFullSplit[j][0].toUpperCase() + authorFullSplit[j].substr(1).toLowerCase();
    }
    const author = finalAuthor.join(" ");

    const pages = pagesInput.value;
    const status = bookReadStatus();
    const newBook = new Book(title, author, pages, status);
    myLibrary[i]=newBook;
    i+=1;
    added(newBook);// calling constructor 
}


function add(){

    // setting CSS grid for main content and bookInputContainer
    container.style.display = "grid";
    container.style.gridTemplateColumns = "8fr 2fr";


    // setting textContent for label
    titleLabel.textContent = "Title";
    authorLabel.textContent = "Author";
    pagesLabel.textContent = "Pages";
    bookAddSubmit.textContent = "Submit";
    bookAddCancel.textContent = "Cancel";
    readStatusLabel.textContent = "Have you read this book?";
    
    // adding properties for different elements
    addBookForm.method = "post";
    addBook.classList.add("book-input");
    titleInput.classList.add("title-input");
    authorInput.classList.add("author-input");
    pagesInput.classList.add("pages-input");
    pagesInput.type = "number"
    readStatusInput.type = "checkbox";
    bookAddSubmit.classList.add("book-input-submit");
    bookAddCancel.classList.add("book-input-cancel");

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
    addBookForm.appendChild(bookAddCancel);
    
    titleInput.focus();
    addButton.disabled = true;// disabling the addBook button
}

function resetInputContainer(){
    // resets the value to null for further adding 
    titleInput.value = "";
    authorInput.value="";
    pagesInput.value="";
    titleInput.placeholder = "";
    authorInput.placeholder = "";
    pagesInput.placeholder = "";
    readStatusInput.checked = false;

    container.removeChild(addBook);
    container.style.display = null;
    container.style.gridTemplateColumns = null;
    container.style.backgroundColor = null;
    addButton.disabled = false;// enables back the addBook
}

function removeDiv(){// remove the respective parent of the remove button selected
    const removeButton = document.querySelectorAll(".remove-button")
    removeButton.forEach((remove)=>{
        remove.addEventListener("click", ()=>{
            ((remove.parentNode).parentNode).removeChild(remove.parentNode);
        })
    })
}

function checkInputValues(){
    if(titleInput.value === ""){
        titleInput.placeholder = "Enter Book Title!"
        titleInput.focus();
        return false;
    }
    titleInput.style.border = "0px";
    if (authorInput.value === ""){
        authorInput.placeholder = "Enter Book Author!"
        authorInput.focus();
        return false;
    }
    authorInput.style.border = "0px"
    if(pagesInput.value === ""){
        pagesInput.placeholder = "Enter number of Pages"
        pagesInput.focus();
        return false;
    }
    pagesInput.style.border = "0px"
    addBookToLibrary();
    resetInputContainer();
    return 0;
}

function submitNewBook(e){
    e.preventDefault(); // preventing form from submitting
    checkInputValues();
    removeDiv();
}

// pressing the submit button removes the bookInputContainer from HTML file
bookAddSubmit.addEventListener("click", submitNewBook)

// resets back the grid to full page
bookAddCancel.addEventListener("click", resetInputContainer);
addButton.addEventListener("click", add);// adds new section for adding book
