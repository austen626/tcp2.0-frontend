import {
    GET_STAFFS_REQUESTS,
    GET_STAFFS_REQUESTS_SUCCESS,
    GET_STAFFS_REQUESTS_FAILED,
    SET_STAFFS_REQUEST,
    ADD_STAFFS_REQUEST,
    ADD_STAFFS_REQUEST_SUCCESS,
    ADD_STAFFS_REQUEST_FAILED,
    UPDATE_STAFFS_REQUEST,
    UPDATE_STAFFS_REQUEST_SUCCESS,
    UPDATE_STAFFS_REQUEST_FAILED,
    DELETE_STAFFS_REQUEST,
    DELETE_STAFFS_REQUEST_SUCCESS,
    DELETE_STAFFS_REQUEST_FAILED,

} from '../actions/dealer';

const INIT_STATE = {
    staffs: {
        loading: false,
        data: []
    },
    selectedStaff: {},
    actionLoading: false,
};

export default function(state = INIT_STATE, action){

    switch (action.type) {
        
        case GET_STAFFS_REQUESTS:
            return {
                ...state,
                staffs: {
                    loading: true,
                    data: []
                }
            }
        case GET_STAFFS_REQUESTS_SUCCESS:
            return {
                ...state,
                staffs: {
                    loading: false,
                    data: action.payload
                }
            }
        case GET_STAFFS_REQUESTS_FAILED:
            return {
                ...state,
                staffs: {
                    loading: false,
                    data: []
                }
            }
        case SET_STAFFS_REQUEST:
            return {
                ...state,
                selectedStaff: action.payload
            }
        case UPDATE_STAFFS_REQUEST:
            return {
                ...state,
                actionLoading: true
            }
        case UPDATE_STAFFS_REQUEST_SUCCESS:
            return {
                ...state,
                selectedStaff: {},
                actionLoading: false
            }
        case UPDATE_STAFFS_REQUEST_FAILED:
            return {
                ...state,
                actionLoading: false
            }
        case ADD_STAFFS_REQUEST:
            return {
                ...state,
                actionLoading: true
            }
        case ADD_STAFFS_REQUEST_SUCCESS:
            return {
                ...state,
                actionLoading: false
            }
        case ADD_STAFFS_REQUEST_FAILED:
            return {
                ...state,
                actionLoading: false
            }
        case DELETE_STAFFS_REQUEST:
            return {
                ...state,
                actionLoading: true
            }
        case DELETE_STAFFS_REQUEST_SUCCESS:

            const index = state.staffs.data.findIndex(d => d.id == action.payload)
            state.staffs.data.splice(index, 1);

            return {
                ...state,
                actionLoading: false,
            }
        case DELETE_STAFFS_REQUEST_FAILED:
            return {
                ...state,
                actionLoading: false
            }
        default:
            return state;
    }
}