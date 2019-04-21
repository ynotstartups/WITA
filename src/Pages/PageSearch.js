import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import ArtistCard from '../Components/ArtistCard/ArtistCard';
import Header from '../Components/Header/Header';

function mapStateToProps({ searchQuery }) {
  return {
    searchQuery,
  };
}

// cannot reuse fragments because `GraphQL error on Artsy side
// named fragment spread is currently not supported`
const SEARCH_ARTISTS = query => gql`
    {
      search(query: "${query}", entities: [ARTIST], first: 20) {
        edges {
          node {
            displayLabel
            imageUrl
            ... on Artist {
              id
              name
              href
            }
          }
        }
      }
    }
  `;

const PageSearch = ({ searchQuery }) => (
  <>
    <Header />
    <div style={{ padding: 32 }}>
      <Query query={SEARCH_ARTISTS(searchQuery)}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return (
            <>
              <Typography variant="h4" gutterBottom>
                Searching artists with name
                {' '}
                {searchQuery}
              </Typography>
              <Grid container spacing={32}>
                {data.search.edges.map(({ node }) => (
                  <Grid item xs={12} sm={6} md={3} key={node.id}>
                    <ArtistCard {...node} />
                  </Grid>
                ))}
              </Grid>
            </>
          );
        }}
      </Query>
    </div>
  </>
);

export default connect(mapStateToProps)(PageSearch);

PageSearch.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
