import PropTypes from 'prop-types';
import React from 'react';
import { MessageBox } from './MessageBox';
import { DateSeparator } from './DateSeparator';

export function MessageList({ dataSource, className, user }) {
    let today = new Date();
    const GROUPING_SPAN = 300000;

    const isSameDay = (dateA, dateB) => {
        return !(
            dateA.getFullYear() !== dateB.getFullYear() ||
            dateA.getMonth() !== dateB.getMonth() ||
            dateA.getDate() !== dateB.getDate()
        );
    };

    const isMe = (targetUser) => {
        return targetUser.id === user.id;
    };

    return (
        <div className="{className} message-list">
            {dataSource.map((message, index) => {
                const previousMessage =
                    index > 0 ? dataSource[index - 1] : null;
                let userName = <></>;
                let dateSeparator = <></>;
                let notch = false;

                if (
                    (previousMessage === null &&
                        !isSameDay(message.date, today)) ||
                    (previousMessage !== null &&
                        !isSameDay(message.date, previousMessage.date))
                ) {
                    dateSeparator = (
                        <DateSeparator
                            date={message.date}
                            dateString={message.dateString}
                        />
                    );
                    notch = true;
                }

                if (
                    (previousMessage === null ||
                        previousMessage.user.id !== message.user.id) &&
                    !isMe(message.user)
                ) {
                    userName = (
                        <div className="message-list--username">
                            {message.user.name}
                        </div>
                    );
                    notch = true;
                }

                if (
                    previousMessage !== null &&
                    message.date - previousMessage.date > GROUPING_SPAN
                ) {
                    notch = true;
                }

                return (
                    <>
                        {dateSeparator}
                        <div className="message-list--item">
                            {userName}
                            <MessageBox
                                key={message}
                                {...message}
                                position={
                                    message.user.id === user.id
                                        ? 'right'
                                        : 'left'
                                }
                                notch={notch}
                            />
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
    user: PropTypes.object.isRequired,
};

MessageList.defaultProps = {
    className: '',
};
