import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Search from '@material-ui/icons/Search';
import { useDebounce } from 'use-debounce';
import InputAdornment from '@material-ui/core/InputAdornment';


const SEARCH_ARTISTS = query => {
  return gql`
    {
      search(query: "${query}", entities: [ARTIST], first: 5) {
        edges {
          node {
            displayLabel
            imageUrl
            href
            ... on Artist {
              href
              name
              artworks(page: 1) {
                displayLabel
                images {
                  url
                  title
                }
              }
            }
          }
        }
      }
    }
  `;
};

const App = ({ onDogSelected }) => {

  const [query, setQuery] = useState("tiger");
  const [debouncedQuery] = useDebounce(query, 1000);


  window.setQuery = setQuery;

  return (
    <div style={{ padding: 20 }}>
      <TextField fullWidth id="input-with-icon-grid" label="Search for Artist" onChange={(e) => { setQuery(e.target.value) }} style={{ paddingBottom: 20 }} InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }} />

      <Query query={SEARCH_ARTISTS(debouncedQuery)}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <Grid container spacing={32}>

              {data.search.edges.map(({ node }) => {
                const { displayLabel, imageUrl, href } = node;
                return (
                  <Grid item xs={12} sm={6} md={3} lg={2} justify="space-evenly"
                  >
                    <Card>
                      <CardMedia
                        style={{ height: 150 }}
                        image={imageUrl}
                        title={`Art work by ${displayLabel}`}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {displayLabel}
                        </Typography>
                        <Typography component="p">
                          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                          across all continents except Antarctica
                    </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary" onClick={() => { window.open(`https://www.artsy.net${href}`) }} >
                          Learn More
                  </Button>
                      </CardActions>
                    </Card>
                  </Grid>

                )
              })}
            </Grid>
          );
        }}
      </Query></div >
  )
};

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

export default App;