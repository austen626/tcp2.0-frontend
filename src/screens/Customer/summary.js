import React from 'react';
import { connect } from 'react-redux';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../components/Dealer/Header';
import { TCPLogo, IconArrowLeft, IconListWhite, IconStatusComplete, IconStatusSent } from '../../assets/images';
import Loader from 'shared/Loader';

import { updateCustomer } from '../../redux/actions/sales';

function AddDealer(props) {

    const {
        history,
        customer,
        actionLoading,
        updateCustomer,
    } = props;

    const handleAddCoApp = () => {
        let temp_customer = {
            ...customer,
            "co_enabled": true,
        }
        updateCustomer(history, '/basic', temp_customer) 
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        history.replace('/thankyou');  
    }

    const handleBackScreen = () => {
        history.replace('/employement');        
    }

    return (
        <div className="dealer">

            { actionLoading && <Loader />}

            <Header>
                <HeaderLeft>
                    <img src={IconArrowLeft} onClick={() => handleBackScreen()} alt="" />
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
                                <span className="status-icon">
                                    <img src={IconStatusSent}/>
                                    sent 
                                </span>
                            </div>
                            <div className={`col ${!customer.co_enabled ? 'button-col' : null}`}>

                                {customer.co_enabled ?
                                    <>
                                        <span><b>Name: </b> {customer.co_app.name}</span>
                                        <span><b>Address: </b> {customer.co_app.street} {customer.main_app.city} {customer.main_app.state} {customer.main_app.zip}</span>
                                        <span><b>Email: </b> {customer.co_app.email}</span>
                                        <span><b>Phone: </b> {customer.co_app.cell_phone}</span>
                                        <span className="status">Credit application</span>                                               
                                        <span className="status-icon">
                                            <img src={IconStatusSent}/>
                                            sent 
                                        </span>
                                    </>
                                    :                                       
                                    <button className="secondary" type="submit" onClick={() => handleAddCoApp()}>Add Co-App</button>
                                }
                            </div>
                        </div>

                    </div>
                </div>
                <div className="footer-container">
                    <button className="secondary" type="submit">I am done</button>
                </div>
            </form>

        </div>
    )
}

const mapStateToProps = state => ({
    customer: state.sales.customer,
    isCustomerFound: state.sales.isCustomerFound,
    actionLoading: state.sales.actionLoading
});

const mapDispatchToProps = dispatch => ({
    updateCustomer: (history, path, data) => dispatch(updateCustomer(history, path, data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDealer);