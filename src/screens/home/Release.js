import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import InfoIcon from '@material-ui/icons/Info';
import image from '../../assets/logo.svg';
import { ListSubheader } from '@material-ui/core';


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      backgroundColor: theme.palette.background.paper,
      
    },
    gridList: {
      width: 500,
      height: 450,
      
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  });


function Release(props) {
  const { classes } = props;
  const baseUrl = "/api/v1";

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let dataMovie = null;


    fetch(baseUrl + "/movies?page=1&limit=10&status=RELEASED", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: dataMovie,
    })
      .then((response) => response.json())
      .then((response) => {
       

        let upcominMovieData = [];

        for (let movie of response.movies) {
          upcominMovieData.push({
            id: movie.id,
            title: movie.title,
            author: movie.author,
            img : movie.poster_url,
            cols:2
          });
        }

        setMovies(upcominMovieData);
      });
  }, []);

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList} cols={3} style={{ overflow:'hidden', padding: '5px 5px 5px 5px'}}>
        {movies.map(tile => (
          <GridListTile key={tile.img} style={{ height: '350px', padding: '5px 5px 5px 5px'}}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

Release.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Release);