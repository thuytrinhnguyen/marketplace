import React, {Fragment, useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {productService} from "../../services/productService";
import {useSelector} from "react-redux";
import HomeProductCard from "./HomeProductCard";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),

  }
}));

function HomeProductGrid() {
  const classes = useStyles();
  const homeProductsReducer = useSelector(state => state.homeProductsReducer);
  const {categoryId, subCategoryId, minPrice, maxPrice, order} = homeProductsReducer;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService
      .findAll(categoryId ? categoryId : null, subCategoryId ? subCategoryId : null, null)
      .then(products => setProducts(filterProducts(products)))
  }, [categoryId, subCategoryId]);


  const filterProducts = (products) => {
    let filteredProducts = products;

    if (minPrice > 0) {
      filteredProducts = products.filter(p => p.price > minPrice);
    }

    if (maxPrice > 0) {
      filteredProducts = products.filter(p => p.price < maxPrice);
    }

    if (order) {
      filteredProducts = filteredProducts.sort((p1, p2) => (p1.price - p2.price) * parseInt(order))
    }
    return filteredProducts;
  };

  return (
    <div className={classes.root}>
      {products &&
      <Grid container spacing={2} >
        {products.map(p =>
          <Grid
            item
            key={p.id}
            lg={3}
            lx={3}
            md={4}
            xs={6}
          >
            <HomeProductCard product={p}/>
          </Grid>
        )}
      </Grid>}
    </div>
  )
}

export default HomeProductGrid;
