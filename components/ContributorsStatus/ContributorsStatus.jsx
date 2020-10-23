import ResultsTable from 'components/ResultsTable';
import { getAllRecommendations } from 'interfaces/api/recommendations';
import { getAllUsers } from 'interfaces/api/users';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const ContributorsStatus = () => {
  const [contributors, setContributors] = useState();

  useEffect(() => {
    (async () => {
      let users;
      let recommendations;
      let formattedUsers;
      await Promise.all([
        (async () => {
          users = await getAllUsers();
          formattedUsers = users.map(user => ({
            email: user.email,
            points: user.points,
            'last seen': new Date(user.updatedAt).toLocaleDateString(),
          }));
        })(),
        (async () => {
          recommendations = await getAllRecommendations();
        })(),
      ]);

      if (recommendations && formattedUsers) {
        recommendations.forEach(rec => {
          rec.contributors.forEach(({ id }) => {
            const user = formattedUsers.find(user => user.email === id);
            user.recommendations = user.recommendations ? user.recommendations += 1 : 1;
          });
        });

        setContributors(formattedUsers);
      }
    })();
  }, []);

  return (
    <>
      {contributors && <ResultsTable data={contributors} title='Contributors' sortColumns={[0, 1]}/>}
    </>
  );
};

export default ContributorsStatus;
