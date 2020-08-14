import React, { useState, useEffect, useContext } from 'react';
import { DashboardContext } from '../context/Context';

// Material UI Components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import Quantity from '../components/quantity';

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
  },
  formControl: {
    width: "100%",
    padding: theme.spacing(4),
    boxSizing: 'border-box'
  }
}));

const Basket = () => {
  const classes = useStyles();
  const products = useContext(DashboardContext);
  const [shape, setShape] = useState({});
  const [items, setItems] = useState({});
  const [total, setTotal] = useState([{}])
  const [availableColors, setAvailableColors] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all')

  const [totalItemsValue, setTotalItemsValue] = useState([])

  const calculateItemValue = (q) => {
    setTotal([
      ...total,
      {
        id: q.id,
        value: q.value,
        action: q.action
      }
    ])
  }

  useEffect(() => {
    console.log(total)
  }, [total])

  // useEffect(() => {
  //   const data = total.reduce(
  //     (results, current) => ({
  //       ...total,
  //       [current.id]: {
  //         id: current.id,
  //         value: current.value
  //       }
  //     })
  //   )
  //   setTotalItemsValue(data)

  // }, [total])

  // useEffect(() => {
  //   console.log(totalItemsValue)
  // }, [totalItemsValue])



  // useEffect(() => {
  //   // console.log(total)
  //   // Object.values(total).map(i => console.log(i))

  //   // Object.values(total).reduce(function (accumulator, currentValue) {
  //   //   return (
  //   //   )
  //   // console.log(total)

  //   function getIds() {
  //     let result = [];
  //     Object.values(total).map(i => result.push(i.id))
  //     result = [...new Set(result)]
  //     return result.filter(x => x !== undefined)
  //   }

  //   function updateValues() {
  //     let result = [];
  //     Object.values(total).map(i => result.push(i.value))
  //     return result;
  //   }

  //   let listOfId = getIds();

  //   listOfId.forEach(element => {
  //     updateIds(element)
  //   })

  //   updateValues()

  // }, [total])



  // Add data into state
  useEffect(() => {
    if (products.data !== undefined && products.data.length !== undefined) {
      const result = [];
      products.data.map(item =>
        result.push(
          {
            id: item.id,
            colour: item.colour,
            name: item.name,
            price: item.price,
            img: item.img,
            quantity: 0
          }
        )
      )
      setShape(result)
    }
  }, [products])

  // Dynamically add colors to state 
  useEffect(() => {
    const addColors = () => {
      let colors = [];
      let uniqueColors = [];

      if (shape !== undefined && shape.length !== undefined) {
        shape.map(item =>
          colors.push(
            item.colour
          )
        )
        uniqueColors = [...new Set(colors)];
      }
      setAvailableColors(uniqueColors)
    }
    addColors();
  }, [shape])

  // Filter Data
  const filterItems = () => {

    const handleChange = (event) => {
      setSelectedFilter(event.target.value);
    }

    if (availableColors.length !== undefined && availableColors.length > 0) {
      return (
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Colors</InputLabel>
          <Select
            native
            value={selectedFilter}
            onChange={handleChange}
            inputProps={{
              name: 'age',
              id: 'age-native-simple',
            }}
          >
            <option value='all' key='all'>All</option>
            {availableColors.map(item => {
              return (
                <option value={item} key={item}>{item}</option>
              )
            })}
          </Select>
        </FormControl>
      )
    }
  }

  // Re-render Data
  useEffect(() => {
    let result = [];
    if (shape !== undefined && shape.length !== undefined) {
      if (selectedFilter === 'all') {
        result.push(shape)
      } else {
        result.push(shape.filter(x => x.colour === selectedFilter));
      }
      setItems(result)
    }
  }, [shape, selectedFilter])

  // Show items in a list
  const itemsLoop = () => {
    let result = []
    if (items !== undefined && items.length !== undefined) {
      items.map(i => {
        i.map(item => (
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
                <Quantity itemId={item.id} itemPrice={item.price} updateCart={q => calculateItemValue(q)} />
              </Grid>
            </Grid>
          )
        ))
        return result
      }
      )
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
            <Grid item xs={6}>
              {filterItems()}
            </Grid>
          </Grid>
        </Paper>
      </div>
    </React.Fragment>
  )
}

export default Basket;