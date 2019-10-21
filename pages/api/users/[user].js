import {
  getUser,
  saveUser,
} from '../../../server/db';
import { isValidEmail } from '../../../helpers/userUtils';

const getCollectionResults = async (req, res) => {
  const { user } = req.query;
  if (!user) return res.status(400).json('User not specified!');;

  let result = await getUser(user);
  if (!result && isValidEmail(user)) {
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
