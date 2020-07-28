export default {
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modal: {
    margin: 'auto',
    backgroundColor: 'white',
    maxHeight: '80%',
    minHeight: 400,
    top: '10%',
    minWidth: 560,
    maxWidth: 800,
    borderRadius: 9,
    padding: '0 15px 10px 15px',
    '&:focus': {
      outline: 'none',
    },
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '20px 40px',
    fontWeight: 'bold',
    maxWidth: 600,
    maxHeight: 500,
    margin: '0 auto',
    textAlign: 'center',
  },
  content: {
    maxHeight: 500,
    overflowY: 'auto',
    padding: '0 4px 4px',
    flex: 'auto',
  },
  modalFooter: {
    position: 'sticky',
    padding: 20,
    margin: '0 auto',
  }
};
