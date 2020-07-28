import { getUser, getUserConnection, saveUser } from 'server/users/users';
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

const addDemoUsers = async () => {
  const users = [''];

  for(let i = 0; i < users.length; i++) {
    const userExists = await getUser(users[i]);
    if (!userExists) {
      const newUserDocument = {
        email: users[i],
        role: 200,
        points: 0,
        approved: true,
      };
      const result = await saveUser(newUserDocument);
      console.log(`Added user: `, result);
    } else {
      console.log(`Skipped already existing user: `, users[i]);
    }
  }
  return `Added ${users.length} users. Check server log for details.`;
};

const updateDB = async (run = true) => {
  if (!run)
    return {
      message:
        'For security reasons please set the "run" flag to true before running the DB update script!',
    };

  return addDemoUsers();
};

export { updateDB };
