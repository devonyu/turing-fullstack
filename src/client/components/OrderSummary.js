import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
// import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

// custom button on top to save shipping, payments, and confirm order
// button on top changes to confirm each section
// shipping and handling, tax, total will be calculated based on api
// calls with data from user (address - tax+ shipping)

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(1)
  },
  confirm: {
    backgroundColor: "#f2ca66"
  }
}));

const OrderSummary = props => {
  const { cart, checkout, total } = props;
  const classes = useStyles();
  console.log("ORDER SUMMARY");
  console.log(props);
  return (
    <div className={classes.container}>
      <Button
        className={classes.confirm}
        onClick={() => {
          console.log("Order Summary Custom button pressed");
          console.log(props);
        }}
      >
        Order Summary
      </Button>
      <Divider />
      <h1>Order Summary</h1>
      <h3>Items: ${total}</h3>
      <h3>Shipping and handling: --</h3>
      <h3>Total before tax: --</h3>
      <h3>Estimated tax to be collected: --</h3>
      <Divider />
      <h3>Order total: --</h3>
      <Grid container />
    </div>
  );
};

export default OrderSummary;