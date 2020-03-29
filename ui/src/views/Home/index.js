import React, {Fragment, useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import CategoryTree from "./CategoryTree";
import ProductGrid from "./ProductGrid";
import {productService} from "../../services/productService";
import {categoryService} from "../../services/categoryService";
import {subCategoryService} from "../../services/subCategoryService";
import {Typography} from "@material-ui/core";

function Home() {
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.findAll(
      category ? category.id : null,
      subCategory ? subCategory.id : null,
      null)
      .then(products => setProducts(products));
  }, [category, subCategory]);

  const handleCategoryClick = (category) => {
    setSubCategory(null);
    setCategory(category);
  };

  const handleSubCategoryClick = (subCategory) => {
    setCategory(subCategory.category);
    setSubCategory(subCategory);
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item md={2}>
          <CategoryTree
            onCategoryClick={handleCategoryClick}
            onSubCategoryClick={handleSubCategoryClick}
          />
        </Grid>
        <Grid item md={10}>
          <Typography variant="h2">
            {category && category.name} {subCategory && ` > ${subCategory.name}`}
          </Typography>
          <ProductGrid products={products}/>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default Home;
