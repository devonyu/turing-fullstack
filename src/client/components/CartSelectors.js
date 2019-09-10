import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

export default function CartSelectors(props) {
  console.log("CartSelectors props");
  console.log(props);
  const { color, quantity, size } = props.data;
  console.log(color);
  const [values, setValues] = React.useState({
    color,
    quantity,
    size
  });

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
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
            <MenuItem value={idx + 1} key={idx + 1}>
              {idx + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="color">Color</InputLabel>
        <Select
          value={values.color}
          onChange={handleChange}
          inputProps={{
            name: "color"
          }}
        >
          {[
            "White",
            "Black",
            "Red",
            "Orange",
            "Yellow",
            "Green",
            "Blue",
            "Indigo",
            "Purple"
          ].map(item => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="size">Size</InputLabel>
        <Select
          value={values.size}
          onChange={handleChange}
          inputProps={{
            name: "size"
          }}
        >
          {["S", "M", "L", "XL", "XXL"].map(item => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}