export default {
  cards: {
    display: 'flex',
    width: 'auto',
    maxWidth: 1400,
    margin: 'auto',
  },
  card: {
    width: 'auto',
    margin: 'auto',
    display: 'inline-block',
    '&:first-child': {
      margin: '0 30px 0 auto',
    },
    '&:last-child': {
      margin: '0 auto 0 30px',
    }
  },
  title: {
    textAlign: 'center',
    padding: 10,
    fontWeight: 600,
    border: '1px solid lightgrey',
    borderRadius: 9,
    marginBottom: 20,
  },
  greenButton: {
    backgroundColor: 'green',
    '&:hover': {
      backgroundColor: 'darkgreen',
    },
  },
  skip: {
    position: 'relative',
    marginTop: 14,
    padding: 3,
    width: 250,
  },
  spinner: {
    right: 0,
    top: 0,
    position: 'absolute',
  },
};
