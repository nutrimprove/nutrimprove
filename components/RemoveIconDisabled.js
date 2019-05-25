import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

function RemoveIcon() {
  return (
    <div>
      <IconButton aria-label='disabled-remove-button' disabled>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}

export default RemoveIcon
