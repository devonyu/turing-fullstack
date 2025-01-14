import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
// import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import {
  orderTotal,
  totalBeforeTax,
  taxCollected
} from "../utils/commonFunctions";

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

  const placeOrder = () => {
    const orderData = { ...checkout };
    orderData.cartData = cart;
    axios.post("/api/stripe", orderData).then(data => {
      console.log("backend response from order...");
      console.log(data);
    });
  };

  return (
    <div className={classes.container}>
      <Button
        className={classes.confirm}
        onClick={() => {
          console.log("sending checkout info to stripe endpoint");
          placeOrder();
        }}
      >
        Place Order
      </Button>
      <Divider />
      <h1>Order Summary</h1>
      <h3>Items: ${total}</h3>
      <h3>
        Shipping and handling:{" "}
        {shippingPrice && shippingPrice.shipping_cost
          ? `$${shippingPrice.shipping_cost}`
          : "-"}
      </h3>
      <h3>
        Total before tax:{" "}
        {shippingPrice && shippingPrice.shipping_cost
          ? `$${totalBeforeTax(total, shippingPrice.shipping_cost)}`
          : "-"}
      </h3>
      <h3>
        Estimated tax to be collected (8.5%):{" "}
        {shippingPrice && shippingPrice.shipping_cost
          ? `$${taxCollected(total, shippingPrice.shipping_cost, tax)}`
          : "-"}
      </h3>
      <Divider />
      <h3>
        Order total:{" "}
        {shippingPrice && shippingPrice.shipping_cost
          ? `$${orderTotal(total, shippingPrice.shipping_cost, tax)}`
          : "-"}
      </h3>
      <Grid container />
    </div>
  );
};

const mapStateToProps = state => {
  const { cart, checkout } = state;
  return {
    cart: cart.cart,
    cartID: cart.cartID,
    checkout,
    total: cart.total
  };
};

export default connect(
  mapStateToProps,
  null
)(OrderSummary);
