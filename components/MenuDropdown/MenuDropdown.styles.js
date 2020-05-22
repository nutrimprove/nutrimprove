export default {
  name: {
    fontSize: 14,
    fontWeight: 500,
    color: 'white',
    height: '100%',
    '&:$hover': {
      backgroundColor: '#1f3195',
    },
    padding: '0 40px',
  },
  link: {
    display: 'block',
    fontSize: 14,
    textAlign: 'center',
    padding: '12px 20px',
    color: 'white',
    backgroundColor: '#3f51b5',
    '&:$hover': {
      backgroundColor: '#1f3195',
    },
  },
  container: {
    backgroundColor: '#3f51b5',
    borderRadius: '0 0 7px 7px',
    marginLeft: 1,
  },
  divider: {
    border: '1px dotted #1f3195',
    margin: 0,
  },
};
