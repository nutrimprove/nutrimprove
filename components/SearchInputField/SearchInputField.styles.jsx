export default {
  root: {
    flexGrow: 1,
    width: 280,
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  dropdown: {
    position: 'absolute',
    zIndex: 100,
    marginTop: 8,
    left: 0,
    right: 0,
    maxHeight: 230,
    width: 'fit-content',
    overflow: 'auto',
  },
  inputRoot: {
    flexWrap: 'wrap',
    paddingRight: 5,
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: 10,
  },
  checkIcon: {
    color: 'limegreen',
    fontSize: 'medium',
  },
  errorIcon: {
    color: 'firebrick',
    fontSize: 'medium',
  },
};
