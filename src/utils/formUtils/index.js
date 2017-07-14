import React from 'react';
import { FormControl, Form } from 'react-bootstrap';

export const Validations = (props) => {
    const {
        touched,
        error,
        validationError,
        warning,
    } = props.props;

    return (
        <>
            <p>
                {touched && ((error && <span className="field_error">{error}</span>) || (warning && <span>{warning}</span>))}
            </p>
            {validationError && (
                <p>
                    {(validationError && <span className="field_error">{validationError}</span>)}
                </p>
            )}
        </>
    );
};

const renderField = (props) => {
    const {
        input,
        label,
        name,
        type,
        placeholder,
        disabled,
        validationError,
        meta: { touched, error, warning },
        maxLength,
        formClass,
        rows,
    } = props;

    return (
        <Form.Group className={ formClass + ' force-mb-10' } style={ { width: '100%' } }>
            {label && <Form.Label className="force_mb-5" htmlFor={ name }>{label || ''}</Form.Label>}
            <FormControl rows={ rows } { ...input } maxLength={ maxLength } disabled={ disabled || false } type={ type } className={ validationError || (touched && error) ? 'validation-error' : '' } placeholder={ placeholder || '' } />
            <Validations
                props={ {
                    touched,
                    error,
                    validationError,
                    warning,
                } }
            />
        </Form.Group>
    );
};

const RadioField = (props) => {
    const {
        input,
        label,
        name,
        validationError,
        checked,
        formClass,
        ...rest
    } = props;
    return(
        <Form.Group className={ formClass + ' force-mb-10' }>
            <Form.Check label={ label }  type="radio" {...input} {...rest} checked={input.value === rest.value} />
        </Form.Group>
    )
}

const getHashValue = (attribute) => {
    const urlHash = window.location.hash.replace("#", "");
    if(urlHash.indexOf(attribute) === -1) {
      return null;
    }
    const splitArray = urlHash.split(`${attribute}=`)
    
    let value = null;
    if(splitArray[1]) {
      value = splitArray[1].split('&')[0];
    }
    return value;
}

export {
    renderField,
    RadioField,
    getHashValue
};