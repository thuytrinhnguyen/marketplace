import React from "react";
import Header from "./Header";
import UserProductList from "./UserProductList";
import About from "./About";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
  Tabs,
  Tab,
} from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Page from "../../components/Page";
import {useSelector} from "react-redux";


function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


function UserProfile() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const userReducer = useSelector(state => state.userReducer);
  const {firstName, lastName} = userReducer;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title={`${firstName} ${lastName}`} >
      <Header/>
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab label="Product"/>
        <Tab label="About"/>
      </Tabs>
      <TabPanel value={value} index={0}>
        <UserProductList/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <About/>
      </TabPanel>
    </Page>
  )
}

export default UserProfile;
