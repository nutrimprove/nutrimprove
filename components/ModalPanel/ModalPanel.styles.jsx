export default {
  closeIcon: {
    position: 'absolute',
    float: 'right',
    top: 10,
    right: 10,
  },
  modal: {
    position: 'absolute',
    margin: 'auto',
    maxHeight: 600,
    minHeight: 400,
    minWidth: 500,
    maxWidth: 800,
    backgroundColor: 'white',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 9,
    padding: '0 15px 10px 15px',
    '&:focus': {
      outline: 'none',
    },
    overflowY: 'overlay',
  },
  header: {
    padding: '20px 40px',
    fontWeight: 'bold',
    maxWidth: 600,
    margin: '0 auto',
    textAlign: 'center',
  },
};
