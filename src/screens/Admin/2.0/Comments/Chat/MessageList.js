import PropTypes from 'prop-types';
import React from 'react';
import { MessageBox } from './MessageBox';
import { DateSeparator } from './DateSeparator';

export function MessageList({ dataSource, className }) {
    let currentDate = new Date();
    let currentUser = null;

    const isSameDay = (dateA, dateB) => {
        return !(
            dateA.getFullYear() !== dateB.getFullYear() ||
            dateA.getMonth() !== dateB.getMonth() ||
            dateA.getDate() !== dateB.getDate()
        );
    };

    return (
        <div className="{className} message-list">
            {dataSource.map((message, index) => {
                let userName = <></>;
                let dateSeparator = <></>;

                if (currentUser == null || currentUser.id !== message.user.id) {
                    currentUser = message.user;
                    if (message.position === 'left') {
                        userName = (
                            <span className="message-list--username">
                                {currentUser.name}
                            </span>
                        );
                    }
                }

                if (!isSameDay(message.date, currentDate)) {
                    currentDate = message.date;
                    dateSeparator = (
                        <DateSeparator
                            date={message.date}
                            dateString={message.dateString}
                        />
                    );
                }

                return (
                    <>
                        {dateSeparator}
                        <div className="message-list--item">
                            {userName}
                            <MessageBox key={message} {...message} />
                        </div>
                    </>
                );
            })}
        </div>
    );
}

MessageList.propTypes = {
    className: PropTypes.string,
    dataSource: PropTypes.array.isRequired,
};

MessageList.defaultProps = {
    className: '',
};

