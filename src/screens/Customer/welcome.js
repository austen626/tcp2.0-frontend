import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../components/Dealer/Header';
import { TCPLogo } from '../../assets/images';
import Loader from 'shared/Loader';

import { updateCustomer, getCustomerApiInitiate } from '../../redux/actions/sales';

function AddDealer(props) {

    const {
        history,
        customer,
        getCustomerApiInitiate,
        actionLoading,
        updateCustomer
    } = props;

    useEffect(() => { 
        const customerId = localStorage.getItem('customerId'); 
        getCustomerApiInitiate(customerId) 
    }, [])

    const handleSubmit = evt => {

        evt.preventDefault();
        let temp_customer = {
            ...customer,
        }
        updateCustomer(history, '/basic', temp_customer)
    }

    return (
        <div className="dealer">

            { actionLoading && <Loader />}

            <Header>
                <HeaderLeft></HeaderLeft>
                <HeaderCenter>
                    <div className="header-main">
                        <img className="main-logo" src={TCPLogo} alt="" />
                    </div>
                </HeaderCenter>
                <HeaderRight></HeaderRight>
            </Header>

            <form action="javascript:void(0)" onSubmit={(e) => handleSubmit(e)} noValidate>
                <div className="container">
                    <div className="styled-form">
                        <div className="welcome-text">
                            <p><b>WELCOME!</b><br></br>Sem et tortor consequat id porta. Ullamcorper malesuada proin libero nunc consequat interdum varius sit. Mattis rhoncus urna neque viverra justo nec. Ultricies integer quis auctor elit sed vulputate. Vitae semper quis lectus nulla at volutpat diam.</p>
                        </div>
                    </div>
                </div>
                <div className="footer-container">
                    <button className="secondary" type="submit">Begin</button>
                </div>
            </form>

        </div>
    )
}

const mapStateToProps = state => ({
    customer: state.sales.customer,
    actionLoading: state.sales.actionLoading
});

const mapDispatchToProps = dispatch => ({
    getCustomerApiInitiate: (data) => dispatch(getCustomerApiInitiate(data)),
    updateCustomer: (history, path, data) => dispatch(updateCustomer(history, path, data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDealer);