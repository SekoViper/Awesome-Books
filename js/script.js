// check if the localStorage has a item
let collections = JSON.parse(localStorage.getItem('books-collection')) || [];

// variables
const bookContainer = document.getElementById('book-detail');
const form = document.querySelector('form');

// create collection as page load
function createCollection(book) {
  const content = `
    <div>
      <p>${book.name}</p>
      <p>${book.author}</p>
      <button id="${book.id}">Remove</button>
      <hr>
    </div>
  `;
  // append to the DOM
  bookContainer.insertAdjacentHTML('beforeend', content);
}

// add event listener to button
function removeBook(id) {
  const btn = document.getElementById(`${id}`);

  // onclick remove item from localStorage and collections
  btn.addEventListener('click', (event) => {
    event.target.parentElement.remove();
    collections = collections.filter((book) => book.id !== id);
    // add filtered collections to localStorage
    localStorage.setItem('books-collection', JSON.stringify(collections));
  });
}

// when page loads items when pages loads and add event listener to each button item
collections.forEach((book) => {
  createCollection(book);
  removeBook(book.id);
});

form.addEventListener('submit', (event) => {
  // prevent default behavior of form
  event.preventDefault();

  const book = {
    name: form['book-title'].value,
    author: form['book-author'].value,
    // getting the ID value
    id: collections.length === 0 ? 1 : parseInt(collections.at(-1).id, 10) + 1,
  };

  // add book to the end of the collections
  collections.push(book);
  localStorage.setItem('books-collection', JSON.stringify(collections));

  // function call to create an item
  createCollection(book);
  // function call to remove item
  removeBook(book.id);
});