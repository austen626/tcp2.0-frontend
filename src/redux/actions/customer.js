import API from '../../api';
import { pushNotification } from 'utils/notification';
import { message } from 'shared/constant';
import {
    SET_REORDER_CUSTOMER,
    SET_REORDER_CUSTOMER_SUCCESS,
    SET_REORDER_CUSTOMER_FAILED,

    SET_CUSTOMER_FORM,
    SET_CUSTOMER_FORM_SUCCESS,
    SET_CUSTOMER_FORM_FAILED,
} from './actionTypes';
export const CLEAR_CUSTOMER = "CLEAR_CUSTOMER";
export const CHANGE_CONTACT = "CHANGE_CUSTOMER";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const CHANGE_PRODUCT = "CHANGE_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const ADD_EXITING_PRODUCT = "ADD_EXITING_PRODUCT";

export const EMAIL_VALIDATE_REQUEST = "EMAIL_VALIDATE_REQUEST";
export const EMAIL_VALIDATE_SUCCESS = "EMAIL_VALIDATE_SUCCESS";
export const EMAIL_VALIDATE_FAILED = "EMAIL_VALIDATE_FAILED";

export const SET_RESENT_SUCCESS = 'SET_RESENT_SUCCESS'


export function clearCustomer() {
    return async function(dispatch) {
        dispatch({
            type: CLEAR_CUSTOMER
        });
    }
}

export function changeCustomer(data) {
    return async function(dispatch) {
        dispatch({
            type: CHANGE_CONTACT,
            payload: data
        });
    }
}

export function changeCustomerContact(key, value, role) {
    return async function (dispatch) {
        dispatch({
            type: CHANGE_CONTACT,
            payload: {
                key,
                value,
                role
            }
        });
    }
}

export function addProduct() {
    return async function(dispatch) {
        dispatch({
            type: ADD_PRODUCT
        });
    }
}

export function changeProduct(id, data) {
    return async function(dispatch) {
        dispatch({
            type: CHANGE_PRODUCT,
            payload: {
                id,
                data
            }
        })
    }
}

export function addExistingProduct(data) {
    return async function(dispatch) {
        dispatch({
            type: ADD_EXITING_PRODUCT,
            payload: data
        })
    }
}

export function removeProduct(id=-1) {
    return async function(dispatch) {
        dispatch({
            type: REMOVE_PRODUCT,
            payload: {
                id
            }
        });
    }
}

export function sendAll(body, handleModalClose, type, history, action) {
    return async function(dispatch) {
        // const response = await API.post('/exp/customer', body);
        dispatch({
            type: SET_CUSTOMER_FORM
        });
        try {
            let url = '/sales/send-signature';
            if(type && type === "pre-order") {
                url = '/sales/sendpreapproval'
            }

            body.contact["name"] =   body.contact.main_app.name || "";
            body.contact["street"] =   body.contact.main_app.street || "";
            body.contact["city"] =   body.contact.main_app.city || "";
            body.contact["state"] =   body.contact.main_app.state || "";
            body.contact["zip"] =   body.contact.main_app.zip || "";
            body.contact["phone"] =   body.contact.main_app.cell_phone || "";
            body.contact["email"] =   body.contact.main_app.email || "";

            body.contact["co_name"] =   body.contact.co_app.name || "";
            body.contact["co_street"] =   body.contact.co_app.street || "";
            body.contact["co_city"] =   body.contact.co_app.city || "";
            body.contact["co_state"] =   body.contact.co_app.state || "";
            body.contact["co_zip"] =   body.contact.co_app.zip || "";
            body.contact["co_phone"] =   body.contact.co_app.cell_phone || "";
            body.contact["co_email"] =   body.contact.co_app.email || "";
            const response = await API.post(url, body);
            if(response) {
                dispatch({
                    type: SET_CUSTOMER_FORM_SUCCESS
                });
                handleModalClose && handleModalClose()
                switch(type) {
                    case "pre-order":
                        history.push('/');
                        pushNotification(message.REQUEST_SUBMISSION_SUCCESS, 'success', 'TOP_RIGHT', 3000);
                        break;
                    case "reorder":
                        history.push(`/customer/${body.contact.existing_customer_id}`);
                        break;
                    case "new-customer":
                        // history.push('/');
                        // pushNotification(message.FORM_SUBMISSION_SUCCESS, 'success', 'TOP_RIGHT', 3000);
                        action && action.sentFirstTimeTrue && action.sentFirstTimeTrue();
                        // action && action.changeCustomer && dispatch(action.changeCustomer({ sent: true }));                      
                        break;
                    default:
                        pushNotification(message.FORM_SUBMISSION_SUCCESS, 'success', 'TOP_RIGHT', 3000);
                        break;
                }
            }
        } catch(error) {
            pushNotification(error.response, 'error', 'TOP_RIGHT', 3000);            
            dispatch({
                type: SET_CUSTOMER_FORM_FAILED
            });
        }
       
    }
}

