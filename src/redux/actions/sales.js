import API from '../../api';
import { addEvent } from '../../firebase/firebase';
import { pushNotification } from 'utils/notification';
import { message } from 'shared/constant'
export const SALES_LIST = "SALES_LIST";
export const SALES_LIST_SUCCESS = "SALES_LIST_SUCCESS";
export const SALES_LIST_ERROR = "SALES_LIST_ERROR";
export const GET_APP_DETAIL = "GET_APP_DETAIL";
export const GET_APP_DETAIL_SUCCESS = "GET_APP_DETAIL_SUCCESS";
export const GET_APP_DETAIL_ERROR = "GET_APP_DETAIL_ERROR";
export const RESEND_APPLICATIONMAIL = "RESEND_APPLICATIONMAIL";


export const CANCEL_TYPE_COUNT_REQUEST = "CANCEL_TYPE_COUNT_REQUEST";
export const CANCEL_TYPE_COUNT_SUCCESS = "CANCEL_TYPE_COUNT_SUCCESS";
export const CANCEL_TYPE_COUNT_ERROR = "CANCEL_TYPE_COUNT_ERROR";

export const PENDING_TYPE_COUNT_REQUEST = "PENDING_TYPE_COUNT_REQUEST";
export const PENDING_TYPE_COUNT_SUCCESS = "PENDING_TYPE_COUNT_SUCCESS";
export const PENDING_TYPE_COUNT_ERROR = "PENDING_TYPE_COUNT_ERROR";

export const GET_SALES_BY_STATUS_REQUEST = "GET_SALES_BY_STATUS_REQUEST";
export const GET_SALES_BY_STATUS_SUCCESS = "GET_SALES_BY_STATUS_SUCCESS";
export const GET_SALES_BY_STATUS_ERROR = "GET_SALES_BY_STATUS_ERROR";

export const DELETE_SPECIFIC_REQUEST = "DELETE_SPECIFIC_REQUEST";
export const DELETE_SPECIFIC_SUCCESS = "DELETE_SPECIFIC_SUCCESS";
export const DELETE_SPECIFIC_ERROR = "DELETE_SPECIFIC_ERROR";


export const SET_INCOMPLETE_REMINDER_REQUEST = "SET_INCOMPLETE_REMINDER_REQUEST";
export const SET_INCOMPLETE_REMINDER_SUCCESS = "SET_INCOMPLETE_REMINDER_SUCCESS";
export const SET_INCOMPLETE_REMINDER_ERROR = "SET_INCOMPLETE_REMINDER_ERROR";















export const SET_SEARCH_CUSTOMER_SEARCH_REQUEST = "SET_SEARCH_CUSTOMER_SEARCH_REQUEST";
export const RESET_SEARCH_CUSTOMER_FORM_REQUEST = "RESET_SEARCH_CUSTOMER_FORM_REQUEST";
export const REFRESH_CHECK_PAGE_LOAD = "REFRESH_CHECK_PAGE_LOAD";

export const SET_CUSTOMER_SEARCH_REQUEST = "SET_CUSTOMER_SEARCH_REQUEST";

export const GET_CUSTOMER_REQUEST = "GET_CUSTOMER_REQUEST";
export const GET_CUSTOMER_SUCCESS = "GET_CUSTOMER_SUCCESS";
export const GET_CUSTOMER_FAILED = "GET_CUSTOMER_FAILED";

export const GET_SEARCH_CUSTOMER_REQUEST = "GET_SEARCH_CUSTOMER_REQUEST";
export const GET_SEARCH_CUSTOMER_SUCCESS = "GET_SEARCH_CUSTOMER_SUCCESS";
export const GET_SEARCH_CUSTOMER_FAILED = "GET_SEARCH_CUSTOMER_FAILED";

export const UPDATE_CUSTOMER_SEARCH_REQUEST = "UPDATE_CUSTOMER_SEARCH_REQUEST";

export const SUBMIT_CREDIT_APP_REQUEST = "SUBMIT_CREDIT_APP_REQUEST";
export const SUBMIT_CREDIT_APP_SUCCESS = "SUBMIT_CREDIT_APP_SUCCESS";
export const SUBMIT_CREDIT_APP_FAILED = "SUBMIT_CREDIT_APP_FAILED";

export const SET_APP_FILLED_STATUS = "SET_APP_FILLED_STATUS";

export const SUBMIT_CUSTOMER_REPONSE_REQUEST = "SUBMIT_CUSTOMER_REPONSE_REQUEST";
export const SUBMIT_CUSTOMER_REPONSE_SUCCESS = "SUBMIT_CUSTOMER_REPONSE_SUCCESS";
export const SUBMIT_CUSTOMER_REPONSE_FAILED = "SUBMIT_CUSTOMER_REPONSE_FAILED";

export const SEND_APP_LINK_REQUEST = "SEND_APP_LINK_REQUEST";
export const SEND_APP_LINK_SUCCESS = "SEND_APP_LINK_SUCCESS";
export const SEND_APP_LINK_FAILED = "SEND_APP_LINK_FAILED";

export const VALIDATE_EMAIL_REQUEST = "VALIDATE_EMAIL_REQUEST";
export const VALIDATE_EMAIL_SUCCESS = "VALIDATE_EMAIL_SUCCESS";
export const VALIDATE_EMAIL_FAILED = "VALIDATE_EMAIL_FAILED";

export const SUBMIT_CUSTOMER_REPONSE_TO_THANKYOU = "SUBMIT_CUSTOMER_REPONSE_TO_THANKYOU";









export function getSalesList(type, email) {
    return async function(dispatch) {
        try {
            dispatch({
                type: SALES_LIST
            });
            let response;
            if(type) {
                const body = {
                    status: type
                }
                if(type === 'all') {
                    const data = {
                        email: email
                    };
                    response = await API.post('/sales/apps-nohello', data);
                } else {
                    response = await API.post('/sales/apps-list', body);
                }
               
                
            } else {
                response = await API.get('/sales/apps');
            }
            dispatch({
                type: SALES_LIST_SUCCESS,
                payload: response.data
            });
        } catch(error) {
            dispatch({
                type: SALES_LIST_ERROR
            });
        }
    }
}

export function getAppDetailById(appId, setDate, setEmailId) {
    return async function(dispatch) {
        dispatch({
            type: GET_APP_DETAIL
        });
        try {
            const response = await API.get(`/sales/app/${appId}`)
            dispatch({
                type: GET_APP_DETAIL_SUCCESS,
                payload: response.data
            });
            setDate && response.data.funding && 
            response.data.funding[0] &&
            response.data.funding[0].delivery_date && setDate(response.data.funding[0].delivery_date);
            if(setEmailId) {
                const dataSet = response.data;
                setEmailId && setEmailId(dataSet)               
            }
        } catch (error) {
            dispatch({
                type: GET_APP_DETAIL_ERROR
            });
        }
    }
}

export function resendApplicationMail(app_id, applicant_email, co_applicant_email, order_type, products, cif_number ) {
    return async function(dispatch) {
        await API.put(`/sales/resendemail`, { app_id, applicant_email, co_applicant_email, order_type, products, cif_number });
    }
}

export function getCancelTypeCount() {
    return async function(dispatch) {
        try {
            dispatch({
                type: CANCEL_TYPE_COUNT_REQUEST
            });
            const response = await API.get('/sales/counts-app');
            const responseData = response.data.counts;
            dispatch({
                type: CANCEL_TYPE_COUNT_SUCCESS,
                payload: {
                    declineCount: responseData.declined,
                    approvedCount: responseData.approved,
                    fundedCount: responseData.funded,
                    cancelCount: responseData.cancelled,
                }
            });
        } catch(error) {
            dispatch({
                type: CANCEL_TYPE_COUNT_ERROR
            });
        }
    }
}

export function getPendingTypeCount() {
    return async function(dispatch) {
        try {
            dispatch({
                type: PENDING_TYPE_COUNT_REQUEST
            });
            const response = await API.get('/sales/counts-incomplete');
            const responseData = response.data.counts;
            dispatch({
                type: PENDING_TYPE_COUNT_SUCCESS,
                payload: {
                    pendingCount: responseData.pending,
                    incompleteCount: responseData.incomplete,
                }
            });
        } catch(error) {
            dispatch({
                type: PENDING_TYPE_COUNT_ERROR
            });
        }
    }
}

export function changeApplicationStatus(action) {
    return async function(dispatch) {
        dispatch({
            type: DELETE_SPECIFIC_REQUEST,
        })
        try {
            let data = {
                id: action.id,
            }
            let apiResponse = ''
            if(action.type && action.type === 'pre-approval') {
                apiResponse = await API.put(`/sales/preapproval-delete`, data);
            } else {
                data["status"] = action.status;
                if(action.page) {
                    data['page'] = action.page;
                }
                apiResponse = await API.put(`/sales/appstatuschange`, data);
            }
            
            if(apiResponse) {
                dispatch({
                    type: DELETE_SPECIFIC_SUCCESS,
                })
            }
            action.getSalesList && action.getSalesList(action.pageStatus, action.email);
            action.getPreApprovalCustomers && action.getPreApprovalCustomers()
            pushNotification(message.DELETE_SUCCESSFULLY, 'success', 'TOP_RIGHT', 3000);
        } catch (error) {
            error.response && pushNotification(error.response.data, 'error', 'TOP_RIGHT', 3000);
            dispatch({
                type: DELETE_SPECIFIC_ERROR,
            })
        }
       
    }
}

