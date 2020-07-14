export default {
  content: {
    display: 'inline-flex',
    position: 'relative',
    '&:focus': {
      outline: 'none',
    },
    fontSize: 12,
  },
  editField: {
    width: '90%',
  },
  editableText: {
    color: '#3f51b5',
    cursor: 'pointer',
    maxWidth: 400,
  },
  editIcon: {
    position: 'absolute',
    color: '#3f51b5',
    cursor: 'pointer',
  },
  editIconSmall: {
    top: 2,
    right: -14,
    fontSize: 14,
  },
  editIconMedium: {
    top: 3,
    right: -20,
    fontSize: 17,
  },
  editIconLarge: {
    top: 6,
    right: -22,
    fontSize: 20,
  },
};
