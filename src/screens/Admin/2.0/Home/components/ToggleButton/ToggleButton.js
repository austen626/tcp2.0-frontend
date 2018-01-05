import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export function ToggleButton({
    defaultChecked,
    disabled,
    onChange,
    className,
    yesText,
    noText,
}) {
    const [toggle, setToggle] = useState(defaultChecked);

    const triggerToggle = () => {
        if (disabled) {
            return;
        }
        setToggle(!toggle);
        onChange(toggle);
    };

    useEffect(() => {
        setToggle(defaultChecked);
    }, [defaultChecked]);

    return (
        <div
            onClick={triggerToggle}
            className={`${className} tcp-toggle ${
                toggle ? 'tcp-toggle--checked' : 'tcp-toggle--unchecked'
            }`}
        >
            <div className="tcp-toggle-container">
                <div className="tcp-toggle-switch" />
                <div className="tcp-toggle-check"> {yesText} </div>
                <div className="tcp-toggle-uncheck"> {noText} </div>
            </div>
            <input
                className="tcp-toggle-input"
                type="checkbox"
                aria-label="Toggle Button"
            />
        </div>
    );
}

ToggleButton.propTypes = {
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    yesText: PropTypes.string,
    noText: PropTypes.string,
};

ToggleButton.defaultProps = {
    className: '',
    defaultChecked: false,
    disabled: false,
    onChange: () => {},
    yesText: 'Yes',
    noText: 'No',
};
