import React from 'react';
import SectionHeader from '../components/SectionHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { PROJECT_NAME } from '../helpers/constants';
import Link from '@material-ui/core/Link';
import { Typography } from '@material-ui/core';
import BackToMainPageLink from '../components/BackToMainPageLink';
import Section from '../components/Section';

const content = {
  title: `Help`,
  subtitle: `How to use ${PROJECT_NAME} web application`,
};

const Help = ({ classes }) => {
  return (
    <>
      <div className={classes.content}>
        <SectionHeader content={content} />
        <div>
          <Typography variant={'subtitle1'}>
            After logging in you will have access to 3 panels:
          </Typography>

          <div className={classes.links}>
            <Link href='#search'>[ Search Foods ]</Link>
            <Link href='#view'>[ View Recommendations ]</Link>
            <Link href='#add'>[ Add Recommendations ]</Link>
          </div>
        </div>

        <Section title='Search Food'>
          <img src='/searchfood.png' alt='Search food panel' />

          <Typography paragraph={true} variant='body1'>
            This panel will be used to search for foods and view their
            nutritional profile.
          </Typography>

          <Typography variant='body1'>
            1 - Enter the food in the search field (Type food name)
          </Typography>
          <Typography paragraph={true} variant='body2'>
            Once you filled in the food name, the application will search
            for matches and will show a dropdown with the foods available
            to choose from.
          </Typography>

          <img src='/foodsdropdown.png' alt='Foods dropdown' />

          <Typography variant='body1'>
            2 - Choose a food from the dropdown (you may amend the food
            entered to refine results)
          </Typography>
          <Typography paragraph={true} variant='body2'>
            The application will lock the food chosen and will enable the
            Search button.
          </Typography>

          <Typography variant='body1'>
            3 - Press Search button once it is enabled to load the
            nutritional profile for that food.
          </Typography>
          <Typography paragraph={true} variant='body2'>
            The application will then load the information for that food
            and will display it in a table.
          </Typography>

          <img
            src='/nutritiontable.png'
            alt='Nutrition information table'
          />

          <Typography paragraph={true} variant='body1'>
            Note: When the loading icon is active it means the application
            is trying to load or save information.{' '}
          </Typography>

          <img src='/loading.png' alt='Loading icon' />

          <Typography paragraph={true} variant='body2'>
            Loading times may vary depending on your Internet connection or
            the database load.
          </Typography>
        </Section>

        <Section title='View Recommendations'>
          <img src='/viewrecs.png' alt='View recommendations panel' />

          <Typography variant='body1'>
            The View Recommendations panel is used to simply view the
            recommendations you’ve already inserted.
          </Typography>
          <Typography paragraph={true} variant='body1'>
            Simply click the View Recommendations button to have your
            recommendations listed.
          </Typography>

          <Typography paragraph={true} variant='body1'>
            <i>
              This is a work in progress and we will add more features in
              the near future (eg: ability to view all recommendations
              inserted by all contributors, ability to search a food in
              recommendations, etc)
            </i>
          </Typography>
        </Section>

        <Section title='Add Recommendations'>
          <img src='/addrecs.png' alt='Add recommendations panel' />

          <Typography paragraph={true} variant='body1'>
            This is where we will be adding the recommendations which will
            populate the database.
          </Typography>

          <Typography paragraph={true} variant='body1'>
            The current process to insert a recommendation is:
          </Typography>

          <Typography variant='body1'>
            1 - Type a food in the left panel.
          </Typography>
          <Typography paragraph={true} variant='body2'>
            Once you filled in the food name, the application will search
            for matches and will show a dropdown with the foods available
            to choose from.
          </Typography>

          <Typography variant='body1'>
            2 - Choose a food from the dropdown (you may amend the food
            entered to refine results).
          </Typography>
          <Typography paragraph={true} variant='body2'>
            The application will lock the food chosen and will enable the
            Search button.
          </Typography>

          <Typography variant='body1'>
            3 - Do the same on the right panel.
          </Typography>
          <Typography paragraph={true} variant='body2'>
            In the right panel is where we enter the healthier
            alternative(s) to the foods we added in the left panel.
          </Typography>

          <Typography variant='body1'>
            4 - (optional) You may click the Add button to add additional
            foods, both in the left and right panel.
          </Typography>
          <Typography paragraph={true} variant='body2'>
            This is useful when trying to add multiple similar foods or
            when the same healthier alternative(s) may work for different
            foods. An example would be:
          </Typography>

          <img src='/recs.png' alt='Recommendations fields' />

          <Typography paragraph={true} variant='body1'>
            Note that this an N to N relationship, meaning that each food
            will have all the recommendations listed in the right panel. In
            the example above we are recommending the following:
          </Typography>

          <Typography variant='body2'>
            Trader Joe’s Crisps: Healthier alternatives are Kale Crisps and
            Sweet Potato Crisp.
          </Typography>
          <Typography variant='body2'>
            Walker’s Crisps: Healthier alternatives are the same, Kale and
            sweet potato crisps.
          </Typography>
          <Typography variant='body2'>
            The same for Doritos. The healthier options are both the kale
            and sweet potato crisps.
          </Typography>
          <Typography paragraph={true} variant='body1'>
            So in the example above we have a combination of 6
            recommendations:
          </Typography>

          <Typography variant='body1'>
            {'Trader Joe’s Crisps –> Kale Crisps'}
          </Typography>
          <Typography variant='body1'>
            {'Trader Joe’s Crisps –> Sweet Potato Crisp'}
          </Typography>
          <Typography variant='body1'>
            {'Walker’s Crisps –> Kale Crisps'}
          </Typography>
          <Typography variant='body1'>
            {'Walker’s Crisps –> Sweet Potato Crisp'}
          </Typography>
          <Typography variant='body1'>
            {'Doritos –> Kale Crisps'}
          </Typography>
          <Typography variant='body1'>
            {'Doritos –> Sweet Potato Crisp'}
          </Typography>
        </Section>
        <BackToMainPageLink />
      </div>
    </>
  );
};

Help.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  content: {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD',
    minWidth: 800,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: '#3f51b5',
    color: 'white',
    padding: 10,
    marginBottom: 0,
    borderRadius: '9px 9px 0 0',
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'lightyellow',
    padding: 10,
  },
  links: {
    textDecoration: 'none',
    fontSize: 18,
  },
  image: {
    margin: 'auto',
    display: 'block',
  },
};

export default withStyles(styles)(Help);
