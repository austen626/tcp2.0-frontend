import React from 'react';

const Checkbox = (props) => {

    const {
        className = '',
        label,
        name = 'checkbox',
        id,
        disabled = false,
        error = {},
        validationResult = false,
        handleChange,
        checked,
        theme = ''
    } = props;

    let extraProps = {},
        errorLabel = '';

    const checkboxChange = (event) => {

        typeof handleChange === 'function' && handleChange(event);
    };

    if ( checked !== undefined ) {

        extraProps.checked = checked;
    }

    if (validationResult && validationResult[name] && error) {

        errorLabel = error[validationResult[name].error] || null;


    }

    return (
        <div className={`input-holder checkbox ${ className } ${ disabled ? 'disabled' : '' } ${theme}`}>
            <div className='input-container'>
                <div className='checkbox-field-container'>
                    <input
                        type='checkbox'
                        name={ name }
                        id={ id || name }
                        onChange={ checkboxChange }
                        disabled={disabled}
                        className='form-control regular-checkbox'
                        { ...extraProps }
                    />
                    <span className='icon-check'/>
                </div>
                {label &&
                    <label className={`body-copy-secondary ${theme}`} htmlFor={ id || name }>
                        <span dangerouslySetInnerHTML={{ __html: label }} />
                    </label>
                }
            </div>
            {errorLabel && (
                <div className='error-label body-copy-secondary'>
                    <span className='icon-info'></span>
                    { errorLabel}
                </div>
            )}
        </div>
    );
};

export default Checkbox;