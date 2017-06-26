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
    SET_INCOMPLETE_REMINDER_ERROR
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
    isReminderLoading: false
};

export default function(state = INIT_STATE, action){
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
        default:
            return state;
    }
}