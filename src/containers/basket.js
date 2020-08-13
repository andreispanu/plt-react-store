import React, { useState, useEffect, useContext } from 'react';
import { DashboardContext } from '../context/Context';

// Material UI Components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& h6': {
      fontSize: theme.spacing(2),
      textTransform: 'uppercase',
      fontWeight: theme.typography.fontWeightBold
    }
  },
  paper: {
    padding: theme.spacing(2)
  },
  itemContainer: {
    padding: theme.spacing(2)
  },
  imageContainer: {
    '& img': {
      display: 'inline-block',
      width: '100%'
    }
  },
  textContainer: {

  }
}));

const Basket = () => {
  const classes = useStyles();
  const products = useContext(DashboardContext);
  const [items, setItems] = useState({});

  useEffect(() => {
    setItems(products.data)
  }, [products.data])

  const itemsLoop = () => {
    let result = []
    if (items !== undefined && items.length !== undefined) {
      items.map(item => (
        result.push(
          <Grid container spacing={2} key={item.id} className={classes.itemContainer}>
            <Grid item xs={4}>
              <div className={classes.imageContainer}>
                <img src={item.img} alt={item.name} />
              </div>
            </Grid>
            <Grid item xs={8} className={classes.textContainer}>
              <Typography variant='h6'>
                {item.name}
              </Typography>
              <Typography variant='h6'>
                <span>&pound;</span>{item.price}
              </Typography>
            </Grid>
          </Grid>
        )
      ))
      return result
    }
    return result
  }

  return (
    <React.Fragment >
      <div className={classes.root}>
        <Paper>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {itemsLoop()}
            </Grid>
          </Grid>
        </Paper>
      </div>
    </React.Fragment>
  )
}

export default Basket;