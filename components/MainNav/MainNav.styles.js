import { MIN_WIDTH } from '../../helpers/constants';

export default {
  root: {
    flexGrow: 1,
    minWidth: MIN_WIDTH,
  },
  tabs: {
    backgroundColor: '#3f51b5',
    color: 'white',
    display: 'block',
    height: 48,
  },
  button: {
    fontSize: 14,
    fontWeight: 500,
    color: 'white',
    height: '100%',
    '&:$hover': {
      backgroundColor: '#2f41a5',
    },
    padding: '0 20px',
  },
};
