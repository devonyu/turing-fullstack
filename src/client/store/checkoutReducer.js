const initialCheckoutData = {
  cartData: {},
  shippingData: {},
  paymentData: {},
  shippingAPI: {}
};

const checkout = (state = initialCheckoutData, action) => {
  if (action.type === "CONFIRMSHIPPING") {
    console.log("Shipping Confirmed");
    return {
      ...state,
      shippingData: action.shippingInput
    };
  }

  if (action.type === "CONFIRMPAYMENT") {
    console.log("Payment Confirmed");
    return {
      ...state,
      paymentData: action.paymentInput
    };
  }

  if (action.type === "UPDATESHIPPING") {
    console.log("Updating Shipping Selection");
    return {
      ...state,
      shippingData: {
        ...state.shippingData,
        [action.shippingInput.name]: action.shippingInput.value
      }
    };
  }

  if (action.type === "LOADAPIDATA") {
    return {
      ...state,
      shippingAPI: action.apiData
    };
  }

  return state;
};

export default checkout;
