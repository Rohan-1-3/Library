const myLibrary =  [];
const mainContent = document.querySelector(".main-content")
function Book(title, author, pages, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}
function addBookToLibrary(){
    const title = prompt("Enter");
    const author = prompt("Enter");
    const pages = prompt("Enter");
    const status = prompt("Enter");
    const newBook = new Book(title, author, pages, status)
    added(newBook);
}

function added(newBook){
    let newDiv = document.createElement("div");
    newDiv.classList.add("book-item");
    const para1= document.createElement("p");
    const para2= document.createElement("p");
    const para3= document.createElement("p");
    const para4= document.createElement("p");
    para1.textContent= `Title: ${newBook.title}`
    para2.textContent= `Author: ${newBook.author}`
    para3.textContent= `Pages: ${newBook.pages}`
    para4.textContent= `Statu: ${newBook.status}`
    mainContent.appendChild(newDiv);
    newDiv = newDiv.appendChild(para1);
    newDiv = newDiv.appendChild(para2);
    newDiv = newDiv.appendChild(para3);
    newDiv = newDiv.appendChild(para4);
}

