import { MIN_WIDTH } from 'helpers/constants';

export default {
  menuBar: {
    backgroundColor: '#3f51b5',
    color: 'white',
    height: 48,
    position: 'relative',
    display: 'block',
    margin: '0 auto',
  },
  container: {
    width: MIN_WIDTH,
    margin: '0 auto',
    padding: '0 20px',
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
