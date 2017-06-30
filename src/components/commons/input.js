import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/*
 * Common Input component

 * @returns {JSX.Element}
 */

const inputValidation = (inputVal, required, regexString) => {

    const regex = regexString && new RegExp(regexString, 'i');

    const isValid = regex && inputVal ? regex.test(inputVal) : true;

    return !!required && inputVal === '' ? true : !isValid ? true : false;
};

const Input = (props) => {

    const {
        type = 'text',
        name,
        id,
        value,
        defaultValue,
        className = '',
        ariaLabel,
        required = false,
        label,
        dataName,
        inputRef,
        min,
        maxLength,
        labelTransform = true,
        defaultText,
        regex,
        optionalParams,
        disabled = false,
        inputClass = '',
        onFocus,
        onBlur,
        handleChange,
        validationResult,
        error,
        checked
    } = props;

    const [ focussed, setFocussed ] = useState(!!value || !!defaultValue);
    const [ inputValue, setInputValue ] = useState(value || defaultValue || '');
    const [ inputInvalid, setInputInvalid ] = useState(required && !(value));

    const updateInputValue = (newVal = '') => {

        setInputValue(newVal);
        setInputInvalid(inputValidation(newVal, required, regex));
    };

    const handleFocus = () => {

        setFocussed(true);

        typeof onFocus === 'function' && onFocus();
    };

    const handleBlur = () => {

        setFocussed(false);

        typeof onBlur === 'function' && onBlur();
    };

    const handleInputChange = (event) => {

        updateInputValue(event.currentTarget && event.currentTarget.value);

        typeof handleChange === 'function' && handleChange(event);
    };

    useEffect(() => {

        if ( defaultValue === undefined && value !== undefined && value !== inputValue) {
            updateInputValue(value);
        }
    });

    let errorLabel = '';

    if (validationResult && validationResult[name] && error ) {

        const errorType = validationResult[name].error;

        errorLabel = error[errorType] || null;
    }

    console.log(errorLabel)

    const inputId = id || name,
        ariaLabelledBy = id && `${id}-label`,
        // showError = !!errorLabel && inputInvalid,
        showError = !!errorLabel && inputInvalid,
        transform = inputValue !== '' || focussed;

    return (
        <div
            className={`input-holder ${className} ${type} ${disabled ? 'disabled' : ''} ${showError ? 'has-error' : ''}`}
        >
            <div className='input-container'>
                {label && (
                    <label
                        htmlFor={inputId}
                        className={`form-label ${labelTransform && transform ? 'transform' : ''
                        }`}
                        id={ariaLabelledBy}>
                        <span dangerouslySetInnerHTML={{ __html: label }} />
                    </label>
                )}
                <div className='input-field'>
                    <input
                        className={`form-control ${ inputClass } ${ value !== '' ? 'has-input' : 'empty' } ${ showError ? 'invalid' : '' }`}
                        ref={inputRef}
                        type={type}
                        id={inputId}
                        placeholder={defaultText}
                        maxLength={maxLength}
                        name={name}
                        min={min}
                        data-name={dataName}
                        value={inputValue}
                        aria-label={ariaLabel}
                        {...(label && {
                            'aria-labelledby': ariaLabelledBy
                        })}
                        autoComplete='off'
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required={required}
                        onChange={handleInputChange}
                        data-regex={regex}
                        disabled={disabled}
                        checked={checked}
                        {...optionalParams}
                    />
                </div>
            </div>
            {showError &&
                <div className='error-label'>{errorLabel}</div>
            }
        </div>
    );
};

export default Input;

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    inputClass: PropTypes.string,
    ariaLabel: PropTypes.string,
    isRequired: PropTypes.bool
};