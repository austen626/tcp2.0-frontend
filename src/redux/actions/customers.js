import API from '../../api';
import { 
    GET_CUSTOMER_HISTORY_REQUEST,
    GET_CUSTOMER_HISTORY_SUCCESS,
    GET_CUSTOMER_HISTORY_FAILED,

    GET_CUSTOMER_PAYMENT_HISTORY_REQUEST,
    GET_CUSTOMER_PAYMENT_HISTORY_SUCCESS,
    GET_CUSTOMER_PAYMENT_HISTORY_FAILED,   

    AGAIN_PREREQUEST_REQUEST,
    AGAIN_PREREQUEST_SUCCESS,
    AGAIN_PREREQUEST_FAILED
} from './actionTypes';
import { pushNotification } from 'utils/notification';
export const SEARCH_CUSTOMERS = "SEARCH_CUSTOMERS";
export const SEARCH_CUSTOMERS_SUCCESS = "SEARCH_CUSTOMERS_SUCCESS";
export const SEARCH_CUSTOMERS_FAILED = "SEARCH_CUSTOMERS_FAILED";

export const GET_PREAPPROVAL_CUSTOMERS = "GET_PREAPPROVAL_CUSTOMERS";
export const GET_PREAPPROVAL_CUSTOMERS_SUCCESS = "GET_PREAPPROVAL_CUSTOMERS_SUCCESS";
export const GET_PREAPPROVAL_CUSTOMERS_FAILED = "GET_PREAPPROVAL_CUSTOMERS_FAILED";

export const GET_CUSTOMER = "GET_CUSTOMER";
export const GET_CUSTOMER_SUCCESS = "GET_CUSTOMER_SUCCESS";
export const GET_CUSTOMER_FAILED = "GET_CUSTOMER_FAILED";

export const GET_PREAPPROVAL_COUNTS_REQUEST = "GET_PREAPPROVAL_COUNTS_REQUEST";
export const GET_PREAPPROVAL_COUNTS_SUCCESS = "GET_PREAPPROVAL_COUNTS_SUCCESS";
export const GET_PREAPPROVAL_COUNTS_FAILED = "GET_PREAPPROVAL_COUNTS_FAILED";


export function searchCustomers(body, type) {
    return async function(dispatch) {
        dispatch({
            type: SEARCH_CUSTOMERS
        });
        try {
            // let url = '/sales/search-customer-local';
            // if(type === "main") {
            //     url = '/sales/search-customer-nortridge';
            // }
            const url = '/sales/search-customer-nortridge';
            const response = await API.post(url, body);
            dispatch({
                type: SEARCH_CUSTOMERS_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: SEARCH_CUSTOMERS_FAILED
            })
        }
    }
}

export function getPreApprovalCustomers() {
    return async function(dispatch) {
        dispatch({
            type: GET_PREAPPROVAL_CUSTOMERS
        });
        try {
            // const response = await API.get('/sales/customers');
            const response = await API.get('/sales/customersnew');
            dispatch({
                type: GET_PREAPPROVAL_CUSTOMERS_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: GET_PREAPPROVAL_CUSTOMERS_FAILED
            })
        }
    }
}

export function getCustomerById(id, type) {
    return async function(dispatch) {
        dispatch({
            type: GET_CUSTOMER
        });
        try {
            const response = await API.get(`/sales/customer/${id}`)
            // if(type === 'appliance') {
            //     response.data.preapproval = [response.data.preapproval[1]]
            // }
            dispatch({
                type: GET_CUSTOMER_SUCCESS,
                payload: response.data
            }); 
        } catch (error) {
            dispatch({
                type: GET_CUSTOMER_FAILED
            })
        }
    }
}

export function sendPreapproval(id) {
    return async function(dispatch) {
        try {
            await API.post(`/sales/preapprovals`, {
                customer_id: id
            });
            return true;
        } catch (error) {
            return false;
        }
    }
}

export function getPreapprovalCount() {
    return async function(dispatch) {
        dispatch({
            type: GET_PREAPPROVAL_COUNTS_REQUEST
        });
        try {
            const response = await API.get(`/sales/counts-preapproval`)
            const count = response.data.counts.preapproval;
            dispatch({
                type: GET_PREAPPROVAL_COUNTS_SUCCESS,
                payload: count
            }); 
        } catch (error) {
            dispatch({
                type: GET_PREAPPROVAL_COUNTS_FAILED
            })
        }
    }
}


export function getCustomerHistory(action) {
    return async function(dispatch) {
       const { id } = action;
        dispatch({
            type: GET_CUSTOMER_HISTORY_REQUEST,
            data: []
        });
        try {
            const response = await API.get(`/sales/nortridge-loandetail/${id}`)
            if(response) {
                dispatch({
                    type: GET_CUSTOMER_HISTORY_SUCCESS,
                    data: response.data
                });
            }
        } catch(error) {
            pushNotification(error.response, 'error', 'TOP_RIGHT', 3000);            
            dispatch({
                type: GET_CUSTOMER_HISTORY_FAILED
            });
        }
       
    }
}

export function getCustomerPaymentHistory(action) {
    return async function(dispatch) {
       const { id } = action;
        dispatch({
            type: GET_CUSTOMER_PAYMENT_HISTORY_REQUEST,
            data: []
        });
        try {
            const response = await API.get(`/sales/nortridge-loanpayment/${id}`)
            if(response) {
                dispatch({
                    type: GET_CUSTOMER_PAYMENT_HISTORY_SUCCESS,
                    data: response.data
                });
            }
        } catch(error) {
            pushNotification(error.response, 'error', 'TOP_RIGHT', 3000);            
            dispatch({
                type: GET_CUSTOMER_PAYMENT_HISTORY_FAILED
            });
        }
       
    }
}

export function reRequestPreApproval(id, modalShow) {
    return async function(dispatch) {
         dispatch({
             type: AGAIN_PREREQUEST_REQUEST,
             data: []
         });
         try {
            const response = await API.put(`/sales/preapprovalrequest/`+id)
            if(response) {
                 dispatch({
                     type: AGAIN_PREREQUEST_SUCCESS,
                     data: response.data
                 });
                 modalShow && modalShow();
            }
         } catch(error) {
             pushNotification(error.response, 'error', 'TOP_RIGHT', 3000);            
             dispatch({
                 type: AGAIN_PREREQUEST_FAILED
             });
         }
        
     }
}