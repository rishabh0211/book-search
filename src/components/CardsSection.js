import React, { useContext } from "react";
import BooksContext from '../context/booksContext';

const CardsSection = () => {
  const { selectedBooks } = useContext(BooksContext);

  return (
    <div className="cards-section">
      {selectedBooks.map(({ title, summary, author }) => {
        return (
          <div className="card" key={title}>
            <div className="card__title-box">
              <div className="card__title-heading">{title}</div>
              <div className="card__title-tooltip">
                <div className="card__title-tooltip--heading">{title}</div>
                <div className="card__title-tooltip--icon"></div>
              </div>
            </div>
            <div className="card__summary">{summary}</div>
            <div className="card__author">{author}</div>
          </div>
        )
      })}
    </div>
  )
}

export default CardsSection;