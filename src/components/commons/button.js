import React from 'react';

const handleClick = (e, callback) => {

    if( callback ) {
        e.preventDefault();
        callback(e);
    }
};



const Button = ( props ) => {

    const {
        id,
        label,
        role,
        className = null,
        ariaLabel,
        type,
        buttonRef,
        dataname,
        dataid,
        tabIndex,
        isDisabled,
        title = '',
        optionalParams
    } = props;

    const buttonTitle = ariaLabel || title;

    return (

        props.children ?
            <button
                id ={ id }
                role ={ role }
                type = { type }
                ref = { buttonRef }
                tabIndex = { tabIndex }
                data-name = { dataname }
                data-id = { dataid }
                className = { className }
                aria-lable = { buttonTitle }
                onClick = {(e) => {
                    handleClick( e, props.onClick );
                }}  
                title = { buttonTitle }
                disabled = { isDisabled }
                { ...optionalParams }
            >
                { props.children }
            </button>
            :
            <button
                id ={ id }
                role ={ role }
                type = { type }
                aria-lable = { buttonTitle }
                ref = { buttonRef }
                tabIndex = { tabIndex }
                data-name = { dataname }
                data-id = { dataid }
                className = { className }
                onClick = {(e) => {
                    handleClick( e, props.onClick );
                }}  
                title = { buttonTitle }
                disabled = { isDisabled }
                { ...optionalParams }
                dangerouslySetInnerHTML = {{ __html: label }}
            />
    );
};

export default Button;