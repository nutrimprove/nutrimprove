import {
  getApprovedUsers,
  getNotApprovedUsers,
} from '../../../../server/users/users';

const getCollectionResults = async (req, res) => {
  const { approved } = req.query;
  if (approved === undefined)
    return res.status(400).json('Approved status not specified!');

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
