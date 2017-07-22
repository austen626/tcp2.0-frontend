import API from '../../api';
import { pushNotification } from 'utils/notification';
import { message } from 'shared/constant';
import {
    GET_USER_START,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    UPDATE_USER_START,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,    
    GET_STAFF_REQUEST,
    GET_STAFF_SUCCESS,
    GET_STAFF_FAILED,
    DELETE_STAFF_REQUEST,
    DELETE_STAFF_SUCCESS,
    DELETE_STAFF_FAILED,
    INVITE_STAFF_REQUEST,
    INVITE_STAFF_SUCCESS,
    INVITE_STAFF_FAILED
} from './actionTypes';

export function getUserDetails(init) {
    return async function(dispatch) {
        dispatch({
            type: GET_USER_START
        });
        try {
            const response = await API.get(`/accounts/me`);            
            if(response) {
                const responseData = response.data;
                init && init({
                    email: responseData.email,
                    phone: responseData.phone,
                    firstName: responseData.first_name,
                    lastName: responseData.last_name,
                })
                dispatch({
                    type: GET_USER_SUCCESS,
                    payload: responseData
                }); 
            }
            
        } catch (error) {
            error && error.response && pushNotification(error.response.data, 'error', 'TOP_RIGHT', 3000);
            dispatch({
                type: GET_USER_FAILURE
            })
        }
    }
}

export function updateUserRequest(action) {
    return async function(dispatch) {
        dispatch({
            type: UPDATE_USER_START
        });
        try {
            const response = await API.put(`/accounts/update-profile`, action);            
            if(response) {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    payload: action
                }); 
                pushNotification(message.USER_UPDATE_SUCCESS, 'success', 'TOP_RIGHT', 3000);
            }
            
        } catch (error) {
            pushNotification(error.response.data, 'error', 'TOP_RIGHT', 3000);
            dispatch({
                type: UPDATE_USER_FAILURE
            })
        }
    }
}

export function getStaffRequest(action) {
    return async function(dispatch) {
        dispatch({
            type: GET_STAFF_REQUEST
        });
        try {
            const response = await API.get(`/accounts/users`);
            if(response) {
                const responseData = response.data;
               
                dispatch({
                    type: GET_STAFF_SUCCESS,
                    payload: responseData
                }); 
            }
            
        } catch (error) {
            error && error.response && pushNotification(error.response.data, 'error', 'TOP_RIGHT', 3000);
            dispatch({
                type: GET_STAFF_FAILED
            })
        }
    }
}

export function deleteStaffRequest(action) {
    return async function(dispatch) {
        dispatch({
            type: DELETE_STAFF_REQUEST
        });
        try {
            const response = await API.put(`/accounts/user-delete/${action.deleteDivId}`);
            if(response) {
                dispatch({
                    type: DELETE_STAFF_SUCCESS,
                });
                action.getStaffRequest && action.getStaffRequest(); 
            }
           
            pushNotification(message.DELETE_SUCCESSFULLY, 'success', 'TOP_RIGHT', 3000);
            
        } catch (error) {
            error && error.response && pushNotification(error.response.data, 'error', 'TOP_RIGHT', 3000);
            dispatch({
                type: DELETE_STAFF_FAILED
            })
        }
    }
}

export function inviteStaffRequest(action) {
    return async function(dispatch) {
        dispatch({
            type: INVITE_STAFF_REQUEST
        });
        const data = {
            email: action.email,
            role: action.role
        };
        try {
            const response = await API.post(`/accounts/invite`, data);
            if(response) {
                dispatch({
                    type: INVITE_STAFF_SUCCESS,
                });
            }
           action.toggleModal && action.toggleModal();
            pushNotification(message.INVITE_SUBMISSION_SUCCESS, 'success', 'TOP_RIGHT', 3000);
            
        } catch (error) {
            error && error.response && pushNotification(error.response.data.error, 'error', 'TOP_RIGHT', 3000);
            dispatch({
                type: INVITE_STAFF_FAILED
            })
        }
    }
}