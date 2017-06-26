import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';

import { clearCustomer } from '../redux/actions/customer';

class HomeScreen extends Component {

    onNewCustomer = () => {
        this.props.clearCustomer();
        this.props.history.push('/contact');
    }

    onReorderCustomer = () => {
        this.onNewCustomer();
    }

    onPrequalify = () => {
        this.props.history.push('/prequalify');
    }

    render() {
        return (
            <>
                <Header isHome={true} history={this.props.history} />
                <div className="home">
                    <div className="button" onClick={this.onNewCustomer}>
                        <div className="icon">
                            <img src={require("../assets/images/icon-customer-new.svg")} alt="new" />
                        </div>
                        <div className="label">NEW CUSTOMER</div>
                    </div>
                    <div className="button button-reorder" onClick={this.onReorderCustomer}>
                        <div className="icon">
                            <img src={require("../assets/images/icon-customer-reorder.svg")} alt="reorder" />
                        </div>
                        <div className="label">REORDER CUSTOMER</div>
                    </div>
                    <div className="button button-reorder" onClick={this.onPrequalify}>
                        <div className="icon">
                            <img src={require("../assets/images/icon-customer-prequalify.svg")} alt="pre" />
                        </div>
                        <div className="label">PREQUALIFY</div>
                    </div>
                </div>
            </>
        )
    }
}

export default connect(
    null,
    {
        clearCustomer
    }
)(HomeScreen);