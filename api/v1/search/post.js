import { addSearchTerm } from '../../../connect/db';

const saveSearchTerm = async (req, res) => {
  const saved = await addSearchTerm(req.body, res);
  return saved;
};

export default saveSearchTerm;
