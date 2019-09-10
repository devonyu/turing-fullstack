import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import CartItem from "./CartItem";

const useStyles = makeStyles(theme => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3)
  },
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

const Cart = props => {
  const { cart, removeFromCart, toggleView, total, updateCart } = props;
  const classes = useStyles();
  return (
    <Paper>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item xs={8}>
          <div className={classes.root}>
            <List>
              {cart && cart.length
                ? cart.map(product => (
                    <ListItem key={product.cartItemID}>
                      <CartItem
                        data={product}
                        onRemoveFromCart={removeFromCart}
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
            <h1>Shopping Cart</h1>
            <h2>Estimated Total:${total}</h2>
            <h4>(Before Tax and Shipping)</h4>
            <Button
              className={classes.confirm}
              onClick={() => {
                toggleView("Checkout");
              }}
            >
              Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
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
)(Cart);

Cart.propTypes = {
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
  toggleView: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired
};
