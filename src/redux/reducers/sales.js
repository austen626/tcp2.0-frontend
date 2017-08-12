import actions from 'redux-form/lib/actions';
import {
    SALES_LIST,
    GET_APP_DETAIL,
    GET_APP_DETAIL_SUCCESS,
    GET_APP_DETAIL_ERROR,
    SALES_LIST_SUCCESS,
    SALES_LIST_ERROR,
    CANCEL_TYPE_COUNT_REQUEST,
    CANCEL_TYPE_COUNT_SUCCESS,
    CANCEL_TYPE_COUNT_ERROR,
    PENDING_TYPE_COUNT_REQUEST,
    PENDING_TYPE_COUNT_SUCCESS,
    PENDING_TYPE_COUNT_ERROR,
    SET_INCOMPLETE_REMINDER_REQUEST,
    SET_INCOMPLETE_REMINDER_SUCCESS,
    SET_INCOMPLETE_REMINDER_ERROR,






    SET_CUSTOMER_SEARCH_REQUEST,

    GET_CUSTOMER_REQUEST,
    GET_CUSTOMER_SUCCESS,
    GET_CUSTOMER_FAILED,

    UPDATE_CUSTOMER_SEARCH_REQUEST,

    SUBMIT_CREDIT_APP_REQUEST,
    SUBMIT_CREDIT_APP_SUCCESS,
    SUBMIT_CREDIT_APP_FAILED,

    SET_APP_FILLED_STATUS,

    SUBMIT_CUSTOMER_REPONSE_REQUEST,
    SUBMIT_CUSTOMER_REPONSE_SUCCESS,
    SUBMIT_CUSTOMER_REPONSE_FAILED,

    SEND_APP_LINK_REQUEST,
    SEND_APP_LINK_SUCCESS,
    SEND_APP_LINK_FAILED,

    VALIDATE_EMAIL_REQUEST,
    VALIDATE_EMAIL_SUCCESS,
    VALIDATE_EMAIL_FAILED,

    SUBMIT_CUSTOMER_REPONSE_TO_THANKYOU



} from '../actions/sales';

const INIT_STATE = {
    apps: [],
    getListLoading: false,

    selectedApp: {
        loading: false,
        data: {}
    },
    cancelTypeCount: {
        declineCount: 0,
        approvedCount: 0,
        fundedCount: 0,
        cancelCount: 0,
    },
    cancelTypeLoading: false,
    pendingTypeCont: {
        pendingCount: 0,
        incompleteCount: 0,
    },
    pendingTypeLoading: false,
    isReminderLoading: false,













    customer: {main_app: {}, co_app: {}, invite_status: null, ssn: null, co_ssn: null},
    isCustomerFound: false,
    isCustomerEnterManually: false,
    isCustomerSubmitted: false,
    searchCustomerApiInitiate: false,
    actionLoading: false,
    appFillStatus: 'in_app',
    emailValidate: true
    








};

