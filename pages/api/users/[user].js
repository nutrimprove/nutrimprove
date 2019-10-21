import {
  getUser,
  saveUser,
} from '../../../server/db';

const getCollectionResults = async (req, res) => {
  const { user } = req.query;
  if (!user) return null;

  let result = await getUser(user);
  if (!result) {
    const newUserDocument = {
      email: user,
      role: 100,
      approved: false,
    };
    result = await saveUser(newUserDocument);
    return result
      ? res.status(201).json(result)
      : res.status(500);
  }
  return res.status(200).json(result);
};

export default getCollectionResults;
