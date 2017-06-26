import API from '../../api';
import { pushNotification } from 'utils/notification';
import { message as notificationMsg } from 'shared/constant';
export const GET_PREAPPROVALS = "GET_PREAPPROVALS";
export const GET_PREAPPROVALS_SUCCESS = "GET_PREAPPROVALS_SUCCESS";
export const GET_PREAPPROVALS_FAILED = "GET_PREAPPROVALS_FAILED";

export const SET_SELECTED_PREAPPROVAL = "SET_SELECTED_PREAPPROVAL";
export const CHANGE_SELECTED_PREAPPROVAL_STATUS = "CHANGE_SELECTED_PREAPPROVAL_STATUS";

export const SET_SELECTED_PENDING_APPLICATION = "SET_SELECTED_PENDING_APPLICATION";
export const CHANGE_SELECTED_PENDING_APPLICATION_STATUS = "CHANGE_SELECTED_PENDING_APPLICATION_STATUS";

export const GET_FUNDING_REQUESTS = "GET_FUNDING_REQUESTS";
export const GET_FUNDING_REQUESTS_SUCCESS = "GET_FUNDING_REQUESTS_SUCCESS";
export const GET_FUNDING_REQUESTS_FAILED = "GET_FUNDING_REQUESTS_FAILED";
export const SET_SELECTED_FUNDING_REQUEST = "SET_SELECTED_FUNDING_REQUEST";
export const CHANGE_SELECTED_FUNDING_REQUEST_REQUEST = "CHANGE_SELECTED_FUNDING_REQUEST_REQUEST";
export const CHANGE_SELECTED_FUNDING_REQUEST_STATUS = "CHANGE_SELECTED_FUNDING_REQUEST_STATUS";
export const CHANGE_SELECTED_FUNDING_REQUEST_FAILED = "CHANGE_SELECTED_FUNDING_REQUEST_FAILED";

export const CHANGE_SELECTED_PREAPPROVAL_REQUEST= 'CHANGE_SELECTED_PREAPPROVAL_REQUEST';
export const CHANGE_SELECTED_PREAPPROVAL_FAILED = 'CHANGE_SELECTED_PREAPPROVAL_FAILED';

export function getPreapprovals() {
    return async function(dispatch) {
        dispatch({
            type: GET_PREAPPROVALS
        });
        try {
            const response = await API.get(`/sales/preapprovals`);
            dispatch({
                type: GET_PREAPPROVALS_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: GET_PREAPPROVALS_FAILED
            })
        }
    }
}

export function setSelectedPreApproval(item) {
    return async function(dispatch) {
        dispatch({
            type: SET_SELECTED_PREAPPROVAL,
            payload: item
        });
    }
}

export function changeSelectedPreApprovalStatus(id, status, message, history, url, approveItem) {
    return async function(dispatch) {
        dispatch({
            type: CHANGE_SELECTED_PREAPPROVAL_REQUEST,
        })
        try {
            await API.put(`/sales/preapproval/${id}`, { status, message, appliance: approveItem.appliance, earliest_delivery_date: approveItem.earliest_delivery_date, product_type: approveItem.product_type });
            dispatch({
                type: CHANGE_SELECTED_PREAPPROVAL_STATUS,
                payload: status
            })
            pushNotification(notificationMsg.DISPOSITION_SUCCESS, 'success', 'TOP_RIGHT', 3000);
            history && url && history.push(url);
        } catch (error) {
            pushNotification('Some Thing Went Wrong', 'error', 'TOP_RIGHT', 3000);
            dispatch({
                type: CHANGE_SELECTED_PREAPPROVAL_FAILED,
            })
        }

    }
}

export function setSelectedPendingApplication(item) {
    return async function(dispatch) {
        dispatch({
            type: SET_SELECTED_PENDING_APPLICATION,
            payload: item
        });
    }
}

export function changeSelectedPendingApplicationStatus(id, status, history, path, rating, msg) {
    return async function(dispatch) {
        dispatch({
            type: CHANGE_SELECTED_PREAPPROVAL_REQUEST,
        })
        try {
            const message = msg || "";
            await API.put(`/sales/appstatuschange`, { id, status, rating, message });
            dispatch({
                type: CHANGE_SELECTED_PREAPPROVAL_STATUS,
                payload: status
            })
            pushNotification(notificationMsg.REQUEST_SUCCESS, 'success', 'TOP_RIGHT', 3000);
            history && history.push(path);
        } catch (error) {
            pushNotification('Some Thing Went Wrong', 'error', 'TOP_RIGHT', 3000);
            dispatch({
                type: CHANGE_SELECTED_PREAPPROVAL_FAILED,
            })
        }
       
    }
}

export function requestFunding(appId, deliveryDate, modalOpen, mountFunction) {
    return async function(dispatch) {
        const response = await API.post(`/sales/fundingrequests`, {
            app_id: appId,
            delivery_date: deliveryDate
        });
        if(response) {
            modalOpen && modalOpen();
            mountFunction && mountFunction()
        }      
        return true;
    }
}

export function requestCancel(appId) {
    return async function(dispatch) {
        await API.put(`/sales/cancelapp`, {
            id: appId
        });
        return true;
    }
}

export function getFundingRequests() {
    return async function(dispatch) {
        dispatch({
            type: GET_FUNDING_REQUESTS
        });
        try {
            const response = await API.get(`/sales/fundingrequests`);
            dispatch({
                type: GET_FUNDING_REQUESTS_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: GET_FUNDING_REQUESTS_FAILED
            })
        }
    }
}

export function setSelectedFundingRequest(item) {
    return async function(dispatch) {
        dispatch({
            type: SET_SELECTED_FUNDING_REQUEST,
            payload: item
        });
    }
}

export function changeSelectedFundingRequestStatus(id, status) {
    return async function(dispatch) {
        dispatch({
            type: CHANGE_SELECTED_FUNDING_REQUEST_REQUEST,
        })
        try {
            await API.put(`/sales/fundingrequest/${id}`, { status });
            dispatch({
                type: CHANGE_SELECTED_FUNDING_REQUEST_STATUS,
                payload: status
            })
        } catch (error) {
            dispatch({
                type: CHANGE_SELECTED_FUNDING_REQUEST_FAILED,
            })
        }
       
    }
}