let collections = JSON.parse(localStorage.getItem('books-collection')) || [];

const bookContainer = document.getElementById('book-detail');
const form = document.querySelector('form');
const removeBtn = bookContainer.querySelector('button')

// create collection as page load
function createCollection (book, index){
    const content = `
      <div>
        <p>${book.name}</p>
        <p>${book.author}</p>
        <button id="${index}">Remove</button>
        <hr>
      </div>
    `
    // append to the DOM
    bookContainer.insertAdjacentHTML('beforeend', content);
}

collections.forEach((book, index) => {
  createCollection(book, index);
  removeBook(index);
});

form.addEventListener('submit', (event) => {
  // prevent default behavior of form
  event.preventDefault();
  let book = { name: form["book-title"].value, author: form["book-author"].value };
  collections.push(book);
  localStorage.setItem('books-collection', JSON.stringify(collections));
  createCollection(book, collections.length+1);
  removeBook(collections.length+1);
});

function removeBook (index){
  const btn = document.getElementById(`${index}`);
  btn.addEventListener('click', (event) => {
    event.target.parentElement.remove();
    collections = collections.filter(bookId => bookId !== index);
    console.log(collections);
    localStorage.setItem('books-collection', JSON.stringify(collections));
  })
}