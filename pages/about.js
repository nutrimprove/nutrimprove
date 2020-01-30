import React from 'react';
import SectionHeader from '../components/SectionHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import { Typography } from '@material-ui/core';
import BackToMainPageLink from '../components/BackToMainPageLink';
import Section from '../components/Section';

const content = {
  title: `About`,
  subtitle: `NutrImprove - A food recommendations database`,
};

const About = ({ classes }) => {
  return (
    <>
      <div className={classes.content}>
        <SectionHeader content={content} />

        <Section>
          <Typography>
            NutrImprove is a project still in early stages with the
            objective of creating a large database of nutritional
            recommendations.
          </Typography>
          <Typography paragraph={true}>
            The NutrImprove web application will allow nutritionists,
            nutritional therapists or dietitians to recommend potential
            healthier alternatives to the foods that may not be adequate
            for optimal health.
          </Typography>
          <Typography>
            Recommendations will be stored in a database and the amount
            will grow as more contributors join the project.
          </Typography>
          <Typography paragraph={true}>
            The web application will also allow its users to search for
            foods and display their nutritional information, including
            vitamins, minerals and their RDI.
          </Typography>
          <Typography paragraph={true}>
            Contributors will have access to this data so they may quickly
            search and recommend healthier alternatives to their clients.
          </Typography>
          <Typography>
            If you are a registered nutritionist, nutritional therapist or
            dietitian and if you are interested in knowing more about this
            project please contact us via email on:
            <Link>johncjesus@gmail.com</Link>
          </Typography>
        </Section>

        <BackToMainPageLink />
      </div>
    </>
  );
};

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  content: {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD',
    minWidth: 800,
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'lightyellow',
    padding: 10,
    border: '1px solid #DDD',
  },
};

export default withStyles(styles)(About);
