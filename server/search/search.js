import connect from '../connect';
import searchSchema from './searchSchema';

const getSearchTermConnection = () =>
  connect('SearchTerm', searchSchema, 'search_cache');

const getSearchTerm = async term => {
  const SearchTermConnection = await getSearchTermConnection();
  return SearchTermConnection.findOne({ search_term: term });
};

const addSearchTerm = async searchTermObj => {
  const SearchTerm = await getSearchTermConnection();
  const newSearchTerm = new SearchTerm(searchTermObj);
  return newSearchTerm.save();
};

export { getSearchTerm, addSearchTerm };
