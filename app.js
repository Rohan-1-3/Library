const myLibrary = [];
for(let k =0;k<localStorage.length;k+=1){
    // unstringifies the object in localstorage and  pushes it in myLibrary array each time page loads
    myLibrary[k] = JSON.parse(localStorage.getItem(k));
}
let i=localStorage.length;

const mainContent = document.querySelector('.main-content')
const container = document.getElementById('main-container');
const errorPara = document.querySelector('.error-para');
// adding elements for bookInputContainer
const addBook = document.createElement('div');
const addBookForm = document.createElement('form');
const titleLabel = document.createElement('label');
const titleInput = document.createElement('input');
const authorLabel = document.createElement('label');
const authorInput = document.createElement('input');
const pagesLabel = document.createElement('label');
const pagesInput = document.createElement('input');
const readStatusLabel = document.createElement('label');
const readStatusInput = document.createElement('input');
const bookAddSubmit = document.createElement('button');
const bookAddCancel = document.createElement('button');
const addButton = document.querySelector('.add-book');// getting the add button

const Book = class{
    // Constructor for getting info on book
    constructor (title, author, pages, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    }

    added(){
        // creating container for holding book infos
        const newDiv = document.createElement('div');
        const title= document.createElement('p');
        const author= document.createElement('p');
        const pages= document.createElement('p');
        const readStatus= document.createElement('p')
        const removeButton = document.createElement('button');
        const readStatusCheckbox = document.createElement('input');
        readStatusCheckbox.type = 'checkbox'; 
        readStatusCheckbox.classList.add('read-status');
    
        // Adding class for the contianer info
        newDiv.classList.add('book-item');
        removeButton.classList.add('remove-button');   
        // calling constructor value and inserting in book info
        title.textContent= `Title: ${this.title}`
        author.textContent= `Author: ${this.author}`
        pages.textContent= `Pages: ${this.pages}`
        readStatus.textContent= `Status: ${this.status}`
        readStatusCheckbox.checked = readStatusInput.checked;
        removeButton.textContent = 'Remove';

    
        // changes read status accordingly to user
        readStatusCheckbox.addEventListener('click', ()=>readStatusCheckbox.checked === true 
            ? readStatus.textContent = 'Status: Read'
            : readStatus.textContent = 'Status: Not Read')

        if(this.status.toLowerCase() === 'read'){
            readStatusCheckbox.checked = true;  
        }
        // inserting the book info container into the HTML file
        mainContent.appendChild(newDiv);
        newDiv.appendChild(title);
        newDiv.appendChild(author);
        newDiv.appendChild(pages);
        newDiv.appendChild(readStatus);
        newDiv.appendChild(readStatusCheckbox);
        newDiv.appendChild(removeButton);
        
    }
}

// get readStatus true false value
function bookReadStatus(){
    return readStatusInput.checked === true ? 'Read' : 'Not read';
}

function deleteBookFromMyLibrary(removedBookTitle){ // removes book from myLibrary
    let h =0 ;
    const myLibraryTitle = myLibrary.map(bookTitle => bookTitle.title); // stores the title of all book in 1 array
    for(h=0;h<myLibrary.length;h+=1){ // loops over every element to find the removed title
        if(removedBookTitle.toLowerCase() === myLibraryTitle[h].toLowerCase()){
            myLibrary.splice(h,1);
            if(h === localStorage.length-1){ // removes the last element only from localstorage 
                localStorage.removeItem(h);
                return true;
            }
            for(let aa = h; aa<localStorage.length; aa+=1){// removes the selected element and pushes up the index number
                localStorage.setItem(aa,localStorage.getItem(aa+1));
            }
            localStorage.removeItem(localStorage.length-1);// removing duplicated last element
        }
            i-=1;
    }
    return 0;
}

function removeDiv(){// remove the respective parent of the remove button selected
    const removeButton = document.querySelectorAll('.remove-button');
    removeButton.forEach((remove)=>{
        remove.addEventListener('click', ()=>{
            ((remove.parentNode).parentNode).removeChild(remove.parentNode);

            // puts removed book title in array and joins back to string
            const removedBookTitleArray = remove.parentNode.firstChild.textContent.split(' ');
            removedBookTitleArray.shift();// array
            const removedBookTitle = removedBookTitleArray.join(' ');// string
            console.log(removedBookTitle)
            deleteBookFromMyLibrary(removedBookTitle);

        })
    })
}
// get info of book from the user
function addBookToLibrary(){
    // uppercases every first lettter of each word of the value taken and lowercases other
    const titleFull = titleInput.value;
    const titleFullSplit = titleFull.split(' ');
    const finalTitle = [];
    for(let k=0;k<titleFullSplit.length;k+=1){
        finalTitle[k] = titleFullSplit[k][0].toUpperCase() + titleFullSplit[k].substr(1).toLowerCase();
    }
    const title = finalTitle.join(' '); 
    // uppercases every first lettter of each word of the value taken and lowercases other
    const authorFull = authorInput.value;
    const authorFullSplit = authorFull.split(' ');
    const finalAuthor = [];
    for(let j=0;j<authorFullSplit.length;j+=1){
        finalAuthor[j] = authorFullSplit[j][0].toUpperCase() + authorFullSplit[j].substr(1).toLowerCase();
    }
    const author = finalAuthor.join(' ');

    const pages = pagesInput.value;
    const status = bookReadStatus();
    const newBook = new Book(title, author, pages, status);
    myLibrary[i] = newBook;
    localStorage.setItem(`${i}`,JSON.stringify(myLibrary[i])); // adds new book object in string form to localStorage
    i+=1;
    newBook.added();// calling constructor 
}


