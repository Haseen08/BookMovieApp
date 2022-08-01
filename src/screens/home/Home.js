import React, { useState, useEffect } from "react";
import './Home.css'
import Release from "./Release";
import UpcomingMovie from "./UpcomingMovie";
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MaterialUIForm from 'react-material-ui-form'
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem,FilledInput,Select, TextField, OutlinedInput } from '@material-ui/core';


const styles = theme => ({

  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,

  },

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Home = (props) => {
  const [allMovies, setAllMovies] = useState([]);
  const [artists, setartists] = useState([]);
  const [genre, setGenre] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [artistList, setArtistList] = useState([]);

  const { classes } = props;
  const baseUrl = "/api/v1";
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
        let releaseMovieData = [];
        for (let movie of response.movies) {
          releaseMovieData.push({
            id: movie.id,
            title: movie.title,
            author: movie.author,
            img: movie.poster_url,
            details: movie,
            cols: 2
          });
        }
        setAllMovies(releaseMovieData);
      });

      //GENRE LIST

      fetch(baseUrl + "/genres", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: null,
      })
        .then((response) => response.json())
        .then((response) => {
          let genreData = [];
          for (let genre of response.genres) {
            genreData.push( genre.genre );
          }
          setGenreList(genreData);
        });

        //Fetch ARTISTS
        fetch(baseUrl + "/artists", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: null,
        })
          .then((response) => response.json())
          .then((response) => {
            let artistsData = [];
            for (let artist of response.artists) {
              let data = artist.first_name + ' '+ artist.last_name
              artistsData.push(data );
            }
            setArtistList(artistsData);
          });


  }, [setGenreList, setAllMovies, setArtistList ]);


  //SEACRH BAR
  const handleSubmit = (data) => {
    console.log(genre)
    console.log(artists)
    fetch(baseUrl + `/movies?page=1&limit=10&status=RELEASED&end_date=${data.end_date}&start_date=${data.start_date}&title=${data.movieName}&genre=${genre}&artists=${artists}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      }
    })
      .then((response) => response.json())
      .then((response) => {
        let filterMovieData = [];

        for (let movie of response.movies) {
          filterMovieData.push({
            id: movie.id,
            title: movie.title,
            author: movie.author,
            img: movie.poster_url,
            details: movie,
            cols: 2
          });
        }
        setAllMovies(filterMovieData);
      });
  }


  const handleChangeArtists = (event) => {
    const {
      target: { value },
    } = event;
    setartists(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  }



  const handleChangeGenere = (event) => {
    const {
      target: { value },
    } = event;
    setGenre(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div className={classes.root}>
      <Typography className="movieHeader" variant="h6" gutterBottom component="div">
        UPCOMING MOVIES
      </Typography>

      <UpcomingMovie />
      <Grid container spacing={24}>
        <Grid item xs={12} sm={9}>
          {allMovies.length > 0 ?
            <Release allMovies={allMovies} props /> :
            null}

        </Grid>
        <Grid item xs={12} sm={3}>
          {/* Filter Form */}
          <Card className={classes.root} variant="filled">
            <CardContent>
              <MaterialUIForm onSubmit={handleSubmit}>
                <br />

                <TextField value="" name="movieName" placeholder="Movie Name" />
                <br /><br />

                <FormControl fullWidth>
        <InputLabel id="genre-checkbox-label">Genres</InputLabel>
        <Select
          labelId="genre-checkbox-label"
          id="genre-multiple-checkbox"
          multiple
          value={genre}
          onChange={handleChangeGenere}
          input={<FilledInput label="Genres" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {
            genreList.length ?
          genreList.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={genre.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          )):
          null}
        </Select>
      </FormControl>

                <br /><br />
                <FormControl fullWidth >
                  <InputLabel id="artists-multiple-checkbox-label">Artists</InputLabel>
                  <Select
                    labelId="artists-multiple-checkbox-label"
                    id="artists"
                    multiple
                    value={artists}
                    onChange={handleChangeArtists}
                    input={<FilledInput label="Artists" />}
                   // name='artists'
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {artistList.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={artists.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br /><br />
                <TextField
                  fullWidth
                  id="start_date"
                  label="Release Date Start"
                  name='start_date'
                  type="date"
                  value=''
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <br /> <br />
                <TextField
                  fullWidth
                  id="end_date"
                  label="Release Date End"
                  name='end_date'
                  type="date"
                  value=''
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <br />

                <div style={{ 'margin-top': '10px' }}>
                  <Button variant="contained" color='primary' type="submit" fullWidth={true}>APPLY</Button >
                </div>

              </MaterialUIForm>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}



export default withStyles(styles)(Home);