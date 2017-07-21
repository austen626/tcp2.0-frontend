import React, { useState, useRef, useEffect } from 'react';
import handleAwayClick from './customHooks/handleAwayClick';
// import previousProps from './customHooks/previousProps';
import PropTypes from 'prop-types';

import Button from './button';
import { IconDownArrow } from '../../assets/images';

const Dropdown = ( props ) => {

    const container = useRef( null );

    let {
        name,
        id,
        className = '',
        ariaLabel,
        resetCounter,
        required = false,
        handleChange,
        ariaRequired,
        position = 'top',
        multiple = false,
        label,
        validationResult,
        error,
        defaultValue,
        value,
        options,
        labelTransform = true,
        disabled = false
    } = props;

    id = id || name;

    // Converting the options and the default value to a string to keep the default select behavior
    options && options.map( item => item.value =  item.value.toString());

    if ( multiple ) {

        defaultValue = defaultValue ? defaultValue.map( item => item.toString() ) : [];
    }

    else {

        defaultValue = defaultValue ? defaultValue.toString() : '';
    }

    const previousDefault = defaultValue; //previousProps( defaultValue );

    const ariaLabelledBy = id && `${id}-label`;

    const [ errorLabel, updateErrorLabel ] = useState( null );

    const [ toggle, updateToggle ] = useState( false );

    const [ selectedValue, updateSelected ] = useState( defaultValue || undefined );

    handleAwayClick(container, () => {

        updateToggle( false );
    });

    const getLabel = () => {

        let selectedLabel = label;

        let selectedOption = selectedValue;

        if ( multiple ) {

            selectedLabel = selectedOption && options
                .filter( item => selectedOption.includes( item.value ) )
                .map(( option ) => option.label ).join(',');
        }

        else {

            const filteredItem = selectedOption && options.filter( item => item.value === selectedOption )[0];

            if ( filteredItem ) {

                selectedLabel = filteredItem.label;
            }
        }

        return selectedLabel;
    };

    const handleSelection = evt => {

        const elm = evt.currentTarget;

        let {
            value
        } = elm;

        console.log(value)

        if ( multiple ) {

            const tempArray = selectedValue ? [ ...selectedValue ] : [];

            if ( tempArray.includes( value ) ) {

                const index = selectedValue.indexOf( value );

                tempArray.splice( index, 1 );
            }

            else {

                tempArray.push( value );
            }

            value = tempArray;
        }

        updateSelected( value );

        typeof handleChange === 'function' && handleChange( value, name, evt );

        !multiple && updateToggle( !toggle );

        updateErrorLabel( null );
    };

    const handleSelectionOLD = evt => {

        const elm = evt.currentTarget;

        let {
            id
        } = elm.dataset;

        if ( multiple ) {

            const tempArray = selectedValue ? [ ...selectedValue ] : [];

            if ( tempArray.includes( value ) ) {

                const index = selectedValue.indexOf( value );

                tempArray.splice( index, 1 );
            }

            else {

                tempArray.push( value );
            }

            value = tempArray;
        }

        console.log(value)

        updateSelected( value );

        typeof handleChange === 'function' && handleChange( value, name, evt );

        !multiple && updateToggle( !toggle );

        updateErrorLabel( null );
    };

    const handleToggle = () => {

        updateToggle( !toggle );
    };

    const transformLabel = () => {

        let transform = !multiple && selectedValue;

        if ( multiple && ( defaultValue.length || selectedValue && selectedValue.length ) ) {

            transform = true;
        }

        return transform;
    };

    const isDefaultDifferent = () => {

        let isDifferent = false;

        if ( typeof previousDefault !== 'undefined' && previousDefault !== null ) {

            isDifferent = true;

            if ( multiple && defaultValue ) {

                const previousSorted = previousDefault.slice().sort();

                if ( defaultValue.length === previousSorted.length && defaultValue.slice().sort().every( ( val, idx ) => val === previousSorted[ idx ] ) ) {

                    isDifferent = false;
                }
            }

            else if ( !multiple && defaultValue === previousDefault ) {

                isDifferent = false;
            }
        }

        return isDifferent;
    };

    useEffect(() => {

        if ( validationResult && validationResult[ name ] && error ) {

            const errorType = validationResult[ name ].error;

            const updatedErrorLabel = error[ errorType ] || null;

            if ( selectedValue && selectedValue.length > 0 ) {
                updateErrorLabel(null);
            }
            else {
                updateErrorLabel(updatedErrorLabel);
            }
        }

        else {

            updateErrorLabel( null );
        }

        if ( isDefaultDifferent() ) {

            updateSelected( defaultValue );
        }

    }, [ validationResult, defaultValue ]);

    useEffect(() => {

            updateSelected( value );
        
    }, [ value ]);

    useEffect( () => {
        updateSelected( defaultValue || undefined );
    }, [ resetCounter ] );

    return (
        <div className={`input-holder ${ className } ${errorLabel ? 'has-error' : null}`} ref={ container }>
            <div className='input-container dropdown scrollbar'>
                { label && (
                    <label
                        htmlFor={ id }
                        className={`form-label ${
                            labelTransform && transformLabel() ? 'transform' : labelTransform ? '' : 'no-transform'
                        }`}
                        id={ ariaLabelledBy }>
                        {/* <Button
                            type='button'
                            isDisabled={ disabled }
                            onClick={ handleToggle }>
                            <span dangerouslySetInnerHTML={{ __html: label }} />
                        </Button> */}
                        {label}
                    </label>
                )}
                <div className={`input-field`}>
                    <select
                        id={ id }
                        className={`${ errorLabel ? ' invalid' : ''} ${ selectedValue ? '' : ' empty'}`}
                        // readOnly={ true }
                        onChange={(e) => handleSelection(e)}
                        disabled={ disabled }
                        name={ id }
                        required={ required }
                        aria-required={ ariaRequired }
                        aria-label={ ariaLabel }
                        value={ selectedValue }
                        multiple={ multiple }
                        aria-labelledby={ ariaLabelledBy }>
                        <option value=''>{ label }</option>
                        { options && options.length > 0 && options.map( ( item, idx ) =>
                            <option
                                key={ idx }
                                value={ item.value }
                                data-value={ item.value }>
                                { item.label }
                            </option>
                        )}
                    </select>                  
                    {/* <div className='custom-styles'>                        
                        <Button
                            id={`button-${id}`}
                            role= 'listbox'
                            type= 'button'
                            isDisabled={ disabled }
                            className={`selected-labels ${ toggle ? 'open' : ''}${ errorLabel ? ' invalid' : ''}${ transformLabel() ? '' : ' empty'}`}
                            onClick={ handleToggle }>
                            { getLabel() }                            
                            <span className="select-dropdown" onClick={ handleToggle }>
                                <img className="main-logo" src={IconDownArrow} alt="" />
                            </span>  
                        </Button>
                        { toggle &&
                            <ul className={`options ${ multiple ? 'multiple' : ''} ${ position }`}>
                                { options && options.map( ( item, idx ) =>
                                    <li key={ idx } class={selectedValue && selectedValue == item.value ? 'active' : ''}>
                                        <Button
                                            onClick={ handleSelection }
                                            optionalParams={{
                                                'data-label': item.label,
                                                'data-value': item.value,
                                                'data-id': item.dataId
                                            }}>
                                            { multiple &&
                                                <span className={`checkbox ${ selectedValue && selectedValue.includes( item.value ) ? 'icon-check' : ''}`}></span>
                                            }
                                            { item.label }
                                        </Button>
                                    </li>
                                )}
                            </ul>
                        }
                    </div> */}
                </div>
            </div>
            { errorLabel &&
                <div className='error-label body-copy-secondary'>
                    <span className='icon-info'></span>
                    { errorLabel }
                </div>
            }
        </div>
    );
};

export default Dropdown;

Dropdown.propTypes = {
    name: PropTypes.string,
    ariaLabel: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array
};