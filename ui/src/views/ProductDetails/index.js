import React, {useEffect, useState} from "react";
import {productService} from "../../services/productService";
import {useParams} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import {makeStyles} from "@material-ui/styles";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import {shoppingCartActions} from "../../actions";
import {useHistory} from "react-router";
import Page from "../../components/Page";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    marginLeft: 20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  buttonText: {
    color: theme.palette.common.white,
  }
}));

function ProductDetails() {
  const {id} = useParams();
  const classes = useStyles();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    productService
      .findById(id)
      .then(product => setProduct(product))
  }, []);

  if (!product) {
    return (<></>)
  }

  const handleAddToCart = () => {
    dispatch(shoppingCartActions.addProduct(product));
  };

  const handleCheckout = () => {
    handleAddToCart();
    history.push('/checkout');
  };

  return (
    <Page title="Product">
      <Grid container spacing={2} className={classes.root}>
        <Grid item md={12}>
          <Typography variant="h4">
            {product.name}
          </Typography>
          <Typography variant="body2">
            by {product.createdBy}
          </Typography>
        </Grid>

        <Grid item md={4}>
          <CardMedia className={classes.media} image={product.image}/>
        </Grid>
        <Grid item md={5}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="textPrimary">
                Price: ${product.price}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary">
                {product.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3}>
          <Card>
            <Grid item md={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
              >
                <AddShoppingCartIcon/>
                <Typography
                  variant="h6"
                  className={classes.buttonText}
                >
                  Add to Cart
                </Typography>
              </Button>
            </Grid>
            <Grid item md={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCheckout}
              >
                <PlayArrowIcon/>
                <Typography
                  variant="h6"
                  className={classes.buttonText}
                >
                  Buy now
                </Typography>
              </Button>
            </Grid>
          </Card>
        </Grid>

      </Grid>
    </Page>
  )
}

export default ProductDetails;
