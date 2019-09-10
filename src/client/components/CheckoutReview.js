import React from "react";
import Button from "@material-ui/core/Button";
// import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// Review Cart information and submit order

const useStyles = makeStyles(theme => ({
  confirm: {
    backgroundColor: "#f2ca66"
  }
}));

const CheckoutReview = props => {
  const { checkout } = props;
  const classes = useStyles();
  return (
    <>
      <Grid container />

      <Button
        className={classes.confirm}
        onClick={() => {
          console.log("place order");
          console.log(checkout);
        }}
      >
        Place order
      </Button>
    </>
  );
};

export default CheckoutReview;
