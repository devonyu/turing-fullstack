import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
// import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import CheckoutReview from "./CheckoutReview";
import OrderSummary from "./OrderSummary";
import Payments from "./Payments";
import Shipping from "./Shipping";

const useStyles = makeStyles(theme => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

// Use Amazon checkout as prototype
// validation and verification/warnings
// connect to strip api
// on success, on fail - backend checks and error codes

const Checkout = props => {
  const classes = useStyles();
  const {
    cart,
    checkout,
    confirmPayment,
    confirmShipping,
    loadAPIData,
    total
  } = props;
  const [panelViews, setPanelViews] = React.useState({
    shipping: true,
    payment: false,
    review: false
  });
  // console.log(`%c Shipping INFO`, "color: red");
  // console.log(`%c ${JSON.stringify(checkout.shippingData)}`, "color: red");
  // console.log(`%c Payment INFO`, "color: green");
  // console.log(`%c ${JSON.stringify(checkout.paymentData)}`, "color: green");

  const panelViewLogic = input => {
    if (input === "shipping") {
      setPanelViews({
        ...panelViews,
        shipping: false,
        payment: true,
        review: false
      });
    } else if (input === "payment") {
      setPanelViews({
        ...panelViews,
        shipping: false,
        payment: false,
        review: true
      });
    }
  };

  const togglePannel = input => {
    setPanelViews({
      ...panelViews,
      [input]: !panelViews[input]
    });
  };

  const cartItemAmount = () => {
    return (
      <h1>
        Checkout (
        <Button
          onClick={() => {
            props.toggleView("Cart");
          }}
        >
          {(cart || []).length} items
        </Button>
        )
      </h1>
    );
  };

  React.useEffect(() => {
    async function getShippingApi() {
      try {
        const response = await axios.get("/api/shipping");
        const { data } = response;
        loadAPIData({
          shippingCosts: [...data[0]],
          shippingRegions: [...data[1]]
        });
      } catch (error) {
        console.error(error);
      }
    }
    getShippingApi();
  }, []);

  return (
    <Paper>
      {cartItemAmount()}
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <div className={classes.root}>
              <ExpansionPanel expanded={panelViews.shipping}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  onClick={() => {
                    togglePannel("shipping");
                  }}
                >
                  <Typography className={classes.heading}>
                    1 Shipping Address
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Shipping
                    checkout={checkout}
                    confirmShipping={confirmShipping}
                    panelViewLogic={panelViewLogic}
                  />
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={panelViews.payment}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  onClick={() => {
                    togglePannel("payment");
                  }}
                >
                  <Typography className={classes.heading}>
                    2 Payment method
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Payments
                    checkout={checkout}
                    confirmPayment={confirmPayment}
                    panelViewLogic={panelViewLogic}
                  />
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={panelViews.review}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  onClick={() => {
                    togglePannel("review");
                  }}
                >
                  <Typography className={classes.heading}>
                    3 Review items and shipping
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <CheckoutReview cart={cart} total={total} />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <OrderSummary cart={cart} total={total} />
          </Paper>
        </Grid>
      </Grid>
      <Button
        onClick={() => {
          props.toggleView("Cart");
        }}
      >
        Back to Cart
      </Button>
    </Paper>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item, id) => dispatch({ type: "ADD", val: item, id }),
    removeFromCart: item => dispatch({ type: "REMOVE", val: item }),
    getCartFromSession: id => dispatch({ type: "LOADSESSION", id }),
    updateCart: (item, id) => dispatch({ type: "UPDATE", val: item, id }),
    confirmShipping: shippingInput =>
      dispatch({ type: "CONFIRMSHIPPING", shippingInput }),
    confirmPayment: paymentInput =>
      dispatch({ type: "CONFIRMPAYMENT", paymentInput }),
    loadAPIData: apiData => dispatch({ type: "LOADAPIDATA", apiData })
  };
};

const mapStateToProps = ({ checkout }) => ({ checkout });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
