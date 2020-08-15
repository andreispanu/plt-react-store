import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

// Material UI Styles
const useStyles = makeStyles((theme) => ({
  itemContainer: {
    padding: theme.spacing(2),
  },
  itemQuantity: {
    width: "100%",
    textAlign: "center",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    '& input': {
      textAlign: 'center',
      fontSize: 20,
      height: theme.spacing(5)
    }
  },
  itemRemove: {
    width: "100%",
    textAlign: "center",
    marginTop: theme.spacing(1)
  },
}));

const Quantity = (props) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(0);

  // Increment basket
  const add = (price, id) => {
    setQuantity((quantity) => quantity + 1);
    props.updateCart({
      value: price,
      id,
      action: "add",
      quantity: (quantity + 1),
    });
  };

  // Remove items from basket
  const remove = (price, id) => {
    if (quantity === 0) {
      setQuantity(0);
    } else {
      setQuantity((quantity) => quantity - 1);
      props.updateCart({
        value: price,
        id,
        action: "remove",
        quantity: (quantity - 1)
      });
    }
  };

  // Clear items from basket
  const clearItems = (id) => {
    setQuantity(0);
    props.updateCart({
      value: 0,
      id,
      action: "cancel",
      quantity: 0
    });
  };

  return (
    <div className={classes.itemContainer}>
      <div className={classes.itemQuantity} key={props.itemId}>
        <IconButton
          aria-label="add"
          onClick={() => add(props.itemPrice, props.itemId)}
        >
          <AddCircleOutlineIcon />
        </IconButton>

        <div >
          <TextField value={quantity} className={classes.inputContainer} />
        </div>

        <IconButton
          aria-label="remove"
          onClick={() => remove(props.itemPrice, props.itemId)}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
      </div>

      <div className={classes.itemRemove}>
        {quantity > 0 && (
          <Button onClick={() => clearItems(props.itemId)}>Remove</Button>
        )}
      </div>
    </div>
  );
};

Quantity.propTypes = {
  itemId: PropTypes.number.isRequired,
};

export default Quantity;
