import React from 'react';
import Badge from '@material-ui/core/Badge';
import Favorite from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({ numberOfSaved: state.savedArtists.length });

const HeaderSavedArtist = ({ numberOfSaved }) => (
  <Badge badgeContent={numberOfSaved} color="secondary">
    <Favorite />
  </Badge>
);

export default connect(mapStateToProps)(HeaderSavedArtist);

HeaderSavedArtist.propTypes = {
  numberOfSaved: PropTypes.number.isRequired,
};
