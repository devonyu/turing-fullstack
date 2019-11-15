import React from "react";
import axios from "axios";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import SearchIcon from "@material-ui/icons/Search";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    display: "flex"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  confirm: {
    backgroundColor: "#f2ca66"
  },
  applyButton: {
    padding: 17,
    backgroundColor: "limegreen"
  },
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    flexBasis: 250
  },
  ador: {
    paddingRight: "5px"
  }
}));

const isDirty = state => {
  return Object.keys(state).every(paymentProp => {
    if (paymentProp === "code") {
      // simple 3-4 digit validation
      return state[paymentProp].length === 3 || state[paymentProp].length === 4;
    }
    if (paymentProp === "creditCard") {
      // simple 16 digit validation
      return state[paymentProp].length === 16;
    }
    if (paymentProp === "expiration") {
      // simple 4 digit validation
      return state[paymentProp].length === 4;
    }
    if (paymentProp === "name") {
      // simple 3 name validation
      return state[paymentProp].length >= 3;
    }
    return true;
  });
};

const Payments = props => {
  const { confirmPayment, panelViewLogic } = props;
  const [paymentData, setPaymentData] = React.useState({
    code: "",
    creditCard: "",
    expiration: "",
    name: "",
    promo: ""
  });
  const [labelWidth, setLabelWidth] = React.useState([...Array(4).keys(null)]);
  const itemsRef = React.useRef([]);
  const classes = useStyles();

  React.useEffect(() => {
    const final = [...labelWidth].map((label, idx) => {
      return itemsRef.current[idx].offsetWidth;
    });
    setLabelWidth(final);
  }, [paymentData]);

  const checkPromoCode = code => {
    console.log(`checking promo = ${code}`);
    async function promoApi() {
      try {
        const response = await axios.post("/api/promo", {
          code
        });
        const { data } = response;
        console.log("DATA");
        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
    promoApi();
  };

  const applyDiscount = amount => {
    console.log(amount);
  };

  const handleChange = name => event => {
    setPaymentData({ ...paymentData, [name]: event.target.value });
  };

  return (
    <div className={classes.container}>
      {["creditCard", "code", "expiration", "name"].map((paymentInput, i) => {
        return (
          <FormControl
            className={classes.formControl}
            variant="outlined"
            key={paymentInput}
          >
            <InputLabel
              ref={el => (itemsRef.current[i] = el)}
              htmlFor={paymentInput}
            >
              {paymentInput}
            </InputLabel>
            <OutlinedInput
              id={paymentInput}
              labelWidth={labelWidth[i]}
              name={paymentInput}
              onChange={handleChange(paymentInput)}
              error={paymentData[paymentInput].length === 0}
              value={paymentData[paymentInput]}
              required
            />
            <FormHelperText id={paymentInput}>Required*</FormHelperText>
          </FormControl>
        );
      })}
      <TextField
        id="promo"
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        type="text"
        label="Promo"
        value={paymentData.promo}
        onChange={handleChange("promo")}
        InputProps={{
          endAdornment: (
            <InputAdornment className={classes.ador} fullWidth="true">
              <Button
                className={classes.applyButton}
                size="small"
                onClick={() => {
                  checkPromoCode(paymentData.promo);
                }}
                // onMouseDown={() => checkPromoCode(paymentData.promo)}
              >
                Apply
              </Button>
            </InputAdornment>
          )
        }}
      />

      <Button
        className={classes.confirm}
        disabled={!isDirty(paymentData)}
        onClick={() => {
          console.log("confirm payment");
          confirmPayment(paymentData);
          panelViewLogic("payment");
        }}
      >
        Confirm Payment
      </Button>
    </div>
  );
};

export default Payments;
