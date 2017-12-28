import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Header, {
    HeaderCenter,
    HeaderLeft,
    HeaderRight,
} from '../../../../components/Dealer/Header';
import { IconArrowLeft } from '../../../../assets/images';
import { MessageList } from './Chat/MessageList';
import { Input } from './Chat/Input';
import { message } from '../../../../shared/constant';

export function Comments({ applicant, history }) {
    const [chatData, setChatData] = useState([]);
    const inputRef = useRef(null);

    const handleArrowBack = () => {
        history.goBack();
    };

    const handleInputKeyDown = (e) => {
        if (e.keyCode === 13) {
            const newChatData = [
                ...chatData,
                {
                    text: e.target.value,
                    date: new Date(),
                    dateString: '2021-10-11',
                    user: applicant,
                    position: 'right',
                },
            ];
            setChatData(newChatData);
        }
    };

    useEffect(() => {
        // TODO: Load chat messages
        const newChatData = [
            {
                text: 'Hello',
                date: new Date(2021, 10, 5),
                dateString: '2021-10-5',
                user: {
                    id: 1234,
                    name: 'Bob',
                },
            },
            {
                text: 'Hi',
                date: new Date(2021, 10, 5),
                dateString: '2021-10-5',
                user: {
                    id: 1235,
                    name: 'Shrunk',
                },
            },
            {
                text: "Let's add some sauce into this chat!",
                date: new Date(),
                dateString: '2021-10-11',
                user: applicant,
                status: 'read',
            },
            {
                text: 'Hi',
                date: new Date(),
                dateString: '2021-10-11',
                user: applicant,
                status: 'received',
            },
            {
                text: 'This is admin',
                date: new Date(),
                dateString: '2021-10-11',
                user: applicant,
            },
        ];
        setChatData(newChatData);
    }, []);

    return (
        <div className="admin">
            <Header>
                <HeaderLeft>
                    <img src={IconArrowLeft} onClick={handleArrowBack} alt="" />
                </HeaderLeft>
                <HeaderCenter>
                    <div className="header-main">
                        {applicant.first_name} {applicant.last_name}
                    </div>
                </HeaderCenter>
                <HeaderRight />
            </Header>
            <MessageList dataSource={chatData} user={applicant} />
            <div className="footer-container p-3">
                <Input
                    ref={inputRef}
                    placeholder="Type a message"
                    onKeyDown={handleInputKeyDown}
                />
            </div>
        </div>
    );
}

Comments.propTypes = {
    applicant: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};
