import { getRecommendationsConnection } from '../connect';

const updateDB = async (run = false) => {
  if (!run)
    return {
      message:
        'For security reasons please set the "run" flag to true before running the DB update script!',
    };
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

export { updateDB };
