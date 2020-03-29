import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Snackbar, SnackbarContent, colors} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined';
import {useDispatch, useSelector} from "react-redux";
import {snackbarActions} from "../actions/snackbarActions";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  message: {
    display: 'flex',
    alignItems: 'center'
  },
}));

function MessageSnackbar() {
  const classes = useStyles();

  const snackbarReducer = useSelector(state => state.snackbarReducer);
  const {open, message, type} = snackbarReducer;

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(snackbarActions.hide())
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      autoHideDuration={1500}
      onClose={handleClose}
      open={open}
    >
      <Alert onClose={handleClose} severity={type} className={classes.message}>
        {message}
      </Alert>
    </Snackbar>
  );
}

MessageSnackbar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  message: PropTypes.string,
  type: PropTypes.string,
};

export default MessageSnackbar;
