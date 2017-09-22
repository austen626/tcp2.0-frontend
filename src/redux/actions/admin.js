import API from '../../api';
import { addEvent } from '../../firebase/firebase';
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






// TCP 2.0

export const GET_DEALERS_REQUESTS = "GET_DEALERS_REQUESTS";
export const GET_DEALERS_REQUESTS_SUCCESS = "GET_DEALERS_REQUESTS_SUCCESS";
export const GET_DEALERS_REQUESTS_FAILED = "GET_DEALERS_REQUESTS_FAILED";
export const SET_DEALER_REQUEST = "SET_DEALER_REQUEST";
export const ADD_DEALER_REQUEST = 'ADD_DEALER_REQUEST';
export const ADD_DEALER_REQUEST_SUCCESS = "ADD_DEALER_REQUEST_SUCCESS";
export const ADD_DEALER_REQUEST_FAILED = "ADD_DEALER_REQUEST_FAILED";
export const UPDATE_DEALER_REQUEST= 'UPDATE_DEALER_REQUEST';
export const UPDATE_DEALER_REQUEST_SUCCESS = "UPDATE_DEALER_REQUEST_SUCCESS";
export const UPDATE_DEALER_REQUEST_FAILED = "UPDATE_DEALER_REQUEST_FAILED";
export const DELETE_DEALER_REQUEST= 'DELETE_DEALER_REQUEST';
export const DELETE_DEALER_REQUEST_SUCCESS = "DELETE_DEALER_REQUEST_SUCCESS";
export const DELETE_DEALER_REQUEST_FAILED = "DELETE_DEALER_REQUEST_FAILED";








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






























// TCP 2.0


export function getDealers() {
    return async function(dispatch) {
        dispatch({
            type: GET_DEALERS_REQUESTS
        });
        try {
            const response = await API.get(`/accounts/list-dealer`);
            dispatch({
                type: GET_DEALERS_REQUESTS_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: GET_DEALERS_REQUESTS_FAILED
            })
        }
    }
}


export function setDealer(item) {
    return async function(dispatch) {
        dispatch({
            type: SET_DEALER_REQUEST,
            payload: item
        });
    }
}


export function updateDealer(history, data) {
    return async function(dispatch) {
        dispatch({
            type: UPDATE_DEALER_REQUEST,
        })
        try {
            await API.post(`/accounts/update-dealer`, { ...data });
            dispatch({
                type: UPDATE_DEALER_REQUEST_SUCCESS,
                payload: ''
            })
            addEvent('dealer_updated', 'Dealer data updated', {'dealer_id': data.id});
            pushNotification(notificationMsg.REQUEST_SUCCESS, 'success', 'TOP_RIGHT', 3000);
            history && history.push('/admin/dealers');
        } catch (error) {
            pushNotification(error.response.data.message, 'error', 'TOP_RIGHT', 3000);
            dispatch({
                type: UPDATE_DEALER_REQUEST_FAILED,
            })
        }
       
    }
}


export function addDealer(history, data) {
    return async function(dispatch) {
        dispatch({
            type: ADD_DEALER_REQUEST,
        })
        try {
            await API.post(`/accounts/add-dealer`, { ...data });
            dispatch({
                type: ADD_DEALER_REQUEST_SUCCESS,
            })
            addEvent('dealer_added', 'Dealer data added', {'dealer_id': data.id});
            pushNotification(notificationMsg.REQUEST_SUCCESS, 'success', 'TOP_RIGHT', 3000);
            history && history.push('/admin/dealers');
        } catch (error) {
            pushNotification(error.response.data.message, 'error', 'TOP_RIGHT', 3000);
            dispatch({
                type: ADD_DEALER_REQUEST_FAILED,
            })
        }       
    }
}


export function deleteDealer(id) {
    return async function(dispatch) {
        dispatch({
            type: DELETE_DEALER_REQUEST,
        })
        try {
            await API.put(`/accounts/user-delete/${id}`);
            dispatch({
                type: DELETE_DEALER_REQUEST_SUCCESS,
                payload: id
            })
            addEvent('dealer_deleted', 'Dealer data deleted', {'dealer_id': id});
            pushNotification(notificationMsg.REQUEST_SUCCESS, 'success', 'TOP_RIGHT', 3000);
        } catch (error) {
            pushNotification(error.response.data.message, 'error', 'TOP_RIGHT', 3000);
            dispatch({
                type: DELETE_DEALER_REQUEST_FAILED,
            })
        }       
    }
}