export function reminderIncompleteRequest(action) {
    return async function(dispatch) {
        dispatch({
            type: SET_INCOMPLETE_REMINDER_REQUEST,
        })
        try {
            const data = {
                email: action.email,
            }
            await API.post(`/sales/hellosign-reminder/${action.id}`, data);
            dispatch({
                type: SET_INCOMPLETE_REMINDER_SUCCESS,
            })
            pushNotification(`Reminder has been sent to ${action.email}.`, 'success', 'TOP_RIGHT', 3000);
        } catch (error) {
            error.response && pushNotification(error.response.data.detail, 'error', 'TOP_RIGHT', 3000);
            dispatch({
                type: SET_INCOMPLETE_REMINDER_ERROR,
            })
        }
       
    }
}




























export function searchCustomer(data) {

    return async function(dispatch) {
        dispatch({
            type: GET_SEARCH_CUSTOMER_REQUEST,
        })
        try {
            const response = await API.post(`/sales/search-customer`, { ...data });
            dispatch({
                type: GET_SEARCH_CUSTOMER_SUCCESS,
                payload: response.data 
            })
            if(response.data.data.length == 0) {
                return false 
            } else {
                return true
            }
        } catch (error) {
            dispatch({
                type: GET_SEARCH_CUSTOMER_FAILED,
            })
            return false
        }    
    }
}


export function resetSearchCustomerSearchApiInitiate() {
    return async function(dispatch) {
        dispatch({
            type: SET_SEARCH_CUSTOMER_SEARCH_REQUEST,
        })       
    }
}


export function resetSearchCustomerForm() {
    return async function(dispatch) {
        dispatch({
            type: RESET_SEARCH_CUSTOMER_FORM_REQUEST,
        })       
    }
}


export function refreshSearchCustomerForm() {
    return async function(dispatch) {
        dispatch({
            type: REFRESH_CHECK_PAGE_LOAD,
        })       
    }
}


export function selectCustomer(data) {
    return async function(dispatch) {
        dispatch({
            type: GET_CUSTOMER_REQUEST,
        })
        try {
            dispatch({
                type: GET_CUSTOMER_SUCCESS,
                payload: data 
            })
            return true
        } catch (error) {
            dispatch({
                type: GET_CUSTOMER_FAILED,
            })
            return false
        }    
    }
}


export function validateEmailAddress(email) {

    let temp_data = {"email":email}

    return async function(dispatch) {
        dispatch({
            type: VALIDATE_EMAIL_REQUEST,
        })
        try {
            await API.post(`/accounts/validate-email`, temp_data);
            dispatch({
                type: VALIDATE_EMAIL_SUCCESS,
            })
        } catch (error) {
            dispatch({
                type: VALIDATE_EMAIL_FAILED,
            })
            pushNotification("Invalid email address", 'error', 'TOP_RIGHT', 3000);   
        }    
    }
}


export function resetCustomerSearchApiInitiate() {
    return async function(dispatch) {
        dispatch({
            type: SET_CUSTOMER_SEARCH_REQUEST,
        })       
    }
}


export function updateApplicationFilledStatus(data, history, path) {
    return async function(dispatch) {
        dispatch({
            type: SET_APP_FILLED_STATUS,
            payload: data
        })       
        history && path && history.push(path);   
    }
}


export function updateCustomer(history, path, data) {
    return async function(dispatch) {
        dispatch({
            type: UPDATE_CUSTOMER_SEARCH_REQUEST,
            payload: data
        })    
        history && path && history.push(path);   
    }
}


export function submiCreditApplication(history, path, data) {

    let temp_data = {
        contact : {
            reorder: false,
            co_complete: false,
            co_separate: false,
            ...data,
            main_app: {
                ...data.main_app,
                landlord_mortgage_holder: null,
                home_phone: null
            },
            co_app: {
                ...data.co_app,
                landlord_mortgage_holder: null,
                home_phone: null
            }
        }
    }

    return async function(dispatch) {
        dispatch({
            type: SUBMIT_CREDIT_APP_REQUEST,
        })
        try {
            const response = await API.post(`/sales/creditapp-details`, { ...temp_data });
            dispatch({
                type: SUBMIT_CREDIT_APP_SUCCESS,
                payload: ''
            })
            addEvent('credit_application_completed', 'credit-application-completed-success', {'credit_app_id': temp_data.id});
            pushNotification("Application Updated Successfully", 'success', 'TOP_RIGHT', 3000);
            history && history.push(path);
        } catch (error) {
            pushNotification(error.response.data.message, 'error', 'TOP_RIGHT', 3000);
            dispatch({
                type: SUBMIT_CREDIT_APP_FAILED
            })
            addEvent('credit_application_completed', 'credit-application-completed-failed', {'credit_app_id': temp_data.id});
        }       
    }
}


