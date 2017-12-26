import React from 'react';
import PropTypes from 'prop-types';
import Header, {
    HeaderCenter,
    HeaderLeft,
    HeaderRight,
} from '../../../../components/Dealer/Header';
import { IconArrowLeft } from '../../../../assets/images';
import { Input } from './Chat/Input';

export function Comments({ applicant, history }) {
    const handleArrowBack = () => {
        history.goBack();
    };

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
            <div className="footer-container p-3">
                <Input placeholder="Type a message" />
            </div>
        </div>
    );
}

Comments.propTypes = {
    applicant: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};
