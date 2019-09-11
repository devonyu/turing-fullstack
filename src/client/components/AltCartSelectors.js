import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import React from "react";
import Select from "@material-ui/core/Select";

export default function AltCartSelectors(props) {
  const { data, onRemoveFromCart } = props;
  const { attributes } = data;
  const { color, quantity, size } = attributes;
  const { cartItemID } = data;
  const { onUpdateCart } = props;
  const [values, setValues] = React.useState({
    color,
    quantity,
    size,
    cartItemID
  });

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
    if (event.target.value === 11) {
      onRemoveFromCart();
    } else {
      onUpdateCart({ [event.target.name]: event.target.value }, cartItemID);
    }
  }

  return (
    <form autoComplete="off">
      <FormControl>
        <InputLabel htmlFor="quantity">Quantity</InputLabel>
        <Select
          value={values.quantity}
          onChange={handleChange}
          inputProps={{
            name: "quantity"
          }}
        >
          {[...Array(10).keys()].map((item, idx) => (
            <MenuItem value={idx + 1} key={String(idx + 1)}>
              {idx + 1}
            </MenuItem>
          ))}
          <Divider />
          <MenuItem value={11} key="delete">
            Delete Item
          </MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}

AltCartSelectors.propTypes = {
  data: PropTypes.shape({
    cartItemID: PropTypes.string,
    attributes: PropTypes.shape({
      color: PropTypes.string,
      quantity: PropTypes.number,
      size: PropTypes.string
    })
  }).isRequired,
  onUpdateCart: PropTypes.func.isRequired
};
