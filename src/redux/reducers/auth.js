import { SET_AVATAR } from '../actions/auth';

const INIT_STATE = {
    avatar: ''
};

export default function(state = INIT_STATE, action){
    switch (action.type) {
        case SET_AVATAR:
            return {
                ...state,
                avatar: action.payload
            }
        default:
            return state;
    }
}