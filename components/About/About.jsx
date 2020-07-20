import { Link, Typography } from '@material-ui/core';
import { PROJECT_NAME } from 'helpers/constants';
import React from 'react';
import BackToMainPageLink from '../BackToMainPageLink';
import SectionHeader from '../SectionHeader';

const content = {
  title: `About`,
  subtitle: `About the ${PROJECT_NAME} project`,
};

const About = () => {
  return (
    <>
      <SectionHeader content={content}/>
      <Typography paragraph={true}>
        The Nutrimprove project is part of the NHS clinical entrepreneurship scheme and an initiative that aims to
        curate the world&apos;s largest database of nutritional recommendations with the help of UK-based registered
        nutritionists and dietitians.
      </Typography>
      <Typography paragraph={true}>
        The NutrImprove web application will allow nutritionists,
        nutritional therapists and dietitians to recommend healthier
        alternatives to the foods that may not be adequate for optimal
        health.
      </Typography>
      <Typography>
        Recommendations will be stored in a database which will grow as
        more contributors join the project, feeding into a deeper and
        richer source of information for all users.
      </Typography>
      <Typography paragraph={true}>
        The web application is constantly evolving and new functionalities will be added periodically. Contributors
        will have a first line of contact to provide any feedback or ideas on how to improve it.
      </Typography>
      <Typography paragraph={true}>
        Contributors will have access to this data so they may quickly
        search and recommend healthier alternatives to their clients.
      </Typography>
      <Typography>
        If you are a registered nutritionist, nutritional therapist or
        dietitian and are interested in knowing more about this project
        please contact us via email on: <Link>nutrimprove@gmail.com</Link>
      </Typography>
    </>
  );
};

export default About;
