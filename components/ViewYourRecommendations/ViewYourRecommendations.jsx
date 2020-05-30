import ViewRecommendations from 'components/ViewRecommendations';
import { getUserRecommendations } from 'interfaces/api/recommendations';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ViewYourRecommendations = () => {
  const user = useSelector(({ globalState }) => globalState.userDetails.name);
  const [recommendations, setRecommendations] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    (async () => {
      const recommendations = await getUserRecommendations(user);
      setTitle(`Your recommendations (${recommendations.length})`);
      setRecommendations(recommendations);
    })();
  }, []);

  return (
    <>
      {/* <Filters/> */}
      <ViewRecommendations title={title} recommendations={recommendations}/>
    </>
  );
};

export default ViewYourRecommendations;
