export default {
  container: {
    display: 'flex',
    width: '100%',
    maxWidth: 1200,
    margin: 'auto',
  },
  foodColumn: {
    width: 'calc(50% - 25px)',
    margin: '0 auto',
  },
  addToListButtonContainer: {
    margin: '20px auto',
    width: 430,
  },
  addToListButton: {
    width: '100%',
    margin: 0,
  },
  addToListText: {
    marginRight: 10,
  },
  foodList: {
    marginLeft: 50,
    width: 'calc(50% - 25px)',
  },
  quantity: {
    margin: '20px 38px 0',
    position: 'relative',
    display: 'flex',
    padding: '10px 20px',
    borderBottom: '1px dotted #ddd',
    borderRadius: 7,
  },
  quantityLabel: {
    fontWeight: 'bold',
  },
  quantityField: {
    position: 'absolute',
    right: 30,
    maxWidth: 80,
    '& .MuiTextField-root': {
      marginLeft: 16,
      bottom: 7,
    }


  },
};
