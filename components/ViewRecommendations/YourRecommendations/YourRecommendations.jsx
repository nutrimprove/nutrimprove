import React, { useEffect, useState } from 'react';
import { getUserRecommendations } from '../../../interfaces/api/recommendations';
import SectionHeader from '../../SectionHeader';
import ViewRecommendations from '../ViewRecommendations';
import { useSelector } from 'react-redux';

const sectionHeader = {
  title: 'Your Recommendations',
  subtitle: 'Search and view your recommendations',
};

const YourRecommendations = () => {
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
      <SectionHeader content={sectionHeader}/>
      {/* <Filters/> */}
      {recommendations && <ViewRecommendations title={title} recommendations={recommendations}/>}
    </>
  );
};

export default YourRecommendations;
