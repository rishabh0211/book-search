import React, { useContext, useState } from "react";
import BooksContext from '../context/booksContext';

const SearchContainer = () => {
  const [selectedBook, setSelectedBook] = useState({});
  const [showDropdown, setShowDropdown] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [debouncer, setDebouncer] = useState('');
  const [showError, setShowError] = useState(false);

  const { searchingBooks, selectedBooks, dispatch } = useContext(BooksContext);

  /**
   * Debounce utility function. Will be moved to separate util
   * @param {function} func 
   * @param {number} delay 
   * @returns {function}
   */
  const debounce = (func, delay) => {
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debouncer);
      let debounceTimer = setTimeout(function () {
        func.apply(context, args);
        setShowDropdown(true);
      }, delay);
      setDebouncer(debounceTimer);
    };
  };

  /**
   * Function to attach dispatchAction function debounce
   */
  const dispatchWithDebounce = debounce(dispatchAction, 1000);

  /**
   * Handles the change in book input
   * @param {clickEvent} e 
   */
  function onInputChange(e) {
    setSelectedBook({});
    setShowError(false);
    setInputValue(e.target.value);
    dispatchWithDebounce(e.target.value);
  }

  /**
   * Dispatches the action to update selectedBooks
   * @param {string} value 
   */
  function dispatchAction(value) {
    dispatch({
      type: 'FILTER_BOOKS',
      query: value,
      count: 5
    });
  }

  /**
   * Handles the book selection from dropdown
   * @param book 
   */
  const onSelectBook = (book) => {
    return () => {
      setSelectedBook(book);
      setShowDropdown(false);
    };
  };

  /**
   * Handles the submit event
   * @param {click} e 
   */
  function onSubmitClick(e) {
    e.preventDefault();
    if (!Object.keys(selectedBook).length) return;
    let isBookAlreadySelected = checkIfAlreadySelected(selectedBook);
    if (isBookAlreadySelected) return setShowError(true);
    dispatch({
      type: 'ADD_SELECTED_BOOK',
      book: {
        title: selectedBook.title,
        author: selectedBook.author,
        summary: selectedBook.summary,
      }
    });
    setSelectedBook({});
    setInputValue('');
  }

  /**
   * Checks whether a given book is already added to the selectedBooks
   * @param book 
   */
  function checkIfAlreadySelected(book) {
    return !!selectedBooks.find(sBook => sBook.title.toLocaleLowerCase() === book.title.toLocaleLowerCase());
  }

  return (
    <div className="search-container">
      <h3 className="search-container__heading heading-secondary">
        Search through the books
      </h3>
      <div className="search-container__form">
        <form className="form">
          <div className="form__group">
            <input
              type="text"
              id="summary"
              className="form__input"
              placeholder="Enter summmary text"
              onChange={onInputChange}
              value={selectedBook.title || inputValue}
              autoComplete="off" />
            <label htmlFor="summary" className="form__label">Enter summmary text</label>
            {showError && <div className="err-msg">You've already selected this book!</div>}
            {showDropdown && searchingBooks && !!searchingBooks.length && <div className="summary__options">
              {searchingBooks.map(book => {
                return (
                  <div className="option" key={book.title} onClick={onSelectBook(book)}>{book.title}</div>
                )
              })}
            </div>}
          </div>
          <button className="search-container__button btn btn--blue" onClick={onSubmitClick}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default SearchContainer;