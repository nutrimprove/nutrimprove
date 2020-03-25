import { trackPromise } from 'react-promise-tracker';
import { getRequest } from './requests';

const searchTermsEndpoint = '/api/search/edamam';

const getSearchedTerms = (searchTerm, context = 'getSearchTerms') =>
  trackPromise(
    getRequest(`${searchTermsEndpoint}/${encodeURIComponent(searchTerm)}`),
    context
  );

export { getSearchedTerms };
