import React from "react";
import {useDispatch, useSelector} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Link from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import {shoppingCartActions} from "../../actions";
import Button from "@material-ui/core/Button";
import {snackbarActions} from "../../actions/snackbarActions";
import {useHistory} from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
    '&:hover': {
      backgroundColor: theme.palette.background.default
    }
  },
  image: {
    width: 50,
    height: 50,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function CartProductList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const shoppingCartReducer = useSelector(state => state.shoppingCartReducer);
  const {products} = shoppingCartReducer;
  const history = useHistory();

  const handleRemoveProduct = (product) => {
    dispatch(shoppingCartActions.removeProduct(product));
    dispatch(snackbarActions.success("Product has been removed!"))
  };

  return (
    <>
      {products.map((p) => (
        <Grid container spacing={1} key={p.id}>
          <Grid item md={2}>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={p.image}/>
            </ButtonBase>
          </Grid>
          <Grid item md={5}>
            <Link
              href="#"
              variant="body2"
              color="primary"
              onClick={() => history.push(`/products/${p.id}`)}
            >
              {p.name.length >= 44 ? `${p.name.substr(0, 44)}...` : p.name}
            </Link>
          </Grid>
          <Grid item md={1}>
            <Typography variant="body2">{p.quantity}</Typography>
          </Grid>
          <Grid item md={2}>
            <Typography variant="body2">${(p.price * p.quantity).toFixed(2)}</Typography>
          </Grid>
          <Grid item md={2}>
            <Link
              href="#"
              variant="body2"
              onClick={() => handleRemoveProduct(p)}>
              Remove
            </Link>
          </Grid>
        </Grid>
      ))}
      <Typography variant="h5">Total:
        ${products.reduce((a, b) => a + (b.price * b.quantity), 0).toFixed(2)}</Typography>
    </>
  )
}

export default CartProductList;
