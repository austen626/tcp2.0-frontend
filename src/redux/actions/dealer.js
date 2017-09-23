// TCP 2.0
import API from '../../api';
import { addEvent } from '../../firebase/firebase';
import { pushNotification } from 'utils/notification';
import { message as notificationMsg } from 'shared/constant';

export const GET_STAFFS_REQUESTS = "GET_STAFFS_REQUESTS";
export const GET_STAFFS_REQUESTS_SUCCESS = "GET_STAFFS_REQUESTS_SUCCESS";
export const GET_STAFFS_REQUESTS_FAILED = "GET_STAFFS_REQUESTS_FAILED";
export const SET_STAFFS_REQUEST = "SET_STAFFS_REQUEST";
export const ADD_STAFFS_REQUEST = 'ADD_STAFFS_REQUEST';
export const ADD_STAFFS_REQUEST_SUCCESS = "ADD_STAFFS_REQUEST_SUCCESS";
export const ADD_STAFFS_REQUEST_FAILED = "ADD_STAFFS_REQUEST_FAILED";
export const UPDATE_STAFFS_REQUEST= 'UPDATE_STAFFS_REQUEST';
export const UPDATE_STAFFS_REQUEST_SUCCESS = "UPDATE_STAFFS_REQUEST_SUCCESS";
export const UPDATE_STAFFS_REQUEST_FAILED = "UPDATE_STAFFS_REQUEST_FAILED";
export const DELETE_STAFFS_REQUEST= 'DELETE_STAFFS_REQUEST';
export const DELETE_STAFFS_REQUEST_SUCCESS = "DELETE_STAFFS_REQUEST_SUCCESS";
export const DELETE_STAFFS_REQUEST_FAILED = "DELETE_STAFFS_REQUEST_FAILED";


export function getStaffs() {
    return async function(dispatch) {
        dispatch({
            type: GET_STAFFS_REQUESTS
        });
        try {
            const response = await API.get(`/accounts/users`);
            dispatch({
                type: GET_STAFFS_REQUESTS_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: GET_STAFFS_REQUESTS_FAILED
            })
        }
    }
}


export function setStaff(item) {
    return async function(dispatch) {
        dispatch({
            type: SET_STAFFS_REQUEST,
            payload: item
        });
    }
}


export function updateStaff(history, data) {
    return async function(dispatch) {
        dispatch({
            type: UPDATE_STAFFS_REQUEST,
        })
        try {
            await API.post(`/accounts/update-user`, { ...data });
            dispatch({
                type: UPDATE_STAFFS_REQUEST_SUCCESS,
                payload: ''
            })
            addEvent('staff_updated', 'staff-data-updated-success', {'staff_id': data.id});
            pushNotification(notificationMsg.REQUEST_SUCCESS, 'success', 'TOP_RIGHT', 3000);
            history && history.push('/dealer/staff');
        } catch (error) {
            pushNotification(error.response.data.message, 'error', 'TOP_RIGHT', 3000);
            dispatch({
                type: UPDATE_STAFFS_REQUEST_FAILED,
            })
            addEvent('staff_updated', 'staff-data-updated-failed', {'staff_id': data.id});
        }
       
    }
}


export function addStaff(history, data) {
    return async function(dispatch) {
        dispatch({
            type: ADD_STAFFS_REQUEST,
        })
        try {
            await API.post(`/accounts/invite`, { ...data });
            dispatch({
                type: ADD_STAFFS_REQUEST_SUCCESS,
            })
            addEvent('staff_added', 'staff-data-added-success', {'staff_role': data.role, 'staff_email': data.email});
            pushNotification(notificationMsg.REQUEST_SUCCESS, 'success', 'TOP_RIGHT', 3000);
            history && history.push('/dealer/staff');
        } catch (error) {
            pushNotification(error.response.data.message, 'error', 'TOP_RIGHT', 3000);
            dispatch({
                type: ADD_STAFFS_REQUEST_FAILED,
            })
            addEvent('staff_added', 'staff-data-added-failed', {'staff_role': data.role, 'staff_email': data.email});
        }       
    }
}


export function deleteStaff(id) {

    return async function(dispatch) {
        dispatch({
            type: DELETE_STAFFS_REQUEST,
        })
        try {
            await API.put(`/accounts/user-delete/${id}`);
            dispatch({
                type: DELETE_STAFFS_REQUEST_SUCCESS,
                payload: id
            })
            addEvent('staff_updated', 'staff-data-updated-success', {'staff_id': data.id});
            pushNotification(notificationMsg.REQUEST_SUCCESS, 'success', 'TOP_RIGHT', 3000);
        } catch (error) {
            pushNotification(error.response.data.message, 'error', 'TOP_RIGHT', 3000);
            dispatch({
                type: DELETE_STAFFS_REQUEST_FAILED,
            })
            addEvent('staff_updated', 'staff-data-updated-failed', {'staff_id': data.id});
        }       
    }
}