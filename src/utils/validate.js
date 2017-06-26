import { message } from 'shared/constant';

export const commonValidation = (expression, values, errors) => {
    switch(expression) {
    case 'email':
        if (!values.email) {
            errors.email = message.EMPTY_EMAIL;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = message.INVALID_EMAIL;
        }
        break;
    default:
        // code block
    }
}

export const changePasswordValidation = values => {
    const errors = {};
    if (!values.currentPassword) {
        errors.currentPassword = message.EMPTY_PASSWORD;
    } else if(values.currentPassword && values.currentPassword.length < 8) {
        errors.currentPassword = message.PASSWORD_LENGTH;
    }

    if (!values.password) {
        errors.password = message.EMPTY_PASSWORD;
    } else if(values.password && values.password.length < 8) {
        errors.password = message.PASSWORD_LENGTH;
    }

    if (!values.confirmPassword ) {
        errors.confirmPassword = message.EMPTY_CONFIRM_PASSWORD ;
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = message.PASSWORD_NOT_MATCH ;
    }
    return errors;
}

export const userForm = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = message.EMPTY_FIRST_NAME;
    }
    if (!values.lastName) {
        errors.lastName = message.EMPTY_LAST_NAME;
    }
    commonValidation('email', values, errors);
    return errors;
}

export const invitationValidation = values => {
    const errors = {};
    commonValidation('email', values, errors);
    return errors;
}
