import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MaterialUIForm from 'react-material-ui-form'
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, FilledInput, Select, TextField } from '@material-ui/core';


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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 500,
    },
  },
};

function SearchMovie(props) {
  const { classes } = props;
  const baseUrl = "/api/v1";

  const [movies, setMovies] = useState([]);
  const [personName, setPersonName] = React.useState([]);

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
  const handleSubmit = (data) => {
    console.log(data)
  }
  const handleValuesChange = (data) => {
    console.log(data)
  }
  const handleFieldValidations = (data) => {
    console.log(data)
  }

  const handleChange = (event) =>{
    const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
  }

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  
  return (
    <Card className={classes.root} variant="filled">
    <CardContent>
    <MaterialUIForm onSubmit={handleSubmit} onValuesChange={handleValuesChange} onFieldValidation={handleFieldValidations}>
               <br />

                <TextField  value="" name="movieName" placeholder="Movie Name" required />
                <br /><br />

                
                <FormControl  sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Genres</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<FilledInput label="Genres" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br /><br />
      <FormControl  sx={{ m: 1, width:600 }}>
        <InputLabel id="demo-multiple-checkbox-label">Artists</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<FilledInput label="Artists" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
               
                <br /><br />

                <TextField  value="" name="release date start" placeholder="Release Date Start" required />
                <br /> <br />

                <TextField  value="" name="release date end" placeholder="Release Date End " required />
                <br />
                
                <div className="loginButton">
                    <Button variant="contained" color='primary' type="submit">REGISTER</Button>
                </div>

                </MaterialUIForm>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>
  );
}

SearchMovie.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchMovie);