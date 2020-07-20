import { Link, List, Typography } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ContentSection from 'components/ContentSection';
import Tooltip from 'components/Tooltip';
import PropTypes from 'prop-types';
import React from 'react';
import ListItem from './ListItem';

const InfoPage = ({ classes }) => {
  return (
    <>
      <div className={classes.header}>
        <Link href='/'>
          <img src='/apple_64.png' alt='Go to Nutrimprove home'/>
        </Link>
        <Typography variant='h4' className={classes.title}>Nutrimprove</Typography>
      </div>
      <div className={classes.content}>
        <ContentSection title='Who are we?'>
          <Typography variant='body2' paragraph={true}>
            We&apos;re a <Tooltip title='Nutrition and Technology'>Nutritech</Tooltip> company, dedicated to developing
            tools to nudge healthier eating choices and help dietitians and nutritionists better serve their clients.
          </Typography>
          <Typography variant='body2' paragraph={true}>
            Our mission is to improve good nutrition awareness and spread the message of its importance.
          </Typography>
        </ContentSection>

        <ContentSection title='The Nutrimprove project'>
          <Typography variant='body2' paragraph={true}>
            The Nutrimprove project is part of the NHS clinical entrepreneurship scheme and an initiative that aims to
            curate the world&apos;s largest database of nutritional recommendations with the help of UK-based registered
            nutritionists and dietitians.
          </Typography>
          <Typography variant='body2' paragraph={true}>
            The NutrImprove web application will allow nutritionists, nutritional therapists and dietitians to recommend
            healthier alternatives to the foods that may not be adequate for optimal health.
            Recommendations will be stored in a database which will grow as more contributors join the project, feeding
            into a deeper and richer source of information for all users.
          </Typography>
          <Typography variant='body2' paragraph={true}>
            The web application is constantly evolving and new functionalities will be added periodically. Contributors
            will have a first line of contact to provide any feedback or ideas on how to improve it.
          </Typography>
          <Typography variant='body2' paragraph={true}>
            Contributors will also have access to all the accumulated recommendations data so they may quickly search
            and recommend healthier alternatives to their clients.
          </Typography>
          <Typography variant='body2' paragraph={true}>
            If you are a registered nutritionist, nutritional therapist or dietitian and are interested in knowing more
            about this project please contact us via email on: <Link>nutrimprove@gmail.com</Link>
          </Typography>
        </ContentSection>

        <ContentSection title='Online event (28th July 2020)'>
          <Typography variant='body2' paragraph={true}>
            We&apos;re hosting a webinar from 18:30 to 20:00 on July 28th to update you on the impact of COVID-19 on
            food systems, nutrition and how this can be understood to better serve your clients.
          </Typography>
          <Typography variant='body2' paragraph={true}>
            We’d love your company, and you can join us here:&nbsp;
            <Link
              title='Go to Eventbrite page'
              href='https://www.eventbrite.com/e/covid-19-the-impact-on-nutrition-and-the-new-role-for-health-practitioners-tickets-109709516116'
              target='_blank'
            >
              event page
            </Link>.
          </Typography>
          <Typography variant='body2'>
            The webinar will have the following agenda:
          </Typography>
          <List>
            <ListItem
              icon={<ArrowRightAltIcon/>}
              title='How COVID-19 has impacted nutrition here in the UK'
              description='Looking at the impact of supply chains, lockdown and changing behaviours. Food availability,
              purchasing behaviours, and nutritional needs have changed'
            />
            <ListItem
              icon={<ArrowRightAltIcon/>}
              title='The importance of nutrition in combatting COVID-19'
              description='The impact of micronutrient deficiencies can vastly impact severity of COVID-19 and the
              importance of micronutrients has been brought to the forefront'
            />
            <ListItem
              icon={<ArrowRightAltIcon/>}
              title='How you can harness these trends'
              description='How you can harness these trends. To better serve existing clients and obtain new ones.
              What marketing messages can you use, and digital tools to find new clients?'
            />
            <ListItem
              icon={<ArrowRightAltIcon/>}
              title='The Nutrimprove web application'
              description='Provide a sneak peek of our exciting new product which will help health practitioners provide
            nutritional recommendations to their clients'
            />
          </List>
        </ContentSection>
      </div>
    </>
  );
};

InfoPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default InfoPage;
