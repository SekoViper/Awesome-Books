let collections = JSON.parse(localStorage.getItem('books-collection')) || [];

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

function removeBook(id) {
  const btn = document.getElementById(`${id}`);

  btn.addEventListener('click', (event) => {
    event.target.parentElement.remove();
    collections = collections.filter((book) => book.id !== id);
    localStorage.setItem('books-collection', JSON.stringify(collections));
  });
}

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
    id: collections.length === 0 ? 1 : parseInt(collections.at(-1).id, 10) + 1,
  };

  collections.push(book);
  localStorage.setItem('books-collection', JSON.stringify(collections));

  createCollection(book);
  removeBook(book.id);
});