import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import React, {Fragment, useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import {categoryService} from "../../services/categoryService";
import {subCategoryService} from "../../services/subCategoryService";

const useStyles = makeStyles({
  list: {
    width: 250,
  }
});

function ToggleDrawer({open, onClose}) {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    categoryService
      .findAll()
      .then(categories => setCategories(categories))
  },[]);

  useEffect(() => {
    subCategoryService
      .findAll()
      .then(subCategories => setSubCategories(subCategories))
  }, []);

  const list = (
    <div
      className={clsx(classes.list)}
      role="presentation"
    >
      <List>
        {categories.map(c => (
          <ListItem button key={c.id}>
            <ListItemText primary={c.name} />

            {subCategories
              .filter(s => s.category.id === c.id)
              .map(s =>
                <ListItem key={s.id}>
                  <ListItemText primary={`> ${s.name}`} />
                </ListItem>
              )}

            <Divider />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
          <Drawer
            anchor={'left'}
            open={open}
            onClose={onClose}>
            {list}
          </Drawer>
  );
}

export default ToggleDrawer;
