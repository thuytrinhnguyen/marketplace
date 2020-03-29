import React, {useEffect, useState} from "react";
import {productService} from "../../../services/productService";
import ProductCard from "./ProductCard";
import Grid from "@material-ui/core/Grid";
import FilterBar from "../../../components/FilterBar";
import {useSelector} from "react-redux";
import {useParams} from "react-router";

function UserProductList() {
  const [products, setProducts] = useState([]);

  const productListReducer = useSelector(state => state.productListReducer);
  const {categoryId, subCategoryId, minPrice, maxPrice, order} = productListReducer;

  const {username} = useParams();

  useEffect(() => {
    productService
      .findAll(categoryId, subCategoryId, username)
      .then(products => setProducts(filterProducts(products)))
  }, [categoryId, subCategoryId, minPrice, maxPrice, order]);

  const filterProducts = (products) => {
    let filteredProducts = products;

    if (minPrice > 0) {
      filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
    }
    if (maxPrice > 0) {
      filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
    }
    if (order) {
      filteredProducts = filteredProducts.sort((p1, p2) => (p1.price - p2.price) * parseInt(order))
    }
    return filteredProducts;
  };

  return (
    <>
      <FilterBar/>
      <Grid
        container
        spacing={2}
      >
        {products.map(p => (
          <Grid
            item
            key={p.id}
            lg={3}
            lx={3}
            md={4}
            xs={6}
          >
            <ProductCard product={p}/>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default UserProductList;
