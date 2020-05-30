export default {
  results: {
    width: '100%',
  },
  table: {
    padding: '0 18px 18px 18px',
  },
  tableHeader: {
    backgroundColor: '#3F51B5',
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    minWidth: 130,
    '&:first-child': {
      borderTopLeftRadius: 9,
    },
    '&:last-child': {
      borderTopRightRadius: 9,
    },
  },
  row: {
    '&:nth-of-type(even)': {
      backgroundColor: '#f8f8f8',
    },
  },
  clickable: {
    cursor: 'pointer',
  },
  title: {
    marginTop: 25,
    marginBottom: 20,
    fontWeight: 'bold',
  },
};
