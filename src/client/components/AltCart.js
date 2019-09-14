import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import AltCartItem from "./AltCartItem";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    display: "flex",
    minWidth: 120
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
  const classes = useStyles();
  const {
    cart,
    checkout,
    removeFromCart,
    updateCart,
    updateShippingOption
  } = props;
  const { shippingData, shippingAPI } = checkout || {};
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
          <>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                value={(shippingData && shippingData.shippingID) || ""}
                onChange={data => updateShippingOption(data.target)}
                inputProps={{
                  name: "shippingID",
                  id: "shippingID"
                }}
              >
                {shippingAPI &&
                  shippingAPI.shippingCosts &&
                  shippingAPI.shippingCosts
                    .filter(
                      option =>
                        option.shipping_region_id === shippingData.country
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
          </>
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: item => dispatch({ type: "REMOVE", val: item }),
    updateCart: (item, id) =>
      dispatch({ type: "UPDATE", val: item, cartItemID: id }),
    updateShippingOption: shippingInput =>
      dispatch({ type: "UPDATESHIPPING", shippingInput })
  };
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
  updateCart: PropTypes.func.isRequired
};
