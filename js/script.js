class AwesomeBooks {
  constructor(bookContainer, form){
  // check if the localStorage has a item
  this.collections = JSON.parse(localStorage.getItem('books-collection')) || [];

  // variables
  this.bookContainer = bookContainer;
  this.form = form;
  this.collections.forEach((book) => {
    this.createCollection(book);
    this.removeBook(book.id);
  });
  this.addFormEventListener();
  } //end of constructor

  // create collection as page load
  createCollection(book) {
    const content = `
      <div>
        <p>${book.name}</p>
        <p>${book.author}</p>
        <button id="${book.id}">Remove</button>
        <hr>
      </div>
    `;
    // append to the DOM
    this.bookContainer.insertAdjacentHTML('beforeend', content);
  }

  // add event listener to button
  removeBook(id) {
    const btn = document.getElementById(`${id}`);

    // onclick remove item from localStorage and collections
      btn.addEventListener('click', (event) => {
      event.target.parentElement.remove();
      this.collections = this.collections.filter((book) => book.id !== id);
      // add filtered collections to localStorage
      localStorage.setItem('books-collection', JSON.stringify(this.collections));
  });
}
addFormEventListener(){
  this.form.addEventListener('submit', (event) => {
    // prevent default behavior of form
    event.preventDefault();
  
    const book = {
      name: this.form['book-title'].value,
      author: this.form['book-author'].value,
      // getting the ID value
      id: this.collections.length === 0 ? 1 : parseInt(this.collections.at(-1).id, 10) + 1,
    };
  
    // add book to the end of the collections
    this.collections.push(book);
    localStorage.setItem('books-collection', JSON.stringify(this.collections));
  
    // function call to create an item
    this.createCollection(book);
    // function call to remove item
    this.removeBook(book.id);
    this.form.reset();
  });
}
} //end of class

const formElem = document.querySelector('form')
const containerElem = document.getElementById('book-detail')
const AwesomeBook = new AwesomeBooks(containerElem, formElem);
