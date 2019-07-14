import { getDocuments } from '../../../connect/db';

const getCollectionResults = async (req, res) => {
  const documents = await getDocuments('recommendations');
  return res.status(200).json({ documents });
};

export default getCollectionResults;
