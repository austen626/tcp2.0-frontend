import React from 'react';

// export default function Checkbox(props) {
//     const { checked, disabled, onChange, label } = props;
//     return (
//         <div className="my__checkbox">
//             <label>
//                 <input 
//                     type="checkbox"
//                     checked={checked}
//                     disabled={disabled}
//                     onChange={onChange}
//                 />
//                 <span/>
//             </label>
//             <span className="label">{label}</span>
//         </div>
//     )
// }

export default function Checkbox(props) {
    const { checked, disabled, onChange, label } = props;
    return (
        <div style={ disabled ? {} : { cursor: 'pointer' }} onClick={disabled ? null : onChange}>
            { checked ? (
                <img
                    src={require('../assets/images/tickChecked.svg')}
                    alt="check"
                    style={{ width: 30, height: 30 }}
                />
            ) : (
                <img
                    src={require('../assets/images/tickEmpty.svg')}
                    alt="check"
                    style={{ width: 30, height: 30 }}
                />
            ) }
            <span style={{
                fontSize: 16,
                color: '#cddbe8',
                marginLeft: 5,
                position: 'relative',
                top: 2
            }}>{label}</span>
        </div>
    )
}

export const AuthCheckbox = (props) => {
    return (
        <div className="custom-checkbox" onClick={props.onClick}>
            <div className="checkbox">
                { props.checked && <div className="fill"></div>}
            </div>
            <span className="noselect">{props.label}</span>
        </div>
    )
}

export const Radio = (props) => {
    return (
        <div className="custom-radio" onClick={props.onChangeValue}>
            <div className="radio">
                { props.checked && (
                    <div className="radio-checked"></div>
                ) }
            </div>
            <div className="radio-label">{props.label}</div>
        </div>
    )
}

export const RadioGroup = (props) => {
    const { options, value, onChangeValue } = props;
    return (
        <>
            { options.map(option => (
                <Radio key={option.value} label={option.label} checked={value === option.value} onChangeValue={() => onChangeValue(option.value)} />
            )) }
        </>
    )
}