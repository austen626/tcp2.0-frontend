import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import DatePicker from 'react-datepicker';

/*
 * Common Input component

 * @returns {JSX.Element}
 */

const inputValidation = (inputVal, required, regexString, isMatched, name) => {

    if(inputVal === '') {
        inputVal = null
    }

    const regex = regexString && new RegExp(regexString, 'i');

    let isValid = regex && inputVal ? regex.test(inputVal) : isMatched && regexString !== inputVal ? false : true

    if(name === "date_of_birth" || name === "co_date_of_birth") 
    {
        let diff_ms = Date.now() - new Date(inputVal).getTime();
        let age_dt = new Date(diff_ms);
        
        if(Math.abs(age_dt.getUTCFullYear() - 1970) < 18 || new Date(inputVal).getFullYear() >= new Date().getFullYear()) {
            isValid = false
        }
    }

    return !!required && inputVal === null ? true : !isValid ? true : false;
    
};

const Input = (props) => {

    const {
        type = 'text',
        name,
        id,
        value,
        defaultValue,
        className = null,
        ariaLabel,
        required = false,
        label,
        dataName,
        inputRef,
        min,
        max,
        maxLength,
        labelTransform = true,
        defaultText,
        regex,
        optionalParams,
        disabled = false,
        inputClass = null,
        onFocus,
        onBlur,
        handleChange,
        validationResult,
        error,
        checked,
        mask = null,
        maskChar = "_",
        isAmount = false,
        isDate = false,
        isHidden = false,
        isMatched = false
    } = props;

    const [ focussed, setFocussed ] = useState(!!value || !!defaultValue);
    // const [ manualDate, setManualDate ] = useState(!!value || !!defaultValue);
    const [ inputValue, setInputValue ] = useState(value || defaultValue || null);
    const [ inputInvalid, setInputInvalid ] = useState(required && !(defaultValue));

    const updateInputValue = (newVal = null) => {
        
        setInputValue(newVal);

        setInputInvalid(inputValidation(newVal, required, regex, isMatched, name));
    };

    const handleFocus = () => {

        setFocussed(true);

        typeof onFocus === 'function' && onFocus();
    };

    const handleBlur = (event) => {

        setFocussed(false);

        typeof onBlur === 'function' && onBlur(event);
    };

    const handleInputChange = (event) => {

            updateInputValue(event.currentTarget && event.currentTarget.value);

        typeof handleChange === 'function' && handleChange(event);
    };

    const handleDateInputChange = (data) => {
        
        if(data !== null) {

            data = new Date(data);

            let month = data.getMonth()+1;
            let date = data.getDate();

            if(month < 10) {
                month = '0'+month
            }

            if(date < 10) {
                date = '0'+date
            }

            let temp_date = data.getFullYear()+'-'+month+'-'+date

            updateInputValue(temp_date);

            typeof handleChange === 'function' && handleDateInputChange(date);
        }
        else 
        {
            updateInputValue(null);
        }
    };

    // const handleDateInputManualChange = (data) => {

    //     console.log(data.currentTarget.value);
    //     console.log(data.currentTarget.value.indexOf('_'));
        
    //     if(data.currentTarget.value !== null && data.currentTarget.value.indexOf('_') == -1  && data.currentTarget.value.indexOf('NaN') == -1) {

    //         data = new Date(data.currentTarget.value);

    //         let month = data.getMonth()+1;
    //         let date = data.getDate();

    //         if(month < 10) {
    //             month = '0'+month
    //         }

    //         if(date < 10) {
    //             date = '0'+date
    //         }

    //         let temp_date = data.getFullYear()+'-'+month+'-'+date

    //         console.log(temp_date)
            
    //         setManualDate(temp_date)
    //         handleDateInputChange(temp_date);
    //     }
    // };

    useEffect(() => {

        if ( defaultValue === undefined && value !== undefined && value !== inputValue) {
            updateInputValue(value);
        }
    }, [value, defaultValue]);

    useEffect(() => {

        if ( required ) {
            updateInputValue(defaultValue);
        }
    }, [required]);

    let errorLabel = null;

    if (validationResult && validationResult[name] && error ) {

        const errorType = validationResult[name].error;

        errorLabel = error[errorType] || null;
    }

    const range = (size, startAt = 0) => {
        return [...Array(size).keys()].map(i => startAt - i);
    }

    const years = range(120, new Date().getFullYear(), 1);
    
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    {/* <button type="button" className={`form-control datepicker-button ${inputValue ? '' : 'empty'}`} onClick={onClick} ref={ref}>
        {value ? value : 'MM/DD/YYYY'}
    </button> */}

    // const ExampleCustomInput = React.forwardRef(
    //     ({ value, onClick }, ref) => (
    //         <InputMask 
    //             onClick={onClick} 
    //             ref={ref} 
    //             defaultValue={value} 
    //             placeholder="MM/DD/YYYY" 
    //             className="form-control" 
    //             mask="99/99/9999" 
    //             onChange={handleDateInputManualChange}
    //         />
    //     ),
    //   );

    const inputId = id || name,
        ariaLabelledBy = id && `${id}-label`,
        showError = !!errorLabel && inputInvalid,
        transform = inputValue !== null || focussed;

    if(name == "date_of_birth" || name === "co_date_of_birth") {
        console.log(showError)
    }

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
                    {!mask ?
                        <input
                            className={`form-control ${ inputClass } ${ inputValue !== null ? 'has-input' : 'empty' } ${ showError ? 'invalid' : '' } ${ isAmount ? 'has-amount' : ''}`}
                            ref={inputRef}
                            type={type}
                            id={inputId}
                            placeholder={defaultText}
                            maxLength={maxLength}
                            name={name}
                            min={min}
                            max={max}
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
                            data-isMatched={isMatched}
                            disabled={disabled}
                            checked={checked}
                            {...optionalParams}
                        />
                    :
                        <>
                            <InputMask 
                                maskChar={maskChar} 
                                mask={mask} 
                                className={`form-control ${ inputClass } ${ inputValue !== null ? 'has-input' : 'empty' } ${ showError ? 'invalid' : '' } ${ isAmount ? 'has-amount' : ''}`}
                                ref={inputRef}
                                id={inputId}
                                placeholder={defaultText}
                                maxLength={maxLength}
                                name={name}
                                min={min}
                                max={max}
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
                                data-isMatched={isMatched}
                                disabled={disabled}
                                checked={checked}
                                {...optionalParams}
                            />
                            {isHidden && <span className="ssn-span">{inputValue && inputValue.replace(new RegExp("[0-9]", "g"), "x")}</span>}
                        </>
                    }
                    
                    {isAmount && <span className="has-amount-sign">$</span>}

                    {isDate && 
                        <DatePicker
                            maxDate={new Date()}
                            className="form-control medium-input"
                            dateFormat="MM/dd/yyyy"
                            placeholderText="MM/DD/YYYY" 
                            renderCustomHeader={({
                                date,
                                changeYear,
                                changeMonth,
                                decreaseMonth,
                                increaseMonth,
                                prevMonthButtonDisabled,
                                nextMonthButtonDisabled
                            }) => (
                            <div
                                style={{
                                margin: 10,
                                display: "flex",
                                justifyContent: "center"
                                }}
                            >
                                <button type='button' onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                    {"<"}
                                </button>
                                <select
                                    value={date.getFullYear()}
                                    onChange={({ target: { value } }) => changeYear(value)}
                                    >
                                    {years.map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={months[date.getMonth()]}
                                    onChange={({ target: { value } }) =>
                                        changeMonth(months.indexOf(value))
                                    }
                                >
                                    {months.map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                <button type='button' onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                    {">"}
                                </button>
                            </div>
                            )}
                            selected={inputValue ? new Date(inputValue) : null}
                            onChange={handleDateInputChange}
                            // customInput={<ExampleCustomInput />}
                            />
                    }

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