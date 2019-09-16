import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
// import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { orderTotal } from "../utils/commonFunctions";

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
  const { shippingData, shippingAPI } = checkout || {};
  const { shippingID } = shippingData || 0;
  const { shippingCosts } = shippingAPI || [];
  const shippingPrice =
    (shippingCosts &&
      shippingCosts.filter(
        shippingCost => shippingCost.shipping_id === shippingID
      )[0]) ||
    {};

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
            console.log(checkout);
          }}
        >
          Place order
        </Button>
        <h3 className={classes.total}>
          Order total:{" "}
          {shippingPrice && shippingPrice.shipping_cost
            ? `$${orderTotal(total, shippingPrice.shipping_cost, tax)}`
            : `~$${total}`}
        </h3>
      </div>
    </Grid>
  );
};

const mapStateToProps = ({ checkout }) => ({ checkout });

export default connect(
  mapStateToProps,
  null
)(CheckoutReview);
