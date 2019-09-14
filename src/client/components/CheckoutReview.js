import React from "react";
import Button from "@material-ui/core/Button";
// import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import AltCart from "./AltCart";

const useStyles = makeStyles(theme => ({
  placeOrder: {
    backgroundColor: "#f2ca66",
    padding: theme.spacing(1)
  },
  total: {
    color: "#b12704"
  },
  detail: {
    display: "flex",
    margin: theme.spacing(1)
  }
}));

const CheckoutReview = props => {
  const classes = useStyles();
  const { cart, checkout, total } = props;
  const tax = 8.5; // fixed for now
  const { shippingID } = checkout.shippingData;

  console.log(checkout);
  // display shipping speeds + costs
  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="baseline"
    >
      <AltCart />
      <div className={classes.detail}>
        <Button
          className={classes.placeOrder}
          onClick={() => {
            console.log("place order");
            console.log(checkout);
          }}
        >
          Place order
        </Button>
        <h3 className={classes.total}> Order total: ${total}</h3>
      </div>
    </Grid>
  );
};

export default CheckoutReview;
