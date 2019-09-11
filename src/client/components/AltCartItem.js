import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import AltCartSelectors from "./AltCartSelectors";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    justifyContent: "stretch",
    width: "100%",
    height: "100px"
  },
  details: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  content: {
    flex: "1 0 auto",
    width: "150px",
    flexWrap: "wrap"
  },
  cover: {
    width: "100px"
  },
  attributes: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));

const AltCartItem = props => {
  const classes = useStyles();
  const { data, onRemoveFromCart, onUpdateCart } = props;
  return (
    <Card raised className={classes.card}>
      <CardMedia
        className={classes.cover}
        // eslint-disable-next-line import/no-dynamic-require,  global-require
        image={require(`../product_images/${data.thumbnail}`)}
        title={data.name}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="body2">{data.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {data.discounted_price !== 0 ? (
              <>${data.discounted_price}</>
            ) : (
              <>${data.price}</>
            )}
          </Typography>
        </CardContent>
        <div className={classes.attributes}>
          <Typography variant="body2" color="textSecondary">
            Color:{data.attributes.color}
          </Typography>
          <div>
            <Typography variant="body2" color="textSecondary">
              Size: {data.attributes.size}
            </Typography>
          </div>
          <AltCartSelectors
            data={data}
            onUpdateCart={onUpdateCart}
            onRemoveFromCart={() => onRemoveFromCart(data)}
          />
        </div>
      </div>
    </Card>
  );
};

export default AltCartItem;

AltCartItem.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    image_2: PropTypes.string,
    price: PropTypes.number,
    discounted_price: PropTypes.number,
    description: PropTypes.string,
    thumbnail: PropTypes.string
  }).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  onUpdateCart: PropTypes.func.isRequired
};
