import React from 'react';
import PropTypes from 'prop-types';

export function DateSeparator({ date, className, dateString }) {
    return (
        <div className={`${className} message-list--date`}>{dateString}</div>
    );
}

DateSeparator.propTypes = {
    className: PropTypes.string,
    date: PropTypes.object.isRequired,
    dateString: PropTypes.object.isRequired,
};

DateSeparator.defaultProps = {
    className: '',
};
