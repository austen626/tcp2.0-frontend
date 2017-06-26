import React from 'react';
import { connect } from 'react-redux';
import ChangePasswordForm from './ChangePasswordForm';
import { changePasswordRequest } from 'redux/actions/changePassword';
const ChangePassword = (props) => { 
    return (
        <ChangePasswordForm { ...props }/>
    )
}

const mapStateToProps = state => ({
    avatar: state.auth.avatar
});

const mapDispatchToProps = dispatch => ({
    changePasswordRequest: data => dispatch(changePasswordRequest(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePassword);