import { GA_TRACKING_ID, IS_PRODUCTION } from 'helpers/constants';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (IS_PRODUCTION && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  } else {
    const logObj = { prod: IS_PRODUCTION, gtag: window.gtag};
    console.warn(logObj);
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (IS_PRODUCTION && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } else {
    console.warn(`Invalid 'window.gtag'!`);
  }
};
