let collections = JSON.parse(localStorage.getItem('books-collection')) || [];

const bookContainer = document.getElementById('book-detail');
const form = document.querySelector('form');

// create collection as page load
function createCollection (book){
    const content = `
      <div>
        <p>${book.name}</p>
        <p>${book.author}</p>
        <button>Remove</button>
        <hr>
      </div>
    `
    // append to the DOM
    bookContainer.insertAdjacentHTML('beforeend', content);
}

collections.forEach(book => {
  createCollection(book);
});
