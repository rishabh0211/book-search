import {
  booksData,
  getFormattedData
} from "./dataUtil";

/**
 * FindSummary util function
 */
function FindSummary() {
  this.data = booksData;
  this.formattedData = getFormattedData();
}

/**
 * Method to return the books matching with the query
 * @param query
 * @param count
 */
FindSummary.prototype.findSummariesByQuery = function (query, count) {
  if (!count || !query) return [];
  let formattedDataCopy = JSON.parse(JSON.stringify(this.formattedData));
  let regexes = getRegexes(query);
  return getSummariesForRegex(regexes, formattedDataCopy, count);
};

/**
 * Method to return the book matching with the regexes
 * @param regexes 
 * @param data 
 * @param count 
 */
function getSummariesForRegex(regexes, data, count) {
  let summaries = [];
  for (let regexObj of regexes) {
    let score = regexObj.score,
      regex = regexObj.regex;
    for (let book of data) {
      if (!book.added && regex.test(book.summary)) {
        book.added = true;
        summaries.push({
          ...book,
          score
        });
        if (summaries.length === count) return summaries;
      }
    }
  }
}

/**
 * Method to create and return the regexes from the given query
 * @param query
 */
function getRegexes(query) {
  let regexes = [];
  let queriesArr = query.split(' ');
  for (let j = queriesArr.length; j > 0; j--) {
    let k = 0;
    while (k + j <= queriesArr.length) {
      regexes.push({
        regex: new RegExp(queriesArr.slice(k, k + j).join(' ')),
        score: j
      });
      k++;
    }
  }
  return regexes;
}

export default FindSummary;