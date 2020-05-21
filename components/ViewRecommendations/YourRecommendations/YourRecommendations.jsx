import React, { useEffect, useState } from 'react';
import { getAllRecommendations } from '../../../interfaces/api/recommendations';
import SectionHeader from '../../SectionHeader';
import ViewRecommendations from '../ViewRecommendations';

const sectionHeader = {
  title: 'Your Recommendations',
  subtitle: 'Search and view your recommendations',
};

const YourRecommendations = () => {
  const [recommendations, setRecommendations] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    (async () => {
      const recommendations = await getAllRecommendations();
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
