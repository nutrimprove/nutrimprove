import { addUser, getDocuments } from '../../../connect/db';

const projection = {
  email: 1,
  role: 1,
  _id: 0,
};

const getCollectionResults = async (req, res) => {
  let result;

  if (req.method === 'GET') {
    const { user } = req.query;
    if (user && user.length > 0) {
      result = await getDocuments(
        'users',
        {
          email: user,
        },
        projection
      );
    } else {
      result = await getDocuments('users', {}, projection);
    }
  } else if (req.method === 'POST') {
    req.body.length
      ? (result = await addUser(req.body))
      : console.warn('No users payload!', req.body);
  }
  return res.status(200).json(result);
};

export default getCollectionResults;
