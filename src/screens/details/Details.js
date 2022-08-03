import React, { useReducer } from "react";
//import useHistory from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { reducer, initialState } from "../../reducer";
import Typography from "@material-ui/core/Typography";
import { Grid, GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import ReactPlayer from 'react-player'
import ReactStars from "react-rating-stars-component";

const Details = (props) => {

  // const [count, dispatch] = useReducer(reducer, initialState);
  // console.log('======', count)
  // dispatch("add")
  const movieData = props.location.state.detail;
  const genre = movieData.genres.map((item) => item).join(',')
  const history = useHistory();
  const gotoHome = () => {
    history.push(`/`);
  }

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <div>
      <Button variant="outlined" onClick={gotoHome}>
        Back To Home
      </Button>

      <Grid container justifyContent="flex-end">
        <Grid xs={2}>
          <img src={movieData.poster_url} />
        </Grid>

        <Grid xs={6}>
          <Typography variant="headline" component="h2">
            {movieData.title}
          </Typography>
          <div>
            <Typography variant="headline" component="h2">
              Genre :
              {genre}
            </Typography>
          </div>
          <div>
            <Typography variant="headline" component="h2">
              Duration :
              {movieData.duration}
            </Typography>
          </div>

          <div>
            <Typography variant="headline" component="h2">
              Relaese Date :
              {movieData.release_date}
            </Typography>
           
          </div>

          <div>
            <Typography variant="headline" component="h2">
              Rating :
              {movieData.rating}
            </Typography>
           
          </div>

          <div>
            <Typography variant="headline" component="h2">
              Plot :
            </Typography>
            {movieData.storyline}
          </div>
          <div>
            <Typography variant="headline" component="h2">
              Trailer :
            </Typography>

            <ReactPlayer url={movieData.trailer_url} />
          </div>
        </Grid>
        <Grid xs={2}>
          <div>
            <Typography variant="headline" component="h2">
              Rate this movie :
            </Typography>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
          </div>

          <div>
            <Typography variant="headline" component="h2">
              Artists :
            </Typography>

            

        <GridList cellHeight={180}  cols={2} style={{ overflow:'hidden'}}>
        {movieData.artists.map(tile => (
          <GridListTile key={tile.profile_url} style={{ height: '350px'}}>
            <img src={tile.profile_url} alt={tile.first_name}/>
            <GridListTileBar
              title={tile.first_name + tile.last_name}
    
            />
          </GridListTile>
        ))}
      </GridList>
          </div>

        </Grid>
      </Grid>
    </div>
  )

}

export default Details;