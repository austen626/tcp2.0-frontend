import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';
import Header from '../../components/Admin/Header';
// import { IconHome } from '../../assets/images';

class HomeScreen extends Component {

    handleHomeClick = () => {
        this.props.history.replace('/')
    }

    handlePreApprovalsClick = () => {
        this.props.history.push('/admin/preapprovals');
    }

    handlePrendingApplicationClick = () => {
        this.props.history.push('/admin/pendingApplications');
    }

    handleRequestFundingsClick = () => {
        this.props.history.push('/admin/fundings');
    }

    handleHomeRedirection = (screen) => {
        switch(screen) {
            case "dealer-management":
                this.props.history.push('/admin/dealers');
                break;
            case "main":
                this.props.history.push('/admin/main');
                break;
            default:
                this.props.history.push('/');
                break;
        }
    }











    render() {
        return (
            <div className="dealer">
                <Header isHome={true} history={this.props.history} avatar={this.props.avatar} className="home-header"></Header>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    {/* <Button style={{ marginTop: 50, marginBottom: 30 }} onClick={this.handlePreApprovalsClick}>Manage Pre Approvals</Button>
                    <Button style={{ marginBottom: 30 }} onClick={this.handlePrendingApplicationClick}>Manage Contracts/Applications</Button>
                    <Button onClick={this.handleRequestFundingsClick}>View Funding Requests</Button> */}
                    <Button  style={{ marginTop: 50, marginBottom: 30 }} onClick={() => this.handleHomeRedirection('dealer-management')}>Dealer Management</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

export default connect(
    mapStateToProps,
    {

    }
)(HomeScreen);
