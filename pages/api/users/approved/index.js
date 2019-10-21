import {
  getApprovedUsers,
  getNotApprovedUsers,
} from '../../../../server/db';

const getCollectionResults = async (req, res) => {
  const { approved } = req.query;
  if (approved === undefined) return null;

  let result;

  switch (approved) {
    case 'true':
      result = await getApprovedUsers();
      break;
    case 'false':
      result = await getNotApprovedUsers();
  }

  return result ? res.status(200).json(result) : res.status(404);
};

export default getCollectionResults;
