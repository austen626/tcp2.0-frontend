import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Sales/Header';
import { getMe } from '../../redux/actions/auth';
import { getUserDetails } from '../../redux/actions/userAction';
import { clearCustomer, changeCustomer } from '../../redux/actions/customer';

import { IconHome, IconCustomerNew, IconCustomerReorder, IconCustomerHistory } from '../../assets/images';

class HomeScreen extends Component {

    componentDidMount = () => {
        this.props.getMe();
        this.props.getUserDetails()
    }

    onNewCustomer = () => {
        this.props.clearCustomer();
        this.props.changeCustomer({ order_type: 1 });
        this.props.history.push('/contact');
    }

    onReorderCustomer = () => {
        this.props.clearCustomer();
        this.props.changeCustomer({ order_type: 2 });
        this.props.history.push('/reorder');
    }

    onPrequalify = () => {
        this.props.history.push('/prequalify');
    }

    handleHomeClick = () => {
        this.props.history.replace('/');
    }

    render() {
        return (
            <div className="sales">
                <Header isHome={true} history={this.props.history} avatar={this.props.avatar}>
                    {localStorage.getItem('role') && localStorage.getItem('role').indexOf('dealer') !== -1 &&
                        <img src={IconHome} alt="home" className="icon-home" onClick={this.handleHomeClick} />
                    }
                </Header>
                <div className="home">
                    <div className="button" onClick={this.onNewCustomer}>
                        <div className="icon">
                            <img className="icon-new-customer" src={IconCustomerNew} alt="new" />
                        </div>
                        <div className="label">NEW CUSTOMER</div>
                    </div>
                    <div className="button button-reorder" onClick={this.onReorderCustomer}>
                        <div className="icon">
                            <img className="icon-reorder-customer" src={IconCustomerReorder} alt="reorder" />
                        </div>
                        <div className="label">REORDER CUSTOMER</div>
                    </div>
                    {/* <div className="button button-reorder" onClick={this.onPrequalify}>
                        <div className="icon">
                            <img className="icon-prequalify" src={IconCustomerPre} alt="pre" />
                        </div>
                        <div className="label">PREQUALIFY</div>
                    </div> */}
                    <div className="button button-reorder">
                        <div className="icon">
                            <img className="icon-prequalify" src={IconCustomerHistory} alt="history" />
                        </div>
                        <div className="label">HISTORY</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    avatar: state.auth.avatar
});

export default connect(
    mapStateToProps,
    {
        getMe,
        changeCustomer,
        clearCustomer,
        getUserDetails,
    }
)(HomeScreen);