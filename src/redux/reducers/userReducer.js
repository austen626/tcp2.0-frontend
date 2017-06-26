import {
    GET_USER_START,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    UPDATE_USER_START,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    GET_STAFF_REQUEST,
    GET_STAFF_SUCCESS,
    GET_STAFF_FAILED,
    DELETE_STAFF_REQUEST,
    DELETE_STAFF_SUCCESS,
    DELETE_STAFF_FAILED,
    INVITE_STAFF_REQUEST,
    INVITE_STAFF_SUCCESS,
    INVITE_STAFF_FAILED
} from '../actions/actionTypes';

const INIT_STATE = {
    userData: {},
    isUserDataLoading: false,
    isStaffLoading: false,
    staffData: [],
    isStaffDeleteLoading: false,
    isInviteLoading: false
};

export default function(state = INIT_STATE, action){
    switch (action.type) {        
        case GET_USER_START:
                return {
                    ...state,
                    isUserDataLoading: true
                };
        case GET_USER_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                isUserDataLoading: false
            };
        case GET_USER_FAILURE:
            return {
                ...state,
                isUserDataLoading: false
            };
        case UPDATE_USER_START:
            return {
                ...state,
                isFormSubmitLoading: true
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    email: action.payload.email
                },
                isFormSubmitLoading: false
            };
        case UPDATE_USER_FAILURE:
            return {
                ...state,
                isFormSubmitLoading: false
            };
        case GET_STAFF_REQUEST:
            return {
                ...state,
                isStaffLoading: true
            };
        case GET_STAFF_SUCCESS:
            return {
                ...state,
                staffData: action.payload,
                isStaffLoading: false
            };
        case GET_STAFF_FAILED:
            return {
                ...state,
                isStaffLoading: false
            };
        case DELETE_STAFF_REQUEST:
            return {
                ...state,
                isStaffDeleteLoading: true
            };
        case DELETE_STAFF_SUCCESS:
            return {
                ...state,
                isStaffDeleteLoading: false
            };
        case DELETE_STAFF_FAILED:
            return {
                ...state,
                isStaffDeleteLoading: false
            };
        case INVITE_STAFF_REQUEST:
            return {
                ...state,
                isInviteLoading: true
            };
        case INVITE_STAFF_SUCCESS:
            return {
                ...state,
                isInviteLoading: false
            };
        case INVITE_STAFF_FAILED:
            return {
                ...state,
                isInviteLoading: false
            };
        default:
            return state;
    }
}
