import { addRecommendation, getDocuments } from '../../../connect/db';

const getCollectionResults = async (req, res) => {
  const { cid } = req.query;

  let result;

  if (cid) {
    result = await getDocuments(
      'recommendations',
      {
        contributor_id: cid,
      },
      {
        food_id: 1,
        recommendation_id: 1,
        contributor_id: 1,
        _id: 0,
      }
    );
  } else if (req.method === 'POST') {
    result = [req.body[0]];
    req.body.forEach(async recommendation => {
      const addResult = await addRecommendation({
        foodId: recommendation.foodId,
        recommendationId: recommendation.recommendationId,
        contributorId: recommendation.contributorId,
      });

      result.push(addResult);
    });

    return res.status(200).json(result);
  }
};

export default getCollectionResults;