export function submiCreditApplicationByMail(history, data) { 

    let temp_data = {
        nortridge_cif_number: data.main_app.nortridge_cif_number ? data.main_app.nortridge_cif_number : null,
        customer_id: data.main_app.id ? data.main_app.id : 0,
        customer_email: data.main_app.email,
        customer_phone: data.main_app.cell_phone,
        first_name: data.main_app.first_name,
        last_name: data.main_app.last_name,
        name: data.main_app.first_name+' '+data.main_app.last_name,
        action: "onlink"
    }   

    return async function(dispatch) {
        dispatch({
            type: SEND_APP_LINK_REQUEST,
        })           

        try {
            await API.post(`/sales/creditapp`, { ...temp_data });
            dispatch({
                type: SEND_APP_LINK_SUCCESS,
            })
            addEvent('credit_application_mail_sent', 'credit-application-mail-sent-success', {'customer_id': temp_data.id});
            pushNotification("Application Send Successfully", 'success', 'TOP_RIGHT', 3000);
            history && history.push('/applyApplicationSummary');
        } catch (error) {
            dispatch({
                type: SEND_APP_LINK_FAILED,
            })
            pushNotification("Error while sending mail", 'error', 'TOP_RIGHT', 3000);   
            addEvent('credit_application_mail_sent', 'credit-application-mail-sent-failed', {'customer_id': temp_data.id});
        } 
    }
}

export function getCustomerApiInitiate(data) {
    return async function(dispatch) {
        dispatch({
            type: GET_CUSTOMER_REQUEST,
        })
        try {
            const response = await API.post(`/sales/search-customer-id`, { id: data, token: localStorage.getItem('customerToken') });
            dispatch({
                type: GET_CUSTOMER_SUCCESS,
                payload: response.data && response.data.data && response.data.data.main_app && response.data.data.main_app.id !== '' ? response.data.data : null 
            })
            addEvent('credit_application_mail_open', 'credit-application-mail-open-success', {'customer_id': data.id});
        } catch (error) {
            dispatch({
                type: GET_CUSTOMER_FAILED,
            }) 
            addEvent('credit_application_mail_open', 'credit-application-mail-open-failed', {'customer_id': data.id});
        }    
    }
}

export function customerResponseSubmit(history, data) {
    
    let temp_data = {
        contact : {
            token: localStorage.getItem('customerToken'),
            id: localStorage.getItem('customerId'),
            salesperson_email: localStorage.getItem('salesperson_email'),
            reorder: false,
            co_complete: false,
            co_separate: false,
            ...data,
            main_app: {
                ...data.main_app,
                landlord_mortgage_holder: null,
                home_phone: null
            },
            co_app: {
                ...data.co_app,
                landlord_mortgage_holder: null,
                home_phone: null
            }
        }
    }

    return async function(dispatch) {
        dispatch({
            type: SUBMIT_CUSTOMER_REPONSE_REQUEST,
        })
        try {
            const response = await API.post(`/sales/creditapp-details-onlink`, { ...temp_data });
            dispatch({
                type: SUBMIT_CUSTOMER_REPONSE_SUCCESS,
                payload: ''
            })
            addEvent('credit_application_completed_by_customer', 'credit-application-completed-by-customer-success', {'credit_app_id': temp_data.id});
            pushNotification("Application Updated Successfully", 'success', 'TOP_RIGHT', 3000);
            history && history.push('/thankyou')
        } catch (error) {
            pushNotification(error.response.data.message, 'error', 'TOP_RIGHT', 3000);
            dispatch({
                type: SUBMIT_CUSTOMER_REPONSE_FAILED
            })
            addEvent('credit_application_completed_by_customer', 'credit-application-completed-by-customer-failed', {'credit_app_id': temp_data.id});
            history && history.push('/basic')
        }       
    }
}

export function getCustomerToThankYouPage() {
    return async function(dispatch) {
        dispatch({
            type: SUBMIT_CUSTOMER_REPONSE_TO_THANKYOU,
        })    
    }
}