export default function(state = INIT_STATE, action){

    let temp_customer = {main_app: {}, co_app: {}}

    switch (action.type) {
        case SALES_LIST:
            return {
                ...state,
                apps: [],
                getListLoading: true
            }
        case SALES_LIST_SUCCESS:
            return {
                ...state,
                apps: action.payload,
                getListLoading: false

            }
        case SALES_LIST_ERROR:
            return {
                ...state,
                getListLoading: false
            }
        case GET_APP_DETAIL:
            return {
                ...state,
                selectedApp: {                    
                    loading: true,
                    data: {}
                }
            }
        case GET_APP_DETAIL_SUCCESS:
            return {
                ...state,
                selectedApp: {
                    loading: false,
                    data: action.payload
                }
            }
        case GET_APP_DETAIL_ERROR:
            return {
                ...state,
                selectedApp: {
                    loading: false,
                    data: {}
                }
            }
        case CANCEL_TYPE_COUNT_REQUEST:
            return {
                ...state,
                cancelTypeLoading: true,
            }
        case CANCEL_TYPE_COUNT_SUCCESS:
            return {
                ...state,
                cancelTypeCount: {
                    declineCount: action.payload.declineCount,
                    approvedCount: action.payload.approvedCount,
                    fundedCount: action.payload.fundedCount,
                    cancelCount: action.payload.cancelCount,
                },
                cancelTypeLoading: false,
            }
        case CANCEL_TYPE_COUNT_ERROR:
            return {
                ...state,
                cancelTypeLoading: false,
            }
        case PENDING_TYPE_COUNT_REQUEST:
            return {
                ...state,
                pendingTypeLoading: true,
            }
        case PENDING_TYPE_COUNT_SUCCESS:
            return {
                ...state,
                pendingTypeCont: {
                    pendingCount: action.payload.pendingCount,
                    incompleteCount: action.payload.incompleteCount,
                },
                pendingTypeLoading: false,
            }
        case PENDING_TYPE_COUNT_ERROR:
            return {
                ...state,
                pendingTypeLoading: false,
            }
        case SET_INCOMPLETE_REMINDER_REQUEST:
            return {
                ...state,
                isReminderLoading: true,
            }
        case SET_INCOMPLETE_REMINDER_SUCCESS:
            return {
                ...state,
                isReminderLoading: false,
            }
        case SET_INCOMPLETE_REMINDER_ERROR:
            return {
                ...state,
                isReminderLoading: false,
            }














        case SET_CUSTOMER_SEARCH_REQUEST:
            return {
                ...state,
                customer: temp_customer,
                isCustomerFound: false,
                searchCustomerApiInitiate: false,
                emailValidate: true
            }
        case SET_APP_FILLED_STATUS:
            return {
                ...state,
                appFillStatus: action.payload,
            }
        case GET_CUSTOMER_REQUEST:
            return {
                ...state,
                customer: temp_customer,
                isCustomerFound: false,
                searchCustomerApiInitiate: true,
                actionLoading: true,
            }
        case GET_CUSTOMER_SUCCESS:

            let customer = null;
            
            if(action.payload.data) {
                customer = {
                    ...action.payload.data,
                    main_app: {
                        ...action.payload.data.main_app,
                        ssn: null
                    },
                    co_app: {
                        ...action.payload.data.co_app,
                        ssn: null
                    },
                    ssn: action.payload.data.main_app.ssn, 
                    co_ssn: action.payload.data.co_app ? action.payload.data.co_app.ssn : null
                }
            } else {
                customer = {
                    ...temp_customer
                }
            }

            return {
                ...state,
                customer: customer,
                isCustomerFound: action.payload.data ? true : false,
                searchCustomerApiInitiate: true,
                actionLoading: false,
                isCustomerSubmitted: false,
                emailValidate: true
            }
        case GET_CUSTOMER_FAILED:
            return {
                ...state,
                customer: temp_customer,
                isCustomerFound: false,
                searchCustomerApiInitiate: true,
                actionLoading: false,
            }



        
        case VALIDATE_EMAIL_REQUEST:
            return {
                ...state,
                emailValidate: false,
                actionLoading: true,
            }
        case VALIDATE_EMAIL_SUCCESS:
            return {
                ...state,                
                emailValidate: true,
                actionLoading: false,
            }
        case VALIDATE_EMAIL_FAILED:
            return {
                ...state,                
                emailValidate: false,
                actionLoading: false,
            }






        case UPDATE_CUSTOMER_SEARCH_REQUEST:
            return {
                ...state,
                customer: action.payload,
                isCustomerEnterManually: true
            }
        case SUBMIT_CREDIT_APP_REQUEST:
            return {
                ...state,
                actionLoading: true,
            }
        case SUBMIT_CREDIT_APP_SUCCESS:
            return {
                ...state,
                actionLoading: false,
            }
        case SUBMIT_CREDIT_APP_FAILED:
            return {
                ...state,
                actionLoading: false,
            }
        case SUBMIT_CUSTOMER_REPONSE_REQUEST:
            return {
                ...state,
                actionLoading: true,
            }
        case SUBMIT_CUSTOMER_REPONSE_SUCCESS:
            return {
                ...state,
                actionLoading: false,
            }
        case SUBMIT_CUSTOMER_REPONSE_FAILED:
            return {
                ...state,
                actionLoading: false,
            }        
        case SEND_APP_LINK_REQUEST:
            return {
                ...state,
                actionLoading: true,
            }
        case SEND_APP_LINK_SUCCESS:
            return {
                ...state,
                actionLoading: false,
            }
        case SEND_APP_LINK_FAILED:
            return {
                ...state,
                actionLoading: false,
            }        
        case SUBMIT_CUSTOMER_REPONSE_TO_THANKYOU:
            return {
                ...state,
                actionLoading: false,
                isCustomerSubmitted: true,
            }















        default:
            return state;
    }
}