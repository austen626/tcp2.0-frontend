import React from 'react';
import PropTypes from 'prop-types';
import {
    IconDoubleCheckIcon,
    IconSingleCheckIcon,
} from '../../../../../assets/images';
import moment from 'moment';

export function MessageBox({
    position,
    type,
    text,
    data,
    date,
    dateString,
    status,
    notch,
}) {
    const formatDate = (date) => {
        return moment(date).format('h:mm A');
    };

    return (
        <div className={`message-box ${position} ${notch ? 'notched' : ''}`}>
            <div className="message-box--text">{text}</div>
            <div className="message-box--date">
                {formatDate(date)} &nbsp;
                <span className="ml-1">
                    {status === 'received' && <img src={IconSingleCheckIcon} />}
                    {status === 'read' && <img src={IconDoubleCheckIcon} />}
                </span>
            </div>
        </div>
    );
}

MessageBox.propTypes = {
    position: PropTypes.string.isRequired,
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
    dateString: PropTypes.object.isRequired,
    data: PropTypes.object,
    status: PropTypes.string,
    notch: PropTypes.bool,
};

MessageBox.defaultProps = {
    type: 'text',
    status: 'sent',
    data: null,
    notch: true,
};