export function sendPrequalify(body) {
    return async function(dispatch) {
        const response = await API.post('/sales/sendprequalify', body);
    }
}


export function setReorderCustomerById(id, hideSearchBox, hideFormFields, reorder, history) {
    return async function(dispatch) {
        dispatch({
            type: SET_REORDER_CUSTOMER
        });
        try {
            const body = {
                cif_no: id
            }
            const apiUrl = '/sales/customer-cif';
            // let response;
            // if(reorder === "reorder") {
            //     apiUrl = '/sales/customer/'+id;
            //     response = await API.get(apiUrl);     
            // } else {
            //     response = await API.post(apiUrl, body);
            // }
            const response = await API.post(apiUrl, body);
            if(response) {
                const responseData = response.data;
                const co_enabled = responseData?.co_customer?.id ? true : false;
                    dispatch(changeCustomer({
                    order_type: 2, 
                    co_enabled: co_enabled,
                    reorder: reorder === "reorder" ? true: false,
                    co_complete: reorder === "reorder" ? true: false,
                    existing_customer_id: responseData.cifno,
                    main_app: {
                        cif_number: responseData.cifno,
                        nortridge_cif_number: responseData.nortridge_cif_number,
                        name: responseData.name +" "+ responseData.lastname,
                        email: responseData.email,
                        cell_phone: responseData.cell_phone,
                        street: responseData.street,
                        city: responseData.city,
                        state: responseData.state,
                        zip: responseData.zip,
                        employer_phone: responseData.employer_phone || '',
                        monthly_income: responseData.monthly_income || '',
                        additional_income: responseData.additional_income || '',
                        dobY: '',
                        dobM: '',
                        dobD: '',
                        ssn: '',
                        dl: '',
                        nod: '',
                        home_phone: '',
                        yt1: '',
                        own_or_rent: '',
                        present_employer: '',
                        yt2: '',
                        job_title: '',
                        source: '',
                        landlord_holder: '',
                        monthly_rent_payment: ''
                    },
                }));
                // if(reorder === "reorder") {
                //     const co_enabled = responseData.co_customer.id ? true : false;
                //     dispatch(changeCustomer({
                //         order_type: 2,
                //         co_enabled: co_enabled,
                //         existing_customer_id: responseData.id,
                //         reorder: true,
                //         co_complete: true,
                //         main_app: {
                //             name: responseData.name,
                //             email: responseData.email,
                //             dobY: responseData.dobY,
                //             dobM: responseData.dobM,
                //             dobD: responseData.dobD,
                //             ssn: responseData.ssn,
                //             dl: responseData.dl,
                //             nod: responseData.nod,
                //             cell_phone: responseData.cell_phone,
                //             home_phone: responseData.home_phone,
                //             street: responseData.street,
                //             city: responseData.city,
                //             state: responseData.state,
                //             zip: responseData.zip,
                //             yt1: responseData.yt1,
                //             own_or_rent: responseData.own_or_rent,
                //             present_employer: responseData.present_employer,
                //             yt2: responseData.yt2,
                //             job_title: responseData.job_title,
                //             employer_phone: responseData.employer_phone,
                //             monthly_income: responseData.monthly_income,
                //             additional_income: responseData.additional_income,
                //             source: responseData.source,
                //             landlord_holder: responseData.landlord_holder,
                //             monthly_rent_payment: responseData.monthly_rent_payment
                //         },
                //         co_app: {
                //             name: co_enabled ? responseData.co_customer.name : "",
                //             email: co_enabled ? responseData.co_customer.email : "",
                //             dobY: co_enabled ? responseData.co_customer.dobY : "",
                //             dobM: co_enabled ? responseData.co_customer.dobM : "",
                //             dobD: co_enabled ? responseData.co_customer.dobD : "",
                //             ssn: co_enabled ? responseData.co_customer.ssn : "",
                //             dl: co_enabled ? responseData.co_customer.dl : "",
                //             nod: co_enabled ? responseData.co_customer.nod : "",
                //             cell_phone: co_enabled ? responseData.co_customer.cell_phone : "",
                //             home_phone: co_enabled ? responseData.co_customer.home_phone : "",
                //             street: co_enabled ? responseData.co_customer.street : "",
                //             city: co_enabled ? responseData.co_customer.city : "",
                //             state: co_enabled ? responseData.co_customer.state : "",
                //             zip: co_enabled ? responseData.co_customer.zip : "",
                //             yt1: co_enabled ? responseData.co_customer.yt1 : "",
                //             own_or_rent: co_enabled ? responseData.co_customer.own_or_rent : "",
                //             present_employer: co_enabled ? responseData.co_customer.present_employer : "",
                //             yt2: co_enabled ? responseData.co_customer.yt2 : "",
                //             job_title: co_enabled ? responseData.co_customer.job_title : "",
                //             employer_phone: co_enabled ? responseData.co_customer.employer_phone : "",
                //             monthly_income: co_enabled ? responseData.co_customer.monthly_income : "",
                //             additional_income: co_enabled ? responseData.co_customer.additional_income : "",
                //             source: co_enabled ? responseData.co_customer.source : "",
                //             landlord_holder: co_enabled ? responseData.co_customer.landlord_holder : "",
                //             monthly_rent_payment: co_enabled ? responseData.co_customer.monthly_rent_payment : ""
                //         },
                //     }));

                // } else {
                //     dispatch(changeCustomer({
                //         order_type: 2,                        
                //         reorder: false,
                //         main_app: {
                //             cif_number: responseData.cifno,
                //             name: responseData.name +" "+ responseData.lastname,
                //             email: responseData.email,
                //             cell_phone: responseData.cell_phone,
                //             street: responseData.street,
                //             city: responseData.city,
                //             state: responseData.state,
                //             zip: responseData.zip,
                //             employer_phone: responseData.employer_phone,
                //             monthly_income: responseData.monthly_income,
                //             additional_income: responseData.additional_income,
                //         },
                //     }));
                // }
                
                hideSearchBox && hideSearchBox();
                dispatch({
                    type: SET_REORDER_CUSTOMER_SUCCESS,
                    payload: response.data
                }); 
                if(reorder === "reorder") {
                    history && history.replace('customer')
                }
            }
            
        } catch (error) {
            if(error.response) {
                hideSearchBox && hideFormFields()
                pushNotification('Some thing went wrong', 'error', 'TOP_RIGHT', 3000);
                dispatch({
                    type: SET_REORDER_CUSTOMER_FAILED
                })
            }
           
        }
    }
}

export function emailValidateRequest(data) {
    return async function(dispatch) {
        dispatch({
            type: EMAIL_VALIDATE_REQUEST
        });
        try {
            const url = '/accounts/validate-email';
            const body = {
                email: data.email
            }
            const response = await API.post(url, body);
            if(response) {
                dispatch({
                    type: EMAIL_VALIDATE_SUCCESS,
                    data: !response.data.status
                });
            }
        } catch(error) {
            pushNotification(error.response, 'error', 'TOP_RIGHT', 3000);            
            dispatch({
                type: EMAIL_VALIDATE_FAILED,
                data: true
            });
        }
       
    }
}

export function emailCommonValidation(email) {
    const url = '/accounts/validate-email';
    const body = {
        email: email
    }
    return async function(dispatch) {
        const response = await API.post(url, body);
    }
}

export function resentSuccessRequest(data) {
    return async function(dispatch) {
        dispatch({
            type: SET_RESENT_SUCCESS,
        })
    }
}