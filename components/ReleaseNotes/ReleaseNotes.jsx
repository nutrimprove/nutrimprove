import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ContentSection from 'components/ContentSection';
import SectionHeader from 'components/SectionHeader';
import React from 'react';

const content = {
  title: `Release Notes`,
  subtitle: `Latest changes to the Nutrimprove web application`,
};

const versionLogs = [
  {
    version: '0.12',
    changes: [
      'Added Google Analytics',
      `Ability to sort results by column on most tables`,
      `Updated menu dropdown icons`,
      'Sticky header on tables outside of modals',
      `Fixed dropdown food duplication on View Recommendations' screens`,
      `Fix for modal panels' focus border`,
      `Updated page style to better match modern design guidelines`,
      `Added this release notes page`,
      `Disabled Help page as it has become out of date`,
    ],
  },
  {
    version: '0.11',
    changes: [
      `Added individual pages for each panel (instead of tabs) that can be navigated via URL`,
      `Implemented skeleton implementation for unit/integration tests (Jest / React Testing Library)`,
      `Setup tests to run at every commit on PR`,
      `Updated to Node 12`,
      `Refactored authentication to authenticate in one place, thus reducing duplication`,
      `Fixed small pause when loading data on Review Page screen (it now properly displays Loading panel)`,
      `Increased number of maximum repeatable fields in Bulk Recommendations to 10 (from 4)`,
      `Updated NextJS to v19.4 and refactored code to use the new Absolute Paths imports`,
      `Added a Reset Filters button to quickly reset the filters without navigating inside the Filters panel`,
    ],
  },
  {
    version: '0.10',
    changes: [
      `Replaced Redux connect() with Redux Hooks`,
      `Added dropdown menus and replaced the tabbed panels`,
      `Added subtitle to food card (nutritional info)`,
      `Added loading status to View Recommendations screens`,
      `Fixed some warnings related to mapped components' keys`,
    ],
  },
];

const ReleaseNotes = () => {
  return (
    <>
      <SectionHeader content={content}/>
      {versionLogs.map(log => (
        <ContentSection key={log.version} title={`v${log.version}`}>
          <List>
            {log.changes.map((change, index) => (
              <ListItem key={log.version + index}>
                - {change}
              </ListItem>
            ))}
          </List>
        </ContentSection>
      ))}
    </>
  );
};

export default ReleaseNotes;
