import ViewRecommendations from 'components/ViewRecommendations';
import { getUserRecommendations } from 'interfaces/api/recommendations';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ViewYourRecommendations = () => {
  const {userDetails} = useSelector(({ globalState }) => globalState);
  const [recommendations, setRecommendations] = useState();
  const [title, setTitle] = useState();

  console.log(`=== ViewYourRecommendations.jsx #11 === ( userDetails ) =======>`, userDetails);

  useEffect(() => {
    (async () => {
      const recommendations = await getUserRecommendations(userDetails.email);
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
