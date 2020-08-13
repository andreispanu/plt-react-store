import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    padding: theme.spacing(2)
  },
  itemQuantity: {
    width: '100%',
    textAlign: 'center'
  },
  itemRemove: {
    width: '100%',
    textAlign: 'center'
  }
}));

const Quantity = (props) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(0);

  // Increment basket
  const add = () => {
    setQuantity(quantity => quantity + 1)
  }

  // Remove items from basket
  const remove = () => {
    if (quantity === 0) {
      setQuantity(0)
    } else {
      setQuantity(quantity => quantity - 1)
    }
  }

  // Clear items from basket
  const clearItems = () => {
    setQuantity(0)
  }

  return (
    <div className={classes.itemContainer}>
      <div className={classes.itemQuantity} key={props.itemId}>
        <IconButton aria-label="add" onClick={() => add()}>
          <AddCircleOutlineIcon />
        </IconButton>
        <TextField
          value={quantity}
        />
        <IconButton aria-label="remove" onClick={() => remove()}>
          <RemoveCircleOutlineIcon />
        </IconButton>
      </div>
      <div className={classes.itemRemove}>
        {quantity > 0 && <Button onClick={() => clearItems()}>Remove</Button>}
      </div>
    </div>

  )
}

Quantity.propTypes = {
  itemId: PropTypes.string.isRequired
}

export default Quantity