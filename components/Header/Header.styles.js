import { MIN_WIDTH } from 'helpers/constants';

export default {
  logo: {
    width: 50,
    marginRight: 10,
  },
  toolbar: {
    height: 60,
    '& a': {
      marginRight: '20px',
    },
    width: MIN_WIDTH,
    margin: '0 auto',
  },
  right: {
    position: 'absolute',
    right: 10,
    '& img': {
      maxWidth: 45,
      maxHeight: 45,
    },
  },
};
