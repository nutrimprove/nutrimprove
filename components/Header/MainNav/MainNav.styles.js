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
  welcomeText: {
    width: MIN_WIDTH,
    margin: '0 auto',
    lineHeight: '40px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.2em',
    letterSpacing: 3,
  },
  container: {
    width: MIN_WIDTH,
    margin: '0 auto',
    padding: 0,
    height: '100%',
  },
  button: {
    fontSize: 14,
    fontWeight: 500,
    color: 'white',
    padding: '0 20px',
  },
  waitingForAdmin: {
    float: 'right',
    padding: 12,
  },
};
