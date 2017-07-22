import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../components/Dealer/Header';
import { TCPLogo, IconArrowLeft } from '../../assets/images';
import Loader from 'shared/Loader';

import { customerResponseSubmit } from '../../redux/actions/sales';

function AddDealer(props) {

    const {
        history,
        customer,
        customerResponseSubmit,
        actionLoading
    } = props;

    useEffect(() => { 
        customerResponseSubmit(history, customer) 
    }, [])

    const handleSubmit = evt => {
        evt.preventDefault();
        // alert('Thank you');
    }

    const handleBackScreen = () => {
        history.replace('/customerSummary');
    }

    return (
        <div className="dealer">

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

            { actionLoading ? <Loader /> :

            <form action="javascript:void(0)" onSubmit={(e) => handleSubmit(e)} noValidate>
                <div className="container">
                    <div className="styled-form">
                        <div className="welcome-text">
                            <p><b>THANK YOU</b><br></br>for your application. Someone will be in touch with you. You can close the browser.</p>
                        </div>
                    </div>
                </div>
                <div className="footer-container">
                    <button className="secondary" type="submit">Close</button>
                </div>
            </form>
            
            }

        </div>
    )
}

const mapStateToProps = state => ({
    customer: state.sales.customer,
    actionLoading: state.sales.actionLoading
});

const mapDispatchToProps = dispatch => ({
    customerResponseSubmit: (history, data) => dispatch(customerResponseSubmit(history, data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDealer);