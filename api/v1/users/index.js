import { getUser, getUsers } from '../../../connect/db';

const getCollectionResults = async (req, res) => {
  let result;

  if (req.method === 'GET') {
    const { user } = req.query;
    if (user) {
      result = await getUser(user);
    } else {
      result = await getUsers();
    }
  }
  return res.status(200).json(result);
};

export default getCollectionResults;
