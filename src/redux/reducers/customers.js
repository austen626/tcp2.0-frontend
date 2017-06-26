import {
    SEARCH_CUSTOMERS,
    SEARCH_CUSTOMERS_SUCCESS,
    SEARCH_CUSTOMERS_FAILED,
    GET_PREAPPROVAL_CUSTOMERS,
    GET_PREAPPROVAL_CUSTOMERS_SUCCESS,
    GET_PREAPPROVAL_CUSTOMERS_FAILED,
    GET_CUSTOMER,
    GET_CUSTOMER_SUCCESS,
    GET_CUSTOMER_FAILED,
    GET_PREAPPROVAL_COUNTS_REQUEST,
    GET_PREAPPROVAL_COUNTS_SUCCESS,
    GET_PREAPPROVAL_COUNTS_FAILED
} from '../actions/customers';
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
} from '../actions/actionTypes';

const INIT_STATE = {
    loading: false,
    data: [],
    preAprrovalCustomer: [],

    selected: {
        loading: false,
        data: {}
    },
    approveCountLoading: false,
    approveCount: 0,    
    historyData: [],
    isHistoryLoading: false,
    paymentHistoryData: [],
    isPaymentHistoryLoading: false,
    preRequestLoading: false
};

export default function(state = INIT_STATE, action){
    switch (action.type) {
        case SEARCH_CUSTOMERS:
            return {
                ...state,
                loading: true,
                data: []
            }
        case SEARCH_CUSTOMERS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case SEARCH_CUSTOMERS_FAILED:
            return {
                ...state,
                loading: false,
                data: []                
            }
        case GET_CUSTOMER:
            return {
                ...state,
                selected: {
                    loading: true,
                    data: {}
                }
            }
        case GET_CUSTOMER_SUCCESS:
            return {
                ...state,
                selected: {
                    loading: false,
                    data: action.payload
                }
            }
        case GET_CUSTOMER_FAILED:
            return {
                ...state,
                selected: {
                    loading: false,
                    data: {}
                }
            }
        case GET_PREAPPROVAL_CUSTOMERS:
            return {
                ...state,
                loading: true
            }
        case GET_PREAPPROVAL_CUSTOMERS_SUCCESS:
            // let preApprovalCustomer = action.payload.filter(app => app.preapproval.id !== 0);
            return {
                ...state,
                preAprrovalCustomer: action.payload,
                loading: false
            }
        case GET_PREAPPROVAL_CUSTOMERS_FAILED:
            return {
                ...state,
                preAprrovalCustomer: action.payload,
                loading: false
            }
            case GET_PREAPPROVAL_COUNTS_REQUEST:
            return {
                ...state,
                approveCountLoading: true
            }
        case GET_PREAPPROVAL_COUNTS_SUCCESS:
            return {
                ...state,
                approveCount: action.payload,
                approveCountLoading: false
            }
        case GET_PREAPPROVAL_COUNTS_FAILED:
            return {
                ...state,
                preAprrovalCustomer: action.payload,
                approveCountLoading: false
            }           

        case GET_CUSTOMER_HISTORY_REQUEST:
            return {
                ...state,
                    historyData: [],
                    isHistoryLoading: true
            };
        case GET_CUSTOMER_HISTORY_SUCCESS:
            return {
                ...state,
                historyData: action.data,
                isHistoryLoading: false
            };
        case GET_CUSTOMER_HISTORY_FAILED:
            return {
                ...state,
                isHistoryLoading: false
            }; 
        case GET_CUSTOMER_PAYMENT_HISTORY_REQUEST:
            return {
                ...state,
                    paymentHistoryData: [],
                    isPaymentHistoryLoading: true
            };
        case GET_CUSTOMER_PAYMENT_HISTORY_SUCCESS:
            return {
                ...state,
                paymentHistoryData: action.data,
                isPaymentHistoryLoading: false
            };
        case GET_CUSTOMER_PAYMENT_HISTORY_FAILED:
            return {
                ...state,
                isPaymentHistoryLoading: false
            };  
            case AGAIN_PREREQUEST_REQUEST:
                return {
                    ...state,
                        preRequestLoading: true
                };
            case AGAIN_PREREQUEST_SUCCESS:
                return {
                    ...state,
                    paymentHistoryData: action.data,
                    preRequestLoading: false
                };
            case AGAIN_PREREQUEST_FAILED:
                return {
                    ...state,
                    preRequestLoading: false
                };  
        default:
            return state;
    }
}