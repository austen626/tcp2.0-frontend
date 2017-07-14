import React from 'react';
import { connect } from 'react-redux';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../../components/Dealer/Header';
import { TCPLogo, IconArrowLeft, IconListWhite, IconStatusComplete, IconStatusSent } from '../../../assets/images';
import Loader from 'shared/Loader';

import { submiCreditApplication, submiCreditApplicationByMain, updateCustomer } from '../../../redux/actions/sales';

function AddDealer(props) {

    const {
        history,
        customer,
        appFillStatus,
        submiCreditApplication,
        submiCreditApplicationByMain,
        actionLoading,
        updateCustomer
    } = props;


    const handleArrowBack = () => {
        if(appFillStatus == "in_app") {
            history.replace('/applyApplicationEmployement');  
        } else {
            history.replace('/applyApplication');  
        }
    }

    const handleAddCoApp = () => {
        let temp_customer = {
            ...customer,
            "co_enabled": true,
        }

        updateCustomer(history, '/applyApplicationBasicDetails', temp_customer) 
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        if(appFillStatus == "in_app") {
            submiCreditApplication(history, customer);
        } else {
            submiCreditApplicationByMain(history, customer);
        }
    }

    return (
        <div className="dealer">

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

            <div className="sub-header">
                {/* <button>
                    <img src={IconContactAcitve} alt=""/> 
                </button> */}
                <button className="active">
                    <img src={IconListWhite} alt=""/> 
                    <span>Summary</span>
                    <span className='arrow-down'></span>
                </button>
            </div>

            <form action="javascript:void(0)" onSubmit={(e) => handleSubmit(e)} noValidate>

                <div className="container black-box">
                    <div className="styled-form">

                        <div className="row other-details summary-row">
                            <div className="col">
                                <span><b>Name: </b> {customer.main_app.name}</span>
                                <span><b>Address: </b> {customer.main_app.street} {customer.main_app.city} {customer.main_app.state} {customer.main_app.zip}</span>
                                <span><b>Email: </b> {customer.main_app.email}</span>
                                <span><b>Phone: </b> {customer.main_app.cell_phone}</span>
                                <span className="status">Credit application</span>
                                {appFillStatus == "in_app" ?                                             
                                    <span className="status-icon status-icon-2">
                                        <img src={IconStatusSent}/>
                                        complete 
                                    </span>
                                    :                                                
                                    <span className="status-icon">
                                        <img src={IconStatusComplete}/>
                                        sent 
                                    </span>
                                }
                            </div>
                            <div className={`col ${!customer.co_enabled ? 'button-col' : ''}`}>

                                {customer.co_enabled ?
                                    <>
                                        <span><b>Name: </b> {customer.co_app.name}</span>
                                        <span><b>Address: </b> {customer.co_app.street} {customer.main_app.city} {customer.main_app.state} {customer.main_app.zip}</span>
                                        <span><b>Email: </b> {customer.co_app.email}</span>
                                        <span><b>Phone: </b> {customer.co_app.cell_phone}</span>
                                        <span className="status">Credit application</span>
                                        {appFillStatus == "in_app" ?                                             
                                            <span className="status-icon status-icon-2">
                                                <img src={IconStatusSent}/>
                                                complete 
                                            </span>
                                            :                                                
                                            <span className="status-icon">
                                                <img src={IconStatusComplete}/>
                                                sent 
                                            </span>
                                        }
                                    </>
                                    :  
                                    appFillStatus == "in_app" ?                                      
                                    <button className="secondary" type="submit" onClick={() => handleAddCoApp()}>Add Co-App</button>
                                    : ''
                                }
                            </div>
                        </div>

                    </div>
                </div>
                <div className="footer-container">
                    <button className="secondary" type="submit">{appFillStatus == "in_app" ? 'I am done' : 'Submit'}</button>
                </div>
            </form>

        </div>
    )
}

const mapStateToProps = state => ({
    appFillStatus: state.sales.appFillStatus,
    customer: state.sales.customer,
    isCustomerFound: state.sales.isCustomerFound,
    actionLoading: state.sales.actionLoading
});

const mapDispatchToProps = dispatch => ({
    submiCreditApplication: (history, data) => dispatch(submiCreditApplication(history, data)),
    submiCreditApplicationByMain: (history, data) => dispatch(submiCreditApplicationByMain(history, data)),
    updateCustomer: (history, path, data) => dispatch(updateCustomer(history, path, data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDealer);