export default {
  empty: {
    color: '#999999',
  },
  food: {
    '&:hover': {
      backgroundColor: '#e5e5ea',
    },
    paddingRight: 36,
  },
  foodsFooter: {
    textAlign: 'center',
    marginTop: 8,
    '& .MuiTypography-root': {
      fontSize: 12,
      color: 'grey',
    },
  },
  table: {
    '& .MuiTableCell-root': {
      padding: 5,
      maxWidth: 350,
    },
  },
  quantity: {
    '&.MuiTableCell-root': {
      width: 50,
    }
  },
  deleteIcon: {
    '&.MuiTableCell-root': {
      width: 40,
    }
  },
};
