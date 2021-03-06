import { MIN_WIDTH } from 'helpers/constants';

export default {
  menuBar: {
    backgroundColor: '#3f51b5',
    color: 'white',
    height: 40,
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
    alignItems: 'center',
    display: 'flex',
    position: 'relative',
  },
  button: {
    fontSize: 14,
    fontWeight: 500,
    color: 'white',
    padding: '0 20px',
  },
  notice: {
    color: 'yellow',
  },
};
