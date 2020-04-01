import React from 'react';
import {Link as RouterLink, useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {
  Popover,
  CardHeader,
  CardActions,
  Divider,
  Button,
  colors
} from '@material-ui/core';
import CartProductList from "./CartProductList";

const useStyles = makeStyles(() => ({
  root: {
    width: 550,
    maxWidth: '100%'
  },
  actions: {
    backgroundColor: colors.grey[50],
    justifyContent: 'center'
  }
}));

function CartPopover({...rest}) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Popover
      {...rest}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 64, left: 1100 }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
    >
      <div className={classes.root}>
        <CardHeader title="Cart"/>
        <Divider/>
        <CartProductList/>
        <Divider/>
        <CardActions className={classes.actions}>
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={() => history.push('/checkout')}
          >
            Check Out
          </Button>
        </CardActions>
      </div>
    </Popover>
  );
}

CartPopover.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default CartPopover;
