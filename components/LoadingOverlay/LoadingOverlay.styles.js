export default {
  loading: {
    margin: 'auto',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    zIndex: 5000,
    width: '100%',
    height: '100%',
  },
  panel: {
    margin: 'auto',
    backgroundColor: 'white',
    // top: 'calc(50% - 80px)',
    // left: 'calc(50% - 170px)',
    display: 'flex',
    width: 340,
    height: 160,
    borderRadius: 9,
    '&:focus': {
      outline: 'none',
    },
  },
  display: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
};