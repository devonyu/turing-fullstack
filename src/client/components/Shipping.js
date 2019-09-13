import React from "react";
import axios from "axios";
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

const Shipping = props => {
  const { confirmShipping } = props;
  const [shippingData, setShippingData] = React.useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: 1,
    shippingID: 0
  });
  const [shippingApi, setShippingApi] = React.useState({
    shippingRegions: [],
    shippingCosts: []
  });
  const [labelWidth, setLabelWidth] = React.useState([...Array(7).keys(null)]);
  const itemsRef = React.useRef([]);
  const classes = useStyles();

  React.useEffect(() => {
    async function getShippingApi() {
      try {
        const response = await axios.get("/api/shipping");
        const { data } = response;
        setShippingApi({
          ...shippingApi,
          shippingCosts: [...data[0]],
          shippingRegions: [...data[1]]
        });
      } catch (error) {
        console.error(error);
      }
    }
    getShippingApi();
    const final = [...labelWidth].map((label, idx) => {
      return itemsRef.current[idx].offsetWidth;
    });
    setLabelWidth(final);
  }, [shippingData]);

  const handleChange = name => event => {
    setShippingData({ ...shippingData, [name]: event.target.value });
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
          {shippingApi.shippingRegions.map(region => (
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
            error={shippingData.country === 1}
          >
            {shippingApi.shippingCosts
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
        onClick={() => {
          console.log("confirm shipping");
          confirmShipping(shippingData);
        }}
      >
        Confirm Shipping
      </Button>
    </div>
  );
};

export default Shipping;
