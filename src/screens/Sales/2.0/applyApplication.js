import React, { useState } from 'react';
import { connect } from 'react-redux';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../../components/Dealer/Header';
import Loader from 'shared/Loader';
import { IconList, IconSend, IconArrowLeft, TCPLogo } from '../../../assets/images';

import { updateApplicationFilledStatus, resetCustomerSearchApiInitiate, submiCreditApplicationByMail } from '../../../redux/actions/sales';

function HomeScreen(props) {

    const {
        history,
        customer,
        actionLoading,
        isCustomerFound,
        emailValidate,
        updateApplicationFilledStatus,
        resetCustomerSearchApiInitiate,
        submiCreditApplicationByMail    
    } = props;

    const handleCompleteOnDeviceClick = () => {
        updateApplicationFilledStatus('in_app', history, '/applyApplicationBasicDetails');
    }

    const handleSendLink = () => {
        updateApplicationFilledStatus('send_link', null, null);
        submiCreditApplicationByMail(history, customer);
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

            { actionLoading && <Loader />}

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

                {!emailValidate && !actionLoading &&
                    <div style={{textAlign:"center"}}>
                        <label className="error-label" style={{marginLeft: 0}}>Invalid email address</label>
                    </div>
                }

                <div className="button" onClick={() => emailValidate ? handleCompleteOnDeviceClick() : ''}>
                    <div className="icon">
                        <img className="icon-new-customer" src={IconList} alt="new" />
                    </div>
                    <div className="label">Complete Credit Application on this device</div>
                </div>
                <div className="button" onClick={() => emailValidate ? handleSendLink() : ''}>
                    <div className="icon">
                        <img className="icon-reorder-customer" src={IconSend} alt="reorder" />
                    </div>
                    <div className="label">Send Credit Application Link to a Customer</div>
                </div>
            </div>

            <div className="footer-container">
                { !actionLoading && <button className="secondary" type="submit" onClick={()=>handleHomeScreen()}>Cancel</button> }
                { !isCustomerFound && emailValidate &&
                    <button className="secondary" type="submit" onClick={()=>handleHomeScreen()}>Save & Exit</button>
                }
            </div>

        </div>
    )
}

const mapStateToProps = state => ({    
    customer: state.sales.customer,
    actionLoading: state.sales.actionLoading,
    isCustomerFound: state.sales.isCustomerFound,
    emailValidate: state.sales.emailValidate
});

const mapDispatchToProps = dispatch => ({
    updateApplicationFilledStatus: (data, history, path) => dispatch(updateApplicationFilledStatus(data, history, path)),
    resetCustomerSearchApiInitiate: () => dispatch(resetCustomerSearchApiInitiate()),
    submiCreditApplicationByMail: (history, data) => dispatch(submiCreditApplicationByMail(history, data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);