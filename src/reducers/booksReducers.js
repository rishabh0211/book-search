import FindSummary from "../utils/findSummaryUtil";

const findSummary = new FindSummary();

const booksReducer = (state, action) => {
  switch (action.type) {
    case 'FILTER_BOOKS':
      let filteredBooks = action.query ? findSummary.findSummariesByQuery(action.query, action.count) : [];
      return {
        ...state,
        searchingBooks: filteredBooks
      };
    case 'ADD_SELECTED_BOOK':
      return {
        ...state,
        selectedBooks: [action.book, ...state.selectedBooks],
      };
    default:
      return state;
  }
};

export default booksReducer;