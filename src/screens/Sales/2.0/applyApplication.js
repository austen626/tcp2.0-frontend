import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../../components/Dealer/Header';
import Loader from 'shared/Loader';
import { IconList, IconSend, IconArrowLeft, TCPLogo } from '../../../assets/images';
import { pushNotification } from 'utils/notification';

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

    const [showWarning, setShowWarning] = useState(false);

    const handleCompleteOnDeviceClick = () => {
        if(customer.invite_status == "COMPLETED")
        {
            pushNotification("Credit application already submitted", 'warning', 'TOP_RIGHT', 3000);   
        }
        else
        {
            updateApplicationFilledStatus('in_app', history, '/applyApplicationBasicDetails');
        }
    }

    const handleSendLink = () => {
        setShowWarning(true)
    }

    const handleArrowBack = () => {
        history.replace('/');        
    }   

    const handleClearWithHomeScreen = () => {
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

            <Modal show={showWarning} onHide={() => setShowWarning(false)}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body> If you choose to proceed, your customer will receive an email at the email address you have entered prompting them to press a link that will take them to a secure website where they will be asked to provide information required to submit a credit application. They will also be able to add a co-applicant should they choose to do so.</Modal.Body>
                <Modal.Footer>
                <button class="secondary" onClick={() => {
                    setShowWarning(false);
                    updateApplicationFilledStatus('send_link', null, null);
                    submiCreditApplicationByMail(history, customer);
                }}>
                    Proceed
                </button>
                <button class="secondary" onClick={() => setShowWarning(false)}>
                    Close
                </button>
                </Modal.Footer>
            </Modal>

            <div className="apply-application">

                {!emailValidate && !actionLoading &&
                    <div style={{textAlign:"center"}}>
                        <label className="error-label" style={{marginLeft: 0}}>Invalid email address</label>
                    </div>
                }

                <button autoFocus={true} className="btn button" onClick={() => emailValidate ? handleCompleteOnDeviceClick() : ''}>
                    <div className="icon">
                        <img className="icon-new-customer" src={IconList} alt="new" />
                    </div>
                    <div className="label">Complete Credit Application on this device</div>
                </button>


                <button className="btn button" onClick={() => emailValidate ? handleSendLink() : ''}>
                    <div className="icon">
                        <img className="icon-reorder-customer" src={IconSend} alt="reorder" />
                    </div>
                    <div className="label">Send Credit Application Link to a Customer</div>
                </button>
            </div>

            <div className="footer-container">
                { !actionLoading && <button className="secondary" type="submit" onClick={()=>handleClearWithHomeScreen()}>Cancel</button> }
                { !isCustomerFound && emailValidate &&
                    <button className="secondary" type="submit" onClick={()=>handleClearWithHomeScreen()}>Save & Exit</button>
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