import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    deleteDealer,
    getDealers,
    setDealer,
} from '../../../../redux/actions/admin';

export function PureFunding({}) {
    return <></>;
}

const mapStateToProps = (state) => ({
    dealers: state.admin.dealers,
});

const mapDispatchToProps = (dispatch) => ({
    getDealers: () => dispatch(getDealers()),
    setDealer: (item) => dispatch(setDealer(item)),
    deleteDealer: (id) => dispatch(deleteDealer(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PureFunding);
