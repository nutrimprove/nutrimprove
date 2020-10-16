export default {
  container: {
    display: 'inline-flex',
  },
  card: {
    width: 430,
    margin: 'auto',
    display: 'inline-block',
    '&:first-child': {
      margin: '0 30px 0 auto',
    },
    '&:last-child': {
      margin: '0 auto 0 30px',
    },
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    margin: 5,
    width: 220,
  },
  foodLoading: {
    position: 'absolute',
  },
};
