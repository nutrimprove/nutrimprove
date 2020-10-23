import ViewRecommendations from 'components/ViewRecommendations';
import { getAllRecommendations } from 'interfaces/api/recommendations';
import React, { useEffect, useState } from 'react';

const ViewAllRecommendations = () => {
  const [recommendations, setRecommendations] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    (async () => {
      const recommendations = await getAllRecommendations();
      setTitle(`All recommendations (${recommendations.length})`);
      setRecommendations(recommendations);
    })();
  }, []);

  return (
    <>
      {/* <Filters/> */}
      <ViewRecommendations title={title} recommendations={recommendations} showContributorsFilter={true}/>
    </>
  );
};

export default ViewAllRecommendations;
