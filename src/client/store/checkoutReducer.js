const initialCheckoutData = { cartData: {}, shippingData: {}, paymentData: {} };

const checkout = (state = initialCheckoutData, action) => {
  if (action.type === "CONFIRMSHIPPING") {
    console.log("Shipping Confirmed");
    console.log(action.shippingInput);
    return {
      ...state,
      shippingData: action.shippingInput
    };
  }

  if (action.type === "CONFIRMPAYMENT") {
    console.log("Payment Confirmed");
    console.log(action.paymentInput);
    return {
      ...state,
      paymentData: action.paymentInput
    };
  }

  if (action.type === "SHIPPINGEXAMPLE") {
    console.log("Shipping Complete");
    return {
      ...state,
      shippingData: {
        firstName: "Devon",
        lastName: "Yu",
        address1: "1015 Folsom st",
        address2: "",
        city: "San Francisco",
        zip: 94109,
        state: "California",
        country: 2
      }
    };
  }

  if (action.type === "PAYMENTEXAMPLE") {
    console.log("Payment Complete");
    return {
      ...state,
      paymentData: {
        name: "Devon Yu",
        creditCard: 4145123412341234,
        expiration: "01/23",
        code: 9999
      }
    };
  }

  if (action.type === "CARTEXAMPLE") {
    console.log("Cart Complete");
    return {
      ...state,
      cartData: {
        cart: [
          {
            attributes: { quantity: 5, size: "XXL", color: "Yellow" },
            cartItemID: "tCbqJQRK-N2RjDvV8QClM",
            description:
              "The largest American cemetery in France is located....",
            discounted_price: 0,
            display: 0,
            image: "lorraine.gif",
            image_2: "lorraine-2.gif",
            name: "Lorraine",
            price: 16.95,
            product_id: 12,
            thumbnail: "lorraine"
          }
        ],
        total: 16.95
      }
    };
  }
  return state;
};

export default checkout;
