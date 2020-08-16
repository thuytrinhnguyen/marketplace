import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Link,
  Avatar
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import Page from 'src/components/Page';
import gradients from 'src/utils/gradients';
import LoginForm from './LoginForm';
import {authService} from '../../services/authService';
import {useHistory} from 'react-router';
import {useDispatch} from "react-redux";
import {userActions} from "../../actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6, 2)
  },
  card: {
    width: theme.breakpoints.values.md,
    maxWidth: '100%',
    overflow: 'visible',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4)
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  icon: {
    backgroundImage: gradients.green,
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
    fontSize: 32
  },
  loginForm: {
    marginTop: theme.spacing(3)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  person: {
    marginTop: theme.spacing(2),
    display: 'flex'
  },
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

function Login() {
  const classes = useStyles();

  const history = useHistory();

  const dispatch = useDispatch();

  const handleLogin = (username, password) => {
    authService
      .login(username, password)
      .then(() => {
        dispatch(userActions.logIn());
        history.push('/');
      });
  };

  return (
    <Page
      className={classes.root}
    >
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <LockIcon className={classes.icon}/>
          <Typography
            gutterBottom
            variant="h3"
          >
            Sign in
          </Typography>
          <Typography variant="subtitle2">
            Demo credentials: trinhnguyen - 123
          </Typography>
          <LoginForm
            className={classes.loginForm}
            onLogin={handleLogin}
          />
        </CardContent>
        <CardMedia
          className={classes.media}
          image="https://r9u8a7x4.stackpathcdn.com/wp-content/uploads/revslider/rotating-words/office_cover.jpg"
          title="Cover"
        >
          <Typography
            color="inherit"
            variant="subtitle1"
          >
            Welcome to Marketplace - an e-commerce website for technology products
          </Typography>
          <div className={classes.person}>
            <Avatar
              alt="Person"
              className={classes.avatar}
              src="https://scontent.fsyd3-1.fna.fbcdn.net/v/t1.0-9/69759729_2587043344660910_4685389306494189568_o.jpg?_nc_cat=106&_nc_sid=174925&_nc_ohc=XoifSDe09VwAX-m8vYD&_nc_ht=scontent.fsyd3-1.fna&oh=565bb81577ab677374d5fc56a64e7244&oe=5F5D401C"
            />
            <div>
              <Typography
                color="inherit"
                variant="body1"
              >
                Thuy Trinh Nguyen
              </Typography>
              <Typography
                color="inherit"
                variant="body2"
              >
                Graduate Software Engineer
              </Typography>
            </div>
          </div>
        </CardMedia>
      </Card>
    </Page>
  );
}

export default Login;
