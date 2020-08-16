import React from 'react';
import {Link as RouterLink, useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Link,
  Tooltip,
  Typography,
  colors
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ButtonBase from "@material-ui/core/ButtonBase";
import {useDispatch} from "react-redux";
import {shoppingCartActions, snackbarActions} from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    paddingBottom: 0
  },
  content: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0
    }
  },
  description: {
    padding: theme.spacing(2, 3, 1, 3)
  },
  cartButton: {
    marginLeft: theme.spacing(1)
  },
  details: {
    padding: theme.spacing(2, 3)
  },
  image: {
    width: 300,
    height: 300,
    margin: 'centered'
  },
  img: {
    margin: 'centered',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    paddingLeft: 60,
    paddingTop: 30,
    paddingBottom: 30
  },
  price: {
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
  }
}));

function HomeProductCard({product, className, ...rest}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(shoppingCartActions.addProduct(product));
    dispatch(snackbarActions.success("Product has been added to cart!"));
  };

  return (
    <Card>
      <CardContent className={classes.content}>
        <ButtonBase
          className={classes.image}
          onClick={() => history.push(`/products/${product.id}`)}
        >
          <img className={classes.img} alt={product.name} src={product.image}/>
        </ButtonBase>
        <Divider/>
        <Grid container
              alignItems="center"
              justify="space-between"
              spacing={3}
              className={classes.price}
        >
          <Grid item>
            <Typography variant="h4">
              ${product.price.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip title="Add to Cart">
              <IconButton
                className={classes.cartButton}
                size="small"
                onClick={(product) => handleAddToCart(product)}
              >
                <AddShoppingCartIcon fontSize="default"/>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <CardHeader
          title={(
            <Link
              color="textPrimary"
              component={RouterLink}
              to={`/products/${product.id}`}
              variant="h6"
            >
              {product.name.length > 50 ? `${product.name.substring(0, 50)} ...` : product.name}
            </Link>
          )}
        />
      </CardContent>
    </Card>
  );
}

HomeProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default HomeProductCard;
