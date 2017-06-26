import React from 'react';
import { connect } from 'react-redux';
import ApplyPreFilledView from './applyPreFilledView';
import { 
    setReorderCustomerById,
    changeCustomer,
    sendAll,
    changeCustomerContact,
    addProduct,
} from 'redux/actions/customer';

import { 
    getCustomerHistory,
    getCustomerPaymentHistory
} from 'redux/actions/customers';
const ApplyPreView = (props) => { 
    return (
        <ApplyPreFilledView { ...props }/>
    )
}

const mapStateToProps = state => ({
    customer: state.customer,
    customerData: state.customers
});

const mapDispatchToProps = dispatch => ({
   setReorderCustomerById: data => dispatch(setReorderCustomerById(data)),
   changeCustomer: data => dispatch(changeCustomer(data)),
   sendAll: (data, funName, type, history) => dispatch(sendAll(data, funName, type, history)),
   changeCustomerContact : (key, value, role) => dispatch(changeCustomerContact (key, value, role)),
   getCustomerHistory: (data) => dispatch(getCustomerHistory(data)),
   getCustomerPaymentHistory: (data) => dispatch(getCustomerPaymentHistory(data)),
   addProduct: () => dispatch(addProduct()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplyPreView);