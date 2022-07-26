import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import image from '../../assets/logo.svg';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
});


function UpcomingMovie(props) {
  const { classes } = props;
  const baseUrl = "/api/v1";

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let dataMovie = null;


    fetch(baseUrl + "/movies?page=1&limit=10&status=PUBLISHED", {
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
            img : movie.poster_url
          });
        }

        setMovies(upcominMovieData);
      });
  }, []);

  return (
      <GridList className={classes.gridList} cols={6}>
        {movies.map(tile => (
          <GridListTile key={tile.img} style={{ height: '250px'}}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
  );
}

UpcomingMovie.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpcomingMovie);