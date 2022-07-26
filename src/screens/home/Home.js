import { Typography } from "@material-ui/core";
import React from "react";
import './Home.css'
import Release from "./Release";
import SearchMovie from "./SearchMovie";
import UpcomingMovie from "./UpcomingMovie";
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    
  },
});


const Home = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography className="movieHeader" variant="h6" gutterBottom component="div">
        UPCOMING MOVIES
      </Typography>
      
      <UpcomingMovie />
      <Grid container spacing={24}>
      <Grid item xs={12} sm={9}>
           <Release />
        </Grid>
        <Grid item xs={12} sm={3}>
        <SearchMovie />
        </Grid>
</Grid>
   
      
     
    </div>
  )
}



export default withStyles(styles)(Home);