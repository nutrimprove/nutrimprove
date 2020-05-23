import React, { useEffect, useState } from 'react';
import { getAllRecommendations } from '../../../interfaces/api/recommendations';
import SectionHeader from '../../SectionHeader';
import ViewRecommendations from '../ViewRecommendations/ViewRecommendations';

const sectionHeader = {
  title: 'View All Recommendations',
  subtitle: 'Search and view existing recommendations',
};

const AllRecommendations = () => {
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
      <SectionHeader content={sectionHeader}/>
      {/* <Filters/> */}
      <ViewRecommendations title={title} recommendations={recommendations}/>
    </>
  );
};

export default AllRecommendations;
