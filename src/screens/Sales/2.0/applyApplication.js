import React, { useState } from 'react';
import { connect } from 'react-redux';
import Header from '../../../components/Sales/Header';
import { Form } from 'react-bootstrap';
import Input from '../../../components/commons/input';
import Loader from 'shared/Loader';
import { IconHome, IconList, IconSend } from '../../../assets/images';

function HomeScreen(props) {

    const {
        history,
        avatar,
        actionLoading,
    } = props;

    const handleHomeClick = () => {
        this.props.history.replace('/');
    }

    const handleCompleteOnDeviceClick = () => {
        history.replace('/applyApplicationBasicDetails');
    }

    const handleNextClick = () => {
        history.replace('/applyApplication');
    }

    return (
        <div className="sales">

            { actionLoading && <Loader />}

            <Header isHome={true} history={history} avatar={avatar}>
                {localStorage.getItem('role') && localStorage.getItem('role').indexOf('dealer') !== -1 &&
                    <img src={IconHome} alt="home" className="icon-home" onClick={()=>handleHomeClick()} />
                }
            </Header>

            <div className="apply-application">
                <div className="button" onClick={() => handleCompleteOnDeviceClick()}>
                    <div className="icon">
                        <img className="icon-new-customer" src={IconList} alt="new" />
                    </div>
                    <div className="label">Complete Credit Application on this device</div>
                </div>
                <div className="button">
                    <div className="icon">
                        <img className="icon-reorder-customer" src={IconSend} alt="reorder" />
                    </div>
                    <div className="label">Send Credit Application Link to a Customer</div>
                </div>
            </div>
            

        </div>
    )
}

const mapStateToProps = state => ({
    avatar: state.auth.avatar
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);