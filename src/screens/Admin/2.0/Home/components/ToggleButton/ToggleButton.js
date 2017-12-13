import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export function ToggleButton({ defaultChecked, disabled, onChange }) {
    const [toggle, setToggle] = useState(false);

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
            className={`tcp-toggle ${
                toggle ? 'tcp-toggle--checked' : 'tcp-toggle--unchecked'
            }`}
        >
            <div className="tcp-toggle-container">
                <div className="tcp-toggle-switch" />
                <div className="tcp-toggle-check"> Yes </div>
                <div className="tcp-toggle-uncheck"> No </div>
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
};

ToggleButton.defaultProps = {
    defaultChecked: false,
    disabled: false,
    onChange: () => {},
};
