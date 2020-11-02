export default {
  container: {
    textAlign: 'center',
  },
  content: {
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
    alignSelf: 'center',
  },
  button: {
    margin: 5,
    width: 220,
  },
  foodLoading: {
    position: 'absolute',
  },
  status: {
    margin: '15px 5px',
    fontWeight: 'bold',
    border: 'solid 1px lightgrey',
    borderRadius: 5,
    padding: 10,
  },
  unFlagged: {
    fontWeight: 'normal',
  },
  healthy: {
    color: 'green',
  },
  nonHealthy: {
    color: 'red',
  },
};
