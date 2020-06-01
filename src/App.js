import React, { useReducer } from 'react';
import Header from './components/Header';
import SearchContainer from './components/SearchContainer';
import CardsSection from './components/CardsSection';
import booksReducer from './reducers/booksReducers';
import { getFormattedData } from './utils/dataUtil';
import BooksContext from './context/booksContext';

let initialState = {
  allBooks: getFormattedData(),
  selectedBooks: [],
  searchingBooks: []
};

const App = () => {
  const [books, dispatch] = useReducer(booksReducer, initialState);
  return (
    <BooksContext.Provider className="App" value={{...books, dispatch}}>
      <Header />
      <SearchContainer />
      <CardsSection />
    </BooksContext.Provider>
  );
}

export default App;
