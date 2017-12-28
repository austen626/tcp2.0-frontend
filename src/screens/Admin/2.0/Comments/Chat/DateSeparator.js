import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export function DateSeparator({ date, className, dateString }) {
    const formatedDate = moment(date).format('dddd MMMM DD, YYYY');
    return (
        <div className={`${className} message-list--date`}>{formatedDate}</div>
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
