import API from '../../api';
import {
    CHANGE_PASSWORD_START,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE,
} from './actionTypes';
import { message } from 'shared/constant'
import { pushNotification } from 'utils/notification';

// export function changePasswordRequest(action) {
//     return async function(dispatch) {
//         dispatch(changePasswordStart());
//         const data = {
//             currentPassword: action.currentPassword,
//             newpassword: action.password
//         };
//         try {
//             const response = API.post('/accounts/change-password', data);
//             if(response) {
//                 dispatch(changePasswordSuccess());
//                 action.reset && action.reset()
//                 // pushNotification(message.PASSWORD_CHANGE_SUCCESS, 'success', 'TOP_RIGHT', 3000);
//                 console.log('work')
//             }
               
//         } catch(error) {
//             pushNotification(error.response.data, 'error', 'TOP_RIGHT', 3000);            
//             dispatch(changePasswordFail());
//         }
//     };
// };

export function changePasswordRequest(action) {
    return async function(dispatch) {
        dispatch({
            type: CHANGE_PASSWORD_START
        });
        try {
            const data = {
                currentpassword: action.currentPassword,
                newpassword: action.password
            };
            const response = await API.post('/accounts/change-password', data);
            if(response) {
                dispatch({
                    type: CHANGE_PASSWORD_SUCCESS
                });
                action.reset && action.reset()
                pushNotification(message.PASSWORD_CHANGE_SUCCESS, 'success', 'TOP_RIGHT', 3000);
            }
        } catch(error) {
                if(error && error.response && error.response.data.error) {
                    const errValue = error.response.data.error;
                    pushNotification(errValue, 'error', 'TOP_RIGHT', 3000);    
                } else {
                    pushNotification(error.response.data, 'error', 'TOP_RIGHT', 3000)
                }         
                dispatch({
                    type: CHANGE_PASSWORD_FAILURE
                });
        }
       
    }
}
