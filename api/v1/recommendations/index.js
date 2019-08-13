import { addRecommendation, getDocuments } from '../../../connect/db';

const getCollectionResults = async (req, res) => {
  const { cid } = req.query;
  let documents;

  if (cid) {
    documents = await getDocuments('recommendations', {
      contributor_id: cid,
    });
  } else if (req.method === 'POST') {
    documents = await addRecommendation(
      {
        foodId: req.body.foodId,
        recommendationId: req.body.recommendationId,
        contributorId: req.body.contributorId,
      },
      res
    );
  } else {
    console.warn('cid required for GET requests!');
  }
  return res.status(200).json({ documents });
};

export default getCollectionResults;
