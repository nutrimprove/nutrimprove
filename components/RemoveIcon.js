import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

function RemoveIcon(props) {
  const { removeField, item } = props
  return (
    <div>
      <IconButton
        aria-label='remove-button'
        onClick={() => removeField(item)}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  )
}

RemoveIcon.propTypes = {
  removeField: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
}

export default RemoveIcon
