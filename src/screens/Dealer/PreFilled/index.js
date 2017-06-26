import React from 'react';
import { connect } from 'react-redux';
import PreFilledForm from './preFilledForm';
import {
    setReorderCustomerById,
    changeCustomer,
    sendAll,
    changeCustomerContact,
} from 'redux/actions/customer';
const PreFilled = (props) => {
    return (
        <PreFilledForm { ...props }/>
    )
}

const mapStateToProps = state => ({
    customer: state.customer,
    // customers: state.customers,
});

const mapDispatchToProps = dispatch => ({
    setReorderCustomerById: data => dispatch(setReorderCustomerById(data)),
    changeCustomer: data => dispatch(changeCustomer(data)),
    sendAll: (data, funName, type, history) => dispatch(sendAll(data, funName, type, history)),
    changeCustomerContact : (key, value, role) => dispatch(changeCustomerContact (key, value, role))

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PreFilled);