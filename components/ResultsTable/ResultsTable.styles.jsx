export default {
  results: {
    width: '100%',
  },
  table: {
    display: 'unset',
    '& .MuiTableBody-root .MuiTableCell-root': {
      padding: '11px 16px',
      maxWidth: 430,
    },
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
  cellText: {
    fontSize: 14,
  },
  clickable: {
    cursor: 'pointer',
  },
  title: {
    marginTop: 10,
    marginBottom: 20,
  },
  titleIcon: {
    marginLeft: 8,
    verticalAlign: 'bottom',
    display: 'inline-flex',
    cursor: 'pointer',
  },
  sortIcon: {
    position: 'absolute',
  },
  pointer: {
    cursor: 'pointer',
  },
};
