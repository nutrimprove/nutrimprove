import ViewRecommendations from 'components/ViewRecommendations';
import { getUserRecommendations } from 'interfaces/api/recommendations';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

const ViewYourRecommendations = () => {
  const userDetails = useSelector(({ globalState }) => globalState.userDetails, shallowEqual);
  const [recommendations, setRecommendations] = useState();
  const [title, setTitle] = useState();

  console.log(`=== ViewYourRecommendations.jsx #11 === ( userDetails ) =======>`, userDetails);

  useEffect(() => {
    (async () => {
      if (userDetails.email) {
        const recommendations = await getUserRecommendations(userDetails.email);
        setTitle(`Your recommendations (${recommendations.length})`);
        setRecommendations(recommendations);
      }
    })();
  }, [userDetails]);

  return (
    <>
      {/* <Filters/> */}
      <ViewRecommendations title={title} recommendations={recommendations}/>
    </>
  );
};

export default ViewYourRecommendations;
