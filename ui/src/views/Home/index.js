import React, {Fragment, useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import CategoryTree from "./CategoryTree";
import {Typography} from "@material-ui/core";
import HomeProductGrid from "./HomeProductGrid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  heading: {
    marginTop: theme.spacing(2),
  },
  categoryTree: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  }
}));

function Home() {
  const classes = useStyles();

  const homeProductsReducer = useSelector(state => state.homeProductsReducer);
  const {categoryName, subCategoryName} = homeProductsReducer;

  return (
      <Grid container >
        <Grid item md={2}>
          <CategoryTree/>
        </Grid>
        <Grid item md={10}>
          <Typography variant="h2" className={classes.heading}>
            {categoryName && categoryName} {subCategoryName && ` > ${subCategoryName}`}
          </Typography>
          <HomeProductGrid/>
        </Grid>
      </Grid>
  )
}

export default Home;