function changeReadStatus(){
    const readStatusInputChange = document.querySelectorAll('.read-status');
    readStatusInputChange.forEach((readStatus)=>{
        readStatus.addEventListener('click', ()=>{
            // puts removed book title in array and joins back to string
            const removedBookTitleArray = readStatus.parentNode.firstChild.textContent.split(' ');
            removedBookTitleArray.shift();// array
            const removedBookTitle = removedBookTitleArray.join(' ');// string
            let h =0 ;
            const myLibraryTitle = myLibrary.map(bookTitle => bookTitle.title); // stores the title of all book in 1 array
            for(h=0;h<myLibrary.length;h+=1){ // loops over every element to find the removed title
                if(removedBookTitle.toLowerCase() === myLibraryTitle[h].toLowerCase()){
                    const changingStatus = JSON.parse(localStorage.getItem(h));
                    if(changingStatus.status.toLowerCase() === 'read'){
                        changingStatus.status = 'Not Read';
                    }
                    else if(changingStatus.status.toLowerCase() === 'not read'){
                        changingStatus.status = 'Read';
                    }
                    localStorage.setItem(h,JSON.stringify(changingStatus));
                    break;
                }
        }
    return 0;
    })
    })
}

function addBookFromLibrary(){ // takes value from myLibrary and creates new book and appends them
    for(let j = 0;j<localStorage.length;j+=1){
        const recentBook = new Book(myLibrary[j].title,myLibrary[j].author,
            myLibrary[j].pages,myLibrary[j].status);
            recentBook.added();
    }
    removeDiv();
    changeReadStatus();
}

addBookFromLibrary();

function resetInputContainer(){
    // resets the value to null for further adding 
    titleInput.value = '';
    authorInput.value='';
    pagesInput.value='';
    titleInput.placeholder = '';
    authorInput.placeholder = '';
    pagesInput.placeholder = '';
    readStatusInput.checked = false;

    container.removeChild(addBook);
    container.style.display = null;
    container.style.gridTemplateColumns = null;
    container.style.backgroundColor = null;
    addButton.disabled = false;// enables back the addBook button

    addButton.classList.remove('header')
}

// checking if the book already exists in the users library
function checkBookAlreadyExists(){
    let m=0;
    const myLibraryTitle = myLibrary.map(bookTitle => bookTitle.title);
    for (m=0; m<myLibrary.length;m+=1){
        if(titleInput.value.toLowerCase() === myLibraryTitle[m].toLowerCase()){
            errorPara.style.color = 'red';
            errorPara.textContent = 'YOU ALREADY HAVE THAT BOOK IN LIBRARY';
            setInterval(()=>{
                errorPara.textContent = ''
            },3000);
            resetInputContainer();
            return false;
        }
    }
    addBookToLibrary();
    resetInputContainer();
    return 0;
}

function checkInputValues(){
    if(titleInput.value === ''){
        titleInput.placeholder = 'Enter Book Title!'
        titleInput.focus();
        return false;
    }
    titleInput.style.border = '0px';
    if (authorInput.value === ''){
        authorInput.placeholder = 'Enter Book Author!'
        authorInput.focus();
        return false;
    }
    authorInput.style.border = '0px';
    if(pagesInput.value === ''){
        pagesInput.placeholder = 'Enter number of Pages'
        pagesInput.focus();
        return false;
    }
    pagesInput.style.border = '0px'
    checkBookAlreadyExists();
    return 0;
}

function submitNewBook(e){
    e.preventDefault(); // preventing form from submitting
    checkInputValues();
    removeDiv();
    changeReadStatus();
}

function add(){

    // setting CSS grid for main content and bookInputContainer
    container.style.display = 'grid';
    container.style.gridTemplateColumns = '8fr 2fr';


    // setting textContent for label
    titleLabel.textContent = 'Title';
    authorLabel.textContent = 'Author';
    pagesLabel.textContent = 'Pages';
    bookAddSubmit.textContent = 'Submit';
    bookAddCancel.textContent = 'Cancel';
    readStatusLabel.textContent = 'Have you read this book?';
    
    // adding properties for different elements
    addBookForm.method = 'post';
    addBook.classList.add('book-input');
    titleInput.classList.add('title-input');
    authorInput.classList.add('author-input');
    pagesInput.classList.add('pages-input');
    pagesInput.type = 'number'
    readStatusInput.type = 'checkbox';
    bookAddSubmit.classList.add('book-input-submit');
    bookAddCancel.classList.add('book-input-cancel');

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

    addButton.classList.add('header');
}

addButton.addEventListener('click', add);// adds new section for adding book

// pressing the submit button removes the bookInputContainer from HTML file
bookAddSubmit.addEventListener('click', submitNewBook)

// resets back the grid to full page
bookAddCancel.addEventListener('click', resetInputContainer);
