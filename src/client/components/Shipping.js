import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    display: "flex",
    minWidth: 120
  },
  confirm: {
    backgroundColor: "#f2ca66"
  }
}));

const isDirty = state => {
  return Object.keys(state).every(shippingProp => {
    if (
      shippingProp !== "address2" &&
      shippingProp !== "country" &&
      shippingProp !== "shippingID"
    ) {
      return state[shippingProp].length > 0;
    }
    if (shippingProp === "country") {
      return state[shippingProp] !== 1;
    }
    if (shippingProp === "shippingID") {
      return state[shippingProp] !== 0;
    }
    return true;
  });
};

const Shipping = props => {
  const { confirmShipping, panelViewLogic, checkout } = props;
  const { shippingAPI } = checkout;
  const { shippingCosts, shippingRegions } = shippingAPI;
  const [shippingData, setShippingData] = React.useState({
    firstName: checkout.shippingData.firstName || "",
    lastName: checkout.shippingData.lastName || "",
    address1: checkout.shippingData.address1 || "",
    address2: checkout.shippingData.address2 || "",
    city: checkout.shippingData.city || "",
    state: checkout.shippingData.state || "",
    zip: checkout.shippingData.zip || "",
    country: checkout.shippingData.country || 1,
    shippingID: checkout.shippingData.shippingID || 0
  });
  const [labelWidth, setLabelWidth] = React.useState([...Array(7).keys(null)]);
  const itemsRef = React.useRef([]);
  const classes = useStyles();

  React.useEffect(() => {
    const final = [...labelWidth].map((label, idx) => {
      return itemsRef.current[idx].offsetWidth;
    });
    setLabelWidth(final);
  }, [shippingData]);

  const handleChange = name => event => {
    if (name === "country") {
      setShippingData({
        ...shippingData,
        [name]: event.target.value,
        shippingID: 0 // resets shipping value when country changes
      });
    } else {
      setShippingData({ ...shippingData, [name]: event.target.value });
    }
  };
  return (
    <div className={classes.container}>
      {[
        "firstName",
        "lastName",
        "address1",
        "address2",
        "city",
        "zip",
        "state"
      ].map((shippingInput, i) => {
        return (
          <FormControl
            className={classes.formControl}
            variant="outlined"
            key={shippingInput}
          >
            <InputLabel
              ref={el => (itemsRef.current[i] = el)}
              htmlFor={shippingInput}
            >
              {shippingInput}
            </InputLabel>
            <OutlinedInput
              id={shippingInput}
              labelWidth={labelWidth[i]}
              name={shippingInput}
              onChange={handleChange(shippingInput)}
              error={
                shippingInput !== "address2" &&
                shippingData[shippingInput].length === 0
              }
              value={shippingData[shippingInput]}
              required={shippingInput !== "address2"}
            />
            {shippingInput !== "address2" ? (
              <FormHelperText id={shippingInput}>Required*</FormHelperText>
            ) : null}
          </FormControl>
        );
      })}
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={null} htmlFor="country">
          Country
        </InputLabel>
        <Select
          value={shippingData.country}
          onChange={handleChange("country")}
          inputProps={{
            name: "country",
            id: "country"
          }}
          error={shippingData.country === 1}
        >
          {shippingRegions &&
            shippingRegions.map(region => (
              <MenuItem
                value={region.shipping_region_id}
                key={region.shipping_region}
              >
                {region.shipping_region}
              </MenuItem>
            ))}
        </Select>
        <FormHelperText>Required*</FormHelperText>
      </FormControl>
      {shippingData && shippingData.country >= 2 ? (
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={null} htmlFor="shippingID">
            Shipping options
          </InputLabel>
          <Select
            value={shippingData.shippingID}
            onChange={handleChange("shippingID")}
            inputProps={{
              name: "shippingID",
              id: "shippingID"
            }}
            error={shippingData.shippingID === 0}
          >
            {shippingCosts &&
              shippingCosts
                .filter(
                  option => option.shipping_region_id === shippingData.country
                )
                .map(filteredShippingOption => (
                  <MenuItem
                    value={filteredShippingOption.shipping_id}
                    key={filteredShippingOption.shipping_id}
                  >
                    {filteredShippingOption.shipping_type}
                  </MenuItem>
                ))}
          </Select>
          <FormHelperText>Required*</FormHelperText>
        </FormControl>
      ) : null}
      <Button
        className={classes.confirm}
        disabled={!isDirty(shippingData)}
        onClick={() => {
          console.log("confirm shipping clicked");
          confirmShipping(shippingData);
          panelViewLogic("shipping");
        }}
      >
        Confirm Shipping
      </Button>
    </div>
  );
};

export default Shipping;
