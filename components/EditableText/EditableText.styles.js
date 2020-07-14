export default {
  content: {
    display: 'inline-flex',
    position: 'relative',
    '&:focus': {
      outline: 'none',
    },
  },
  editableText: {
    color: '#3f51b5',
    cursor: 'pointer',
    maxWidth: 400,
  },
  editIcon: {
    position: 'absolute',
    top: 3,
    right: -24,
    color: '#3f51b5',
    cursor: 'pointer',
  },
};
