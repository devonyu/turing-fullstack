const initialCheckoutData = {
  cartData: {},
  shippingData: {},
  paymentData: {},
  shippingAPI: {}
};
// possible to subscribe cart reducers here?
const checkout = (state = initialCheckoutData, action) => {
  if (action.type === "CONFIRMSHIPPING") {
    return {
      ...state,
      shippingData: action.shippingInput
    };
  }

  if (action.type === "CONFIRMPAYMENT") {
    return {
      ...state,
      paymentData: action.paymentInput
    };
  }

  if (action.type === "UPDATESHIPPING") {
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
