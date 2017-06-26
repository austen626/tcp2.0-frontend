import API from '../../api';

export const SET_AVATAR = "SET_AVATAR";

export function login(body) {
    return async function(dispatch) {
        try {
            const response = await API.post('accounts/login', body);
            return response.data
        } catch (error) {
            return error.response.data;
        }
    }
}

export function loginVerify(body) {
    return async function(dispatch) {
        try {
            const response = await API.post('accounts/login-verify', body);
            return response.data
        } catch (error) {
            return error.response.data;
        }
    }
}

export function sendAgain(body) {
    return async function(dispatch) {
        try {
            const response = await API.post('accounts/send-again', body);
            return response.data
        } catch (error) {
            return error.response.data;
        }
    }   
}

export function register(body) {
    return async function(dispatch) {
        try {
            const response = await API.post('accounts/invite-register', body);
            return response.data
        } catch (error) {
            return error.response.data;
        }
    }   
}

export function registerVerify(body) {
    return async function(dispatch) {
        try {
            const response = await API.post('accounts/register-verify', body);
            return response.data
        } catch (error) {
            return error.response.data;
        }
    }
}

export function codeVerify(body) {
    return async function(dispatch) {
        try {
            const response = await API.post('accounts/code-verify', body);
            return response.data
        } catch (error) {
            return error.response.data;
        }
    }
}

export function forgotCodeVerify(body) {
    return async function(dispatch) {
        try {
            const response = await API.post('accounts/code-verify-forgot', body);
            return response.data
        } catch (error) {
            return error.response.data;
        }
    }
}

export function forgotPassword(body) {
    return async function(dispatch) {
        try {
            const response = await API.post('accounts/reset', body);
            return response.data
        } catch (error) {
            return error.response.data;
        }
    }
}

export function resetPassword(body) {
    return async function(dispatch) {
        try {
            const response = await API.post('accounts/reset-password', body);
            return response.data
        } catch (error) {
            return error.response.data;
        }
    }
}

export function getMe() {
    return async function(dispatch) {
        try {
            const response = await API.get('accounts/me');
            dispatch({
                type: SET_AVATAR,
                payload: response.data.avatar
            });
        } catch (error) {
            // return error.response.data;
        }
    }
}