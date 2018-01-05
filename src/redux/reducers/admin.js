import {
    GET_PREAPPROVALS,
    GET_PREAPPROVALS_SUCCESS,
    GET_PREAPPROVALS_FAILED,
    SET_SELECTED_PREAPPROVAL,
    CHANGE_SELECTED_PREAPPROVAL_STATUS,
    SET_SELECTED_PENDING_APPLICATION,
    CHANGE_SELECTED_PENDING_APPLICATION_STATUS,
    GET_FUNDING_REQUESTS,
    GET_FUNDING_REQUESTS_SUCCESS,
    GET_FUNDING_REQUESTS_FAILED,
    SET_SELECTED_FUNDING_REQUEST,
    CHANGE_SELECTED_FUNDING_REQUEST_REQUEST,
    CHANGE_SELECTED_FUNDING_REQUEST_STATUS,
    CHANGE_SELECTED_FUNDING_REQUEST_FAILED,
    CHANGE_SELECTED_PREAPPROVAL_REQUEST,
    CHANGE_SELECTED_PREAPPROVAL_FAILED,
    GET_DEALERS_REQUESTS,
    GET_DEALERS_REQUESTS_SUCCESS,
    GET_DEALERS_REQUESTS_FAILED,
    SET_DEALER_REQUEST,
    ADD_DEALER_REQUEST,
    ADD_DEALER_REQUEST_SUCCESS,
    ADD_DEALER_REQUEST_FAILED,
    UPDATE_DEALER_REQUEST,
    UPDATE_DEALER_REQUEST_SUCCESS,
    UPDATE_DEALER_REQUEST_FAILED,
    DELETE_DEALER_REQUEST,
    DELETE_DEALER_REQUEST_SUCCESS,
    DELETE_DEALER_REQUEST_FAILED,
    UPDATE_DEALER_DATA_REQUEST_FAILED,
    UPDATE_DEALER_DATA_REQUEST_SUCCESS,
    UPDATE_DEALER_DATA_REQUEST,
} from '../actions/admin';

const INIT_STATE = {
    preapprovals: {
        loading: false,
        data: [],
    },
    selectedPreapproval: {},
    selectedPendingApplication: {},
    fundings: {
        loading: false,
        data: [],
    },
    selectedFunding: {},
    submitPreapprovalLoading: false,
    setFundingLoading: false,
    dealers: {
        loading: false,
        data: [],
    },
    selectedDealer: {},
    actionLoading: false,
};

export default function (state = INIT_STATE, action) {
    switch (action.type) {
        case GET_PREAPPROVALS:
            return {
                ...state,
                preapprovals: {
                    loading: true,
                    data: [],
                },
            };
        case GET_PREAPPROVALS_SUCCESS:
            return {
                ...state,
                preapprovals: {
                    loading: false,
                    data: action.payload,
                },
            };
        case GET_PREAPPROVALS_FAILED:
            return {
                ...state,
                preapprovals: {
                    loading: false,
                    data: [],
                },
            };
        case SET_SELECTED_PREAPPROVAL:
            return {
                ...state,
                selectedPreapproval: action.payload,
            };
        case CHANGE_SELECTED_PREAPPROVAL_REQUEST:
            return {
                ...state,
                submitPreapprovalLoading: true,
            };
        case CHANGE_SELECTED_PREAPPROVAL_STATUS:
            return {
                ...state,
                selectedPreapproval: {
                    ...state.selectedPreapproval,
                    status: action.payload,
                },
                submitPreapprovalLoading: false,
            };
        case CHANGE_SELECTED_PREAPPROVAL_FAILED:
            return {
                ...state,
                submitPreapprovalLoading: false,
            };
        case SET_SELECTED_PENDING_APPLICATION:
            return {
                ...state,
                selectedPendingApplication: action.payload,
            };
        case CHANGE_SELECTED_PENDING_APPLICATION_STATUS:
            return {
                ...state,
                selectedPreapproval: {
                    ...state.selectedPendingApplication,
                    status: action.payload,
                },
            };
        case GET_FUNDING_REQUESTS:
            return {
                ...state,
                fundings: {
                    loading: true,
                    data: [],
                },
            };
        case GET_FUNDING_REQUESTS_SUCCESS:
            return {
                ...state,
                fundings: {
                    loading: false,
                    data: action.payload,
                },
            };
        case GET_FUNDING_REQUESTS_FAILED:
            return {
                ...state,
                fundings: {
                    loading: false,
                    data: [],
                },
            };
        case SET_SELECTED_FUNDING_REQUEST:
            return {
                ...state,
                selectedFunding: action.payload,
            };
        case CHANGE_SELECTED_FUNDING_REQUEST_REQUEST:
            return {
                ...state,
                setFundingLoading: true,
            };
        case CHANGE_SELECTED_FUNDING_REQUEST_STATUS:
            return {
                ...state,
                selectedFunding: {
                    ...state.selectedFunding,
                    status: action.payload,
                },
                setFundingLoading: false,
            };
        case CHANGE_SELECTED_FUNDING_REQUEST_FAILED:
            return {
                ...state,
                setFundingLoading: false,
            };

        case GET_DEALERS_REQUESTS:
            return {
                ...state,
                dealers: {
                    loading: true,
                    data: [],
                },
            };
        case GET_DEALERS_REQUESTS_SUCCESS:
            return {
                ...state,
                dealers: {
                    loading: false,
                    data: action.payload.data,
                },
            };
        case GET_DEALERS_REQUESTS_FAILED:
            return {
                ...state,
                dealers: {
                    loading: false,
                    data: [],
                },
            };
        case SET_DEALER_REQUEST:
            return {
                ...state,
                selectedDealer: action.payload,
            };
        case UPDATE_DEALER_REQUEST:
            return {
                ...state,
                actionLoading: true,
            };
        case UPDATE_DEALER_REQUEST_SUCCESS:
            return {
                ...state,
                selectedDealer: {},
                actionLoading: false,
            };
        case UPDATE_DEALER_REQUEST_FAILED:
            return {
                ...state,
                actionLoading: false,
            };
        case UPDATE_DEALER_DATA_REQUEST:
            return {
                ...state,
                actionLoading: true,
            };
        case UPDATE_DEALER_DATA_REQUEST_SUCCESS: {
            const index = state.dealers.data.findIndex(
                (d) => d.id === action.payload.id
            );
            state.dealers.data.splice(index, 1, action.payload);
            return {
                ...state,
                actionLoading: false,
            };
        }
        case UPDATE_DEALER_DATA_REQUEST_FAILED:
            return {
                ...state,
                actionLoading: false,
            };
        case ADD_DEALER_REQUEST:
            return {
                ...state,
                actionLoading: true,
            };
        case ADD_DEALER_REQUEST_SUCCESS:
            return {
                ...state,
                actionLoading: false,
            };
        case ADD_DEALER_REQUEST_FAILED:
            return {
                ...state,
                actionLoading: false,
            };
        case DELETE_DEALER_REQUEST:
            return {
                ...state,
                actionLoading: true,
            };
        case DELETE_DEALER_REQUEST_SUCCESS:
            const index = state.dealers.data.findIndex(
                (d) => d.id == action.payload
            );
            state.dealers.data.splice(index, 1);

            return {
                ...state,
                actionLoading: false,
            };
        case DELETE_DEALER_REQUEST_FAILED:
            return {
                ...state,
                actionLoading: false,
            };

        default:
            return state;
    }
}
