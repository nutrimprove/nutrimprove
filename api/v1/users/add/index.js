import { addUser } from '../../../../connect/db';

const getCollectionResults = async (req, res) => {
  let result;

  if (req.method === 'POST' && req.body.length > 0) {
    const user = req.body;
    result = await addUser(user);
  }

  return res.json(result);
};

export default getCollectionResults;
