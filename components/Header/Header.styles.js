import { MIN_WIDTH } from '../../helpers/constants';

export default {
  header: {
    flexGrow: 1,
    minWidth: MIN_WIDTH,
  },
  logo: {
    width: 50,
    marginRight: 10,
  },
  toolbar: {
    height: 60,
    '& a': {
      marginLeft: '20px',
    },
  },
  userinfo: {
    position: 'absolute',
    right: 30,
    '& img': {
      maxWidth: 45,
      maxHeight: 45,
    },
  },
};
