import { Link, Typography } from '@material-ui/core';
import { PROJECT_NAME } from 'helpers/constants';
import PropTypes from 'prop-types';
import React from 'react';
import BackToMainPageLink from '../BackToMainPageLink';
import SectionHeader from '../SectionHeader';
import ContentSection from '../ContentSection';

const content = {
  title: `Help`,
  subtitle: `How to use the ${PROJECT_NAME} web application`,
};

const Help = ({ classes }) => (
  <>
    <SectionHeader content={content}/>
    <div>
      <Typography variant={'subtitle1'}>
        After logging in you will have access to 3 panels:
      </Typography>

      <div className={classes.links}>
        <Link href='#search_food' component='a'>
          [ Search Foods ]
        </Link>
        <Link href='#view_recs' component='a'>
          [ View Recommendations ]
        </Link>
        <Link href='#add_recs' component='a'>
          [ Add Recommendations ]
        </Link>
      </div>
    </div>

    <ContentSection id='search_food' title='Search Food'>
      <img
        className={classes.image}
        src='/searchfood.png'
        alt='Search food panel'
      />

      <Typography paragraph={true} variant='body1'>
        This panel will be used to search for foods and view their
        nutritional profile.
      </Typography>

      <Typography variant='body1'>
        1 - Enter the food in the search field (Type food name)
      </Typography>
      <Typography paragraph={true} variant='body2'>
        Once you filled in the food name, the application will search for
        matches and will show a dropdown with the foods available to choose
        from.
      </Typography>

      <img
        className={classes.image}
        src='/foodsdropdown.png'
        alt='Foods dropdown'
      />

      <Typography variant='body1'>
        2 - Choose a food from the dropdown (you may amend the food entered
        to refine results)
      </Typography>
      <Typography paragraph={true} variant='body2'>
        The application will lock the food chosen and will enable the
        Search button.
      </Typography>

      <Typography variant='body1'>
        3 - Press Search button once it is enabled to load the nutritional
        profile for that food.
      </Typography>
      <Typography paragraph={true} variant='body2'>
        The application will then load the information for that food and
        will display it in a table.
      </Typography>

      <img
        className={classes.image}
        src='/nutritiontable.png'
        alt='Nutrition information table'
      />

      <Typography variant='body1'>
        Note: When the loading icon is active it means the application is
        trying to load or save information.{' '}
      </Typography>
      <img
        className={classes.image}
        src='/loading.png'
        alt='Loading icon'
      />
      <Typography paragraph={true} variant='body2'>
        Loading times may vary depending on your Internet connection or the
        database load.
      </Typography>
    </ContentSection>

    <ContentSection id='view_recs' title='View Recommendations'>
      <img
        className={classes.image}
        src='/viewrecs.png'
        alt='View recommendations panel'
      />

      <Typography variant='body1'>
        The View Recommendations panel is used to simply view the
        recommendations you’ve already inserted.
      </Typography>
      <Typography paragraph={true} variant='body1'>
        Simply click the View Recommendations button to have your
        recommendations listed.
      </Typography>

      <Typography paragraph={true} variant='body2'>
        This is a work in progress and we will add more features in the
        near future (eg: ability to view all recommendations inserted by
        all contributors, ability to search a food in recommendations, etc)
      </Typography>
    </ContentSection>

    <ContentSection id='add_recs' title='Add Recommendations'>
      <img
        className={classes.image}
        src='/addrecs.png'
        alt='Add recommendations panel'
      />

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
        Once you filled in the food name, the application will search for
        matches and will show a dropdown with the foods available to choose
        from.
      </Typography>

      <Typography variant='body1'>
        2 - Choose a food from the dropdown (you may amend the food entered
        to refine results).
      </Typography>
      <Typography paragraph={true} variant='body2'>
        The application will lock the food chosen and will enable the
        Search button.
      </Typography>

      <Typography variant='body1'>
        3 - Do the same on the right panel.
      </Typography>
      <Typography paragraph={true} variant='body2'>
        In the right panel is where we enter the healthier alternative(s)
        to the foods we added in the left panel.
      </Typography>

      <Typography variant='body1'>
        4 - (optional) You may click the Add button to add additional
        foods, both in the left and right panel.
      </Typography>
      <Typography paragraph={true} variant='body2'>
        This is useful when trying to add multiple similar foods or when
        the same healthier alternative(s) may work for different foods. An
        example would be:
      </Typography>

      <img
        className={classes.image}
        src='/recs.png'
        alt='Recommendations fields'
      />

      <Typography paragraph={true} variant='body1'>
        Note that this an N to N relationship, meaning that each food will
        have all the recommendations listed in the right panel. In the
        example above we are recommending the following:
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
        The same for Doritos. The healthier options are both the kale and
        sweet potato crisps.
      </Typography>
      <Typography paragraph={true} variant='body1'>
        So in the example above we have a combination of 6 recommendations:
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
      <Typography variant='body1'>{'Doritos –> Kale Crisps'}</Typography>
      <Typography variant='body1'>
        {'Doritos –> Sweet Potato Crisp'}
      </Typography>
    </ContentSection>
    <BackToMainPageLink/>
  </>
);

Help.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Help;
