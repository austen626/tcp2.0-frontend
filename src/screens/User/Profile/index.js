import React from 'react';
import { connect } from 'react-redux';
import ProfileForm from './profileForm';
import { getUserDetails, updateUserRequest } from 'redux/actions/userAction';
const ProfileScreen = (props) => {
    return (
        <ProfileForm  { ...props }/>
    )
}

const mapStateToProps = state => ({
    avatar: state.auth.avatar,
    user: state.user,
});
const mapDispatchToProps = dispatch => ({
    getUserDetails: data => dispatch(getUserDetails(data)),
    updateUserRequest: data => dispatch(updateUserRequest(data)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileScreen);

