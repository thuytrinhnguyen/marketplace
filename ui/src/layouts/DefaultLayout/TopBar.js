import React, {useState, useRef, useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {useHistory} from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';

import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  Input,
  colors,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener, Avatar, Container
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {authService} from '../../services/authService';
import AddProductDialog from "../../components/AddProductDialog";
import CartPopover from "../../components/Cart/CartPopover";
import {userService} from "../../services/userService";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  search: {
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 4,
    flexBasis: 300,
    height: 36,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: 'inherit'
  },
  searchInput: {
    flexGrow: 1,
    color: 'inherit',
    '& input::placeholder': {
      opacity: 1,
      color: 'inherit'
    }
  },
  searchPopper: {
    zIndex: theme.zIndex.appBar + 100
  },
  searchPopperContent: {
    marginTop: theme.spacing(1)
  },
  menuButton: {
    marginLeft: theme.spacing(0.5),
  },
  sellButton: {
    marginLeft: theme.spacing(0.5)
  },
  sellIcon: {},
  notificationButton: {},
  shoppingCartButton: {
    marginLeft: theme.spacing(0.5)
  },
  accountButton: {
    marginLeft: theme.spacing(0.5)
  },
  logoutButton: {
    marginLeft: theme.spacing(0.5)
  },
  logoutIcon: {
    marginRight: theme.spacing(1)
  },
  avatar: {
    border: `0.5px solid ${theme.palette.common.white}`,
    height: 30,
    width: 30,
    marginRight: 10,
  },
  name: {
    color: theme.palette.common.white
  }
}));

const popularSearches = [
  'Devias React Dashboards',
  'Devias',
  'Admin Pannel',
  'Project',
  'Pages'
];

function TopBar({
                  onOpenNavBarMobile,
                  className,
                  ...rest
                }) {
  const classes = useStyles();
  const history = useHistory();
  const searchRef = useRef(null);
  const shoppingCartReducer = useSelector(state => state.shoppingCartReducer);
  const userReducer = useSelector(state => state.userReducer);
  const [openSearchPopover, setOpenSearchPopover] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false);
  const [openViewCartPopover, setOpenViewCartPopover] = useState(false);

  const {username, firstName, profilePicture} = userReducer;
  const {products} = shoppingCartReducer;


  const handleLogout = () => {
    authService.logout(history);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);

    if (event.target.value) {
      if (!openSearchPopover) {
        setOpenSearchPopover(true);
      }
    } else {
      setOpenSearchPopover(false);
    }
  };

  const handleSearchPopverClose = () => {
    setOpenSearchPopover(false);
  };

  const handleViewCart = () => {
    setOpenViewCartPopover(true);
  };

  return (
    <div>
      <AppBar
        {...rest}
        className={clsx(classes.root, className)}
        color="primary"
      >
        <Toolbar>
          <Hidden lgUp>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              onClick={onOpenNavBarMobile}
            >
              <MenuIcon/>
            </IconButton>
          </Hidden>
          <RouterLink to="/">
            <img
              alt="Logo"
              src="/images/logos/logo--white.svg"
            />
          </RouterLink>
          <div className={classes.flexGrow}/>
          <Hidden smDown>
            <div
              className={classes.search}
              ref={searchRef}
            >
              <SearchIcon className={classes.searchIcon}/>
              <Input
                className={classes.searchInput}
                disableUnderline
                onChange={handleSearchChange}
                placeholder="Search people &amp; places"
                value={searchValue}
              />
            </div>
            <Popper
              anchorEl={searchRef.current}
              className={classes.searchPopper}
              open={openSearchPopover}
              transition
            >
              <ClickAwayListener onClickAway={handleSearchPopverClose}>
                <Paper
                  className={classes.searchPopperContent}
                  elevation={3}
                >
                  <List>
                    {popularSearches.map((search) => (
                      <ListItem
                        button
                        key={search}
                        onClick={handleSearchPopverClose}
                      >
                        <ListItemIcon>
                          <SearchIcon/>
                        </ListItemIcon>
                        <ListItemText primary={search}/>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </ClickAwayListener>
            </Popper>
          </Hidden>
          <IconButton onClick={() => history.push(`/profile/${username}`)}>
            <Avatar
              alt="Person"
              className={classes.avatar}
              src={profilePicture}
            />
            <Typography
              className={classes.name}
              variant='h6'
            >
              {firstName}
            </Typography>
          </IconButton>
          <IconButton
            className={classes.notificationButton}
            color="inherit"
          >
            <Badge
              badgeContent={2}
              color="secondary"
            >
              <NotificationsIcon/>
            </Badge>
          </IconButton>
          <IconButton
            className={classes.shoppingCartButton}
            color="inherit"
          >
            <Badge
              badgeContent={products.length > 0 ? products.reduce((a, b) => a + b.quantity, 0) : 0}
              color="secondary"
            >
              <ShoppingCartIcon onClick={handleViewCart}/>
            </Badge>
          </IconButton>
          <Hidden mdDown>
            <Button
              className={classes.sellButton}
              color="inherit"
              onClick={() => setAddProductDialogOpen(true)}>
              <AttachMoneyOutlinedIcon className={classes.sellIcon}/>
              Sell
            </Button>
            <Button
              className={classes.logoutButton}
              color="inherit"
              onClick={handleLogout}
            >
              <InputIcon className={classes.logoutIcon}/>
              Sign out
            </Button>
          </Hidden>
        </Toolbar>
        <AddProductDialog open={addProductDialogOpen} onClose={() => setAddProductDialogOpen(false)}/>
        <CartPopover onClose={() => setOpenViewCartPopover(false)} open={openViewCartPopover}/>
      </AppBar>
    </div>
  )
    ;
}

TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func
};

export default TopBar;
