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
import { useHistory  } from 'react-router-dom';


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
  const history = useHistory();
  const gotoDetail = (id) =>{
   // history.push(`/movie/${id}`);

    history.push({
      pathname: `/movie/${id}`,
      state: { detail: props.allMovies.filter((movie)=> movie.id === id)[0].details }
    })
  }
 
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList} cols={3} style={{ overflow:'hidden', padding: '5px 5px 5px 5px'}}>
        {props.allMovies.map(tile => (
          <GridListTile key={tile.img} style={{ height: '350px', padding: '5px 5px 5px 5px'}}>
            <img src={tile.img} alt={tile.title}  onClick={()=>gotoDetail(tile.id)}/>
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