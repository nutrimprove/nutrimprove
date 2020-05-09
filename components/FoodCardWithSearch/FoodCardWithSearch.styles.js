export default {
  root: {
    display: 'inline-block',
    maxWidth: 1400,
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
  },
  search: {
    display: 'inline-flex',
    borderStyle: 'solid',
    borderWidth: 'thin',
    borderRadius: 7,
    borderColor: 'lightgray',
    padding: '10px 10px 10px 20px',
    margin: '0 auto 20px',
  },
  button: {
    margin: 10,
  },
};
