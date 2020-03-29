import Grid from "@material-ui/core/Grid";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {productListActions} from "../actions/productListActions";
import {categoryService} from "../services/categoryService";
import {subCategoryService} from "../services/subCategoryService";
import {InputLabel, Select, MenuItem, colors} from '@material-ui/core';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
}));


function FilterBar() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const productListReducer = useSelector(state => state.productListReducer);

  const {categoryId, subCategoryId, minPrice, maxPrice, order} = productListReducer;

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);


  useEffect(() => {
    categoryService
      .findAll()
      .then(categories => setCategories(categories))
  }, []);

  useEffect(() => {
    if (!categoryId) {
      setSubCategories([]);
      return;
    }
    subCategoryService
      .findAllByCategory(categoryId)
      .then(subCategories => setSubCategories(subCategories))
  }, [categoryId]);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    dispatch(productListActions.filterByCategory(categoryId));
  };

  const handleSubCategoryChange = (e) => {
    const subCategoryId = e.target.value;
    dispatch(productListActions.filterBySubCategory(subCategoryId));
  };

  const handleMinPriceChange = (e) => {
    const minPrice = parseInt(e.target.value);
    dispatch(productListActions.filterByMinPrice(minPrice));
  };

  const handleMaxPriceChange = (e) => {
    const maxPrice = parseInt(e.target.value);
    dispatch(productListActions.filterByMaxPrice(maxPrice));
  };

  const handlePriceOrderChange = (e) => {
    const order = e.target.value;
    dispatch(productListActions.orderByPrice(order))
  };

  return (
    <Card className={classes.root}>
      <Grid container spacing={1}>
        <Grid item md={2}>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryId}
            onChange={handleCategoryChange}>
            <MenuItem value=''>Select</MenuItem>
            {categories.map(c =>
              <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
            )}
          </Select>
        </Grid>
        <Grid item md={2}>
          <InputLabel>SubCategory</InputLabel>
          <Select
            value={subCategoryId}
            onChange={handleSubCategoryChange}>
            <MenuItem value=''>Select</MenuItem>
            {subCategories.map(s =>
              <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
            )}
          </Select>
        </Grid>
        <Grid item md={2}>
          <InputLabel>Min Price</InputLabel>
          <Select
            value={minPrice}
            onChange={handleMinPriceChange}>
            <MenuItem value="-1">No Minimum</MenuItem>
            <MenuItem value="50">$50</MenuItem>
            <MenuItem value="100">$100</MenuItem>
            <MenuItem value="200">$200</MenuItem>
            <MenuItem value="300">$300</MenuItem>
            <MenuItem value="500">$500</MenuItem>
            <MenuItem value="1000">$1000</MenuItem>
          </Select>
        </Grid>
        <Grid item md={2}>
          <InputLabel>Max Price</InputLabel>
          <Select
            value={maxPrice}
            onChange={handleMaxPriceChange}>
            <MenuItem value="-1">No Maximum</MenuItem>
            <MenuItem value="50">$50</MenuItem>
            <MenuItem value="100">$100</MenuItem>
            <MenuItem value="200">$200</MenuItem>
            <MenuItem value="300">$300</MenuItem>
            <MenuItem value="500">$500</MenuItem>
            <MenuItem value="1000">$1000</MenuItem>
          </Select>
        </Grid>
        <Grid item md={4}>
          <InputLabel>Order by Price</InputLabel>
          <Select
            value={order}
            onChange={handlePriceOrderChange}>
            <MenuItem value="1">Low to High</MenuItem>
            <MenuItem value="-1">High to Low</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </Card>
  )
};

export default FilterBar;
