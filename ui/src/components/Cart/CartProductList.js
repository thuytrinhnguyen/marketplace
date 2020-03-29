import React from "react";
import {useDispatch, useSelector} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import {shoppingCartActions} from "../../actions";
import Button from "@material-ui/core/Button";
import {snackbarActions} from "../../actions/snackbarActions";

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

  const handleRemoveProduct = (product) => {
    dispatch(shoppingCartActions.removeProduct(product));
    dispatch(snackbarActions.success("Product has been removed!"))
  };

  return (
    <>
      {products.map((p) => (
        <Grid container spacing={1} key={p.id}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={p.image}/>
            </ButtonBase>
          </Grid>
          <Grid item>
            <Typography variant="h5">{p.name}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">{p.quantity}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">${p.price * p.quantity}</Typography>
          </Grid>
          <Grid item>
            <Button color="secondary" variant="outlined" onClick={() => handleRemoveProduct(p)}>
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}
      <Typography variant="h5">Total: ${products.reduce((a, b) => a + (b.price * b.quantity), 0)}</Typography>
    </>
  )
}

export default CartProductList;
