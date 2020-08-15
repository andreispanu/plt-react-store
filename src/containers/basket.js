import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { DashboardContext } from "../context/Context";

// Material UI Components
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

// Components
import Quantity from "../components/Quantity";

// Material-UI Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& h6": {
      fontSize: theme.spacing(2),
      textTransform: "uppercase",
      fontWeight: theme.typography.fontWeightBold,
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  // Header
  headerItems: {
    padding: theme.spacing(2),
    maxWidth: 960,
    margin: 'auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  activeFilters: {
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& span': {
      paddingLeft: theme.spacing(1),
      fontWeight: theme.typography.fontWeightBold
    }
  },
  totalsContainerHeader: {
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& span': {
      paddingLeft: theme.spacing(1),
      fontWeight: theme.typography.fontWeightBold,
    }
  },
  content: {
    maxWidth: 960,
    margin: 'auto'
  },
  right: {
    height: '100%'
  },
  // Item
  itemContainer: {
    padding: theme.spacing(2),
  },
  imageContainer: {
    "& img": {
      display: "inline-block",
      width: "100%",
    },
  },
  // Dropdown Color Selector
  formControl: {
    width: "100%",
    boxSizing: "border-box",
    padding: `${theme.spacing(4)}px 0 0 ${theme.spacing(4)}px`
  },
  formControlItem: {
    width: "100%",
  },
  // Totals
  totalsContainer: {
    padding: theme.spacing(4),
    textAlign: 'center',
    borderTop: `2px solid ${theme.palette.primary.light}`,
    '& p': {
      fontSize: theme.spacing(4)
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary.main,
  },
}));

const Basket = (props) => {

  const classes = useStyles();
  const products = useContext(DashboardContext);
  const [shape, setShape] = useState({});
  const [items, setItems] = useState({});
  const [total, setTotal] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [bigTotal, setBigTotal] = useState(0);
  const [open, setOpen] = useState(true);


  //Backdrop Loader
  useEffect(() => {
    setOpen(props.loading);
  }, [props.loading])

  const handleClose = () => {
    setOpen(false);
  };

  const calculateItemValue = (q) => {
    const updatedItems = total.filter((x) => x.id !== q.id);
    setTotal([
      ...updatedItems,
      {
        id: q.id,
        value: q.value,
        action: q.action,
        quantity: q.quantity,
      },
    ]);
  };

  useEffect(() => {
    const result = total.reduce((acc, cur) => {
      return acc + cur.value * cur.quantity;
    }, 0);
    setBigTotal(result)
  }, [total]);

  // Add data into state
  useEffect(() => {
    if (products.data !== undefined && products.data.length !== undefined) {
      const result = [];
      products.data.map((item) =>
        result.push({
          id: item.id,
          colour: item.colour,
          name: item.name,
          price: item.price,
          img: item.img,
          quantity: 0,
        })
      );
      setShape(result);
    }
  }, [products]);

  // Dynamically add colors to state
  useEffect(() => {
    const addColors = () => {
      let colors = [];
      let uniqueColors = [];

      if (shape !== undefined && shape.length !== undefined) {
        shape.map((item) => colors.push(item.colour));
        uniqueColors = [...new Set(colors)];
      }
      setAvailableColors(uniqueColors);
    };
    addColors();
  }, [shape]);

  // Filter Data
  const filterItems = () => {
    const handleChange = (event) => {
      setSelectedFilter(event.target.value);
    };

    if (availableColors.length !== undefined && availableColors.length > 0) {
      return (
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className={classes.formControl}>
              <FormControl className={classes.formControlItem}>
                <InputLabel htmlFor="age-native-simple">Colors</InputLabel>
                <Select
                  native
                  value={selectedFilter}
                  onChange={handleChange}
                  inputProps={{
                    name: "age",
                    id: "age-native-simple",
                  }}
                >
                  <option value="All" key="all">
                    All
                </option>
                  {availableColors.map((item) => {
                    return (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </Grid>
        </Grid>

      );
    }
  };

  // Re-render Data
  useEffect(() => {
    let result = [];
    if (shape !== undefined && shape.length !== undefined) {
      if (selectedFilter === "All") {
        result.push(shape);
      } else {
        result.push(shape.filter((x) => x.colour === selectedFilter));
      }
      setItems(result);
    }
  }, [shape, selectedFilter]);

  // Show items in a list
  const itemsLoop = () => {
    let result = [];
    if (items !== undefined && items.length !== undefined) {
      items.map((i) => {
        i.map((item) =>
          result.push(
            <Grid
              container
              spacing={2}
              key={item.id}
              className={classes.itemContainer}
            >
              <Grid item xs={9}>
                <div className={classes.left}>
                  <Grid
                    container
                    spacing={2}
                    key={item.id}
                    className={classes.itemContainer}
                  >
                    <Grid item xs={4}>
                      <div className={classes.imageContainer}>
                        <img src={item.img} alt={item.name} />
                      </div>
                    </Grid>
                    <Grid item xs={8} className={classes.textContainer}>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="h6">
                        <span>&pound;</span>
                        {item.price}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </Grid>

              <Grid item xs={3}>
                <div className={classes.right}>
                  <Quantity
                    itemId={item.id}
                    itemPrice={item.price}
                    updateCart={(q) => calculateItemValue(q)}
                  />
                </div>
              </Grid>

            </Grid>
          )
        );
        return result;
      });
    }
    return result;
  };

  // Round Digits
  function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }

  // Show Totals
  const showTotals = () => {
    return (
      <div className={classes.totalsContainer}>
        <Typography><span>&pound;</span>{round(bigTotal, 2)}</Typography>
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="sticky">
          <Toolbar>

            <div className={classes.headerItems}>
              <div className={classes.activeFilters}>
                <Typography> Show Colors: <span>{selectedFilter}</span></Typography>
              </div>
              <div className={classes.totalsContainerHeader}>
                Total: <span>&pound;{round(bigTotal, 2)}</span>
              </div>
            </div>

          </Toolbar>
        </AppBar>
        <Paper>
          <div className={classes.content}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className={classes.filterDropdown}>
                  {filterItems()}
                </div>
                <div className={classes.itemsLoop}>
                  {itemsLoop()}
                </div>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={2}
                >
                  <Grid item xs={9}></Grid>
                  <Grid item xs={3}>
                    {showTotals()}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
};

Basket.propTypes = {
  loading: PropTypes.bool.isRequired
}

export default Basket;