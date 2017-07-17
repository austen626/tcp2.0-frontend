import React, { useState } from 'react';
import { connect } from 'react-redux';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../../components/Dealer/Header';
import Loader from 'shared/Loader';
import { IconList, IconSend, IconArrowLeft, TCPLogo } from '../../../assets/images';

import { updateApplicationFilledStatus, resetCustomerSearchApiInitiate } from '../../../redux/actions/sales';

function HomeScreen(props) {

    const {
        history,
        updateApplicationFilledStatus,
        resetCustomerSearchApiInitiate      
    } = props;

    const handleCompleteOnDeviceClick = () => {
        updateApplicationFilledStatus('in_app', history, '/applyApplicationBasicDetails');
    }

    const handleSendLink = () => {
        updateApplicationFilledStatus('send_link', history, '/applyApplicationSummary');
    }

    const handleArrowBack = () => {
        history.replace('/applyHome');        
    }

    const handleHomeScreen = () => {
        resetCustomerSearchApiInitiate(false)
        history.replace('/applyHome');        
    }

    return (
        <div className="sales dealer">

            <Header>
                <HeaderLeft>
                    <img src={IconArrowLeft} onClick={() => handleArrowBack()} alt="" />
                </HeaderLeft>
                <HeaderCenter>
                    <div className="header-main">
                        <img className="main-logo" src={TCPLogo} alt="" />
                    </div>
                </HeaderCenter>
                <HeaderRight></HeaderRight>
            </Header>

            <div className="apply-application">
                <div className="button" onClick={() => handleCompleteOnDeviceClick()}>
                    <div className="icon">
                        <img className="icon-new-customer" src={IconList} alt="new" />
                    </div>
                    <div className="label">Complete Credit Application on this device</div>
                </div>
                <div className="button" onClick={() => handleSendLink()}>
                    <div className="icon">
                        <img className="icon-reorder-customer" src={IconSend} alt="reorder" />
                    </div>
                    <div className="label">Send Credit Application Link to a Customer</div>
                </div>
            </div>

            <div className="footer-container">
                <button className="secondary" type="submit" onClick={()=>handleHomeScreen()}>Cancel</button>
                <button className="secondary" type="submit" onClick={()=>handleHomeScreen()}>Save & Exit</button>
            </div>

        </div>
    )
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    updateApplicationFilledStatus: (data, history, path) => dispatch(updateApplicationFilledStatus(data, history, path)),
    resetCustomerSearchApiInitiate: () => dispatch(resetCustomerSearchApiInitiate()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);