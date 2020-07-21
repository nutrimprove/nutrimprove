export default {
  results: {
    width: '100%',
  },
  table: {
    padding: '0 0 18px 18px',
  },
  scrollable: {
    overflow: 'auto',
  },
  tableHeader: {
    backgroundColor: '#3F51B5',
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    minWidth: 130,
    userSelect: 'none',
    '&:first-child': {
      borderTopLeftRadius: 9,
    },
    '&:last-child': {
      borderTopRightRadius: 9,
    },
  },
  row: {
    '&:nth-of-type(even)': {
      backgroundColor: '#fafafa',
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
  sortIcon: {
    position: 'absolute',
  },
  pointer: {
    cursor: 'pointer',
  },
};
