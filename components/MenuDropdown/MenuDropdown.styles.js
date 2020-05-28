export default {
  name: {
    fontSize: 14,
    fontWeight: 500,
    padding: 22,
    color: 'white',
    height: '100%',
    '&:$hover': {
      backgroundColor: '#1f3195',
    },
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
    boxShadow: '2px 2px 8px 0px rgba(0,0,0,0.3)',
  },
  divider: {
    border: '0 0 1px 0',
    borderColor: '#5f71c5',
    margin: 0,
  },
  icon: {
    marginTop: 6,
    marginRight: -10,
  },
};
