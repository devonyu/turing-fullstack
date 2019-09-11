import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import AltCartItem from "./AltCartItem";

const useStyles = makeStyles(theme => ({
  confirm: {
    backgroundColor: "#f2ca66"
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1)
  },
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const AltCart = props => {
  const { cart, removeFromCart, total, updateCart } = props;
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
      spacing={2}
    >
      <Grid item xs={8}>
        <div className={classes.root}>
          <List>
            {cart && cart.length
              ? cart.map(product => (
                  <ListItem key={product.cartItemID}>
                    <AltCartItem
                      data={product}
                      onRemoveFromCart={item => removeFromCart(item)}
                      onUpdateCart={(item, id) => updateCart(item, id)}
                    />
                  </ListItem>
                ))
              : "Cart Empty"}
          </List>
        </div>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <h1>Select Shipping</h1>
          <h2>Subtotal: ${total}</h2>
          <Button
            className={classes.confirm}
            onClick={() => {
              console.log("Confirm shipping");
            }}
          >
            Confirm Shipping Selection
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: item => dispatch({ type: "REMOVE", val: item }),
    updateCart: (item, id) =>
      dispatch({ type: "UPDATE", val: item, cartItemID: id })
  };
};

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    cartID: state.cart.cartID,
    total: state.cart.total
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AltCart);

AltCart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      attributes: PropTypes.shape({
        quantity: PropTypes.number,
        size: PropTypes.string,
        color: PropTypes.string
      }),
      cartItemID: PropTypes.string,
      description: PropTypes.string,
      discounted_price: PropTypes.number,
      display: PropTypes.number,
      image: PropTypes.string,
      image_2: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      product_id: PropTypes.number,
      thumbnail: PropTypes.string
    })
  ).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired
};
