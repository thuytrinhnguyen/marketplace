import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {ListItemAvatar, ListItemText, TableCell} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import MuiCardHeader from "../../theme/overrides/MuiCardHeader";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from "@material-ui/styles";
import {shoppingCartActions} from "../../actions";
import {snackbarActions} from "../../actions/snackbarActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Page from "../../components/Page";
import Link from "@material-ui/core/Link";
import {useHistory} from "react-router";

const useStyle = makeStyles((theme) => ({
    image: {
      width: 50,
      height: 50
    },
    buttonText: theme.palette.common.white,
  }
));

function Checkout() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const shoppingCartReducer = useSelector(state => state.shoppingCartReducer);
  const {products} = shoppingCartReducer;
  const history = useHistory();

  const handleRemoveProduct = (product) => {
    dispatch(shoppingCartActions.removeProduct(product));
    dispatch(snackbarActions.success('Product has been removed!'))
  };

  return (
    <Page title="Checkout">
      <Grid container spacing={1}>
        <Grid item md={8}>
          <Card>
            <CardHeader title="Check out"/>
            <Divider/>
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell/>
                    <TableCell>Product</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>SubTotal</TableCell>
                    <TableCell/>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map(p =>
                    <TableRow>
                      <TableCell>
                        <CardMedia className={classes.image} image={`${p.image}`}/>
                      </TableCell>
                      <TableCell>
                        <Link
                          href="#"
                          variant="body2"
                          color="primary"
                          onClick={() => history.push(`/products/${p.id}`)}
                        >
                          {p.name}
                        </Link>
                      </TableCell>
                      <TableCell>{p.quantity}</TableCell>
                      <TableCell>${p.price.toFixed(2)}</TableCell>
                      <TableCell>${(p.quantity * p.price).toFixed(2)}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleRemoveProduct(p)}>
                          <DeleteIcon/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={4}>
          <Card>
            <CardHeader title="Total"/>
            <Typography variant="h6">Total:
              ${products.reduce((p1, p2) => p1 + (p2.price * p2.quantity), 0).toFixed(2)}</Typography>
            <Button variant="contained" color="primary">Pay Now</Button>
          </Card>
        </Grid>
      </Grid>
    </Page>
  )
}

export default Checkout;
