import { getRecommendationsConnection } from '../recommendations/recommendations';

const addContributorsUpdate = async () => {
  const AddRecommendationsConnection = await getRecommendationsConnection();
  const result = await AddRecommendationsConnection.find({
    contributor_id: { $exists: true },
  }).then(docs => {
    docs.forEach(item => {
      item.set('contributors', [{ id: item.get('contributor_id') }], {
        strict: false,
      });
      item.set('contributor_id', undefined, { strict: false });
      item.set('relevance', undefined, { strict: false });
      item.save();
    });
    return docs;
  });
  console.log('Database updated!', result);
  return result;
};

const cleanTestData = async () => {
  const AddRecommendationsConnection = await getRecommendationsConnection();
  const result = await AddRecommendationsConnection.deleteMany({
    $and: [
      { contributors: { $size: 1 } },
      { 'contributors.0.id': 'johncjesus@gmail.com' },
    ],
  });
  console.log('Records deleted!', result);
  return result;
};

const updateDB = async (run = true) => {
  if (!run)
    return {
      message:
        'For security reasons please set the "run" flag to true before running the DB update script!',
    };

  return cleanTestData();
};

export { updateDB };
