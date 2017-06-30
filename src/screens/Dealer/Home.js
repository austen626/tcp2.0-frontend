import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';
import Header from '../../components/Admin/Header';

class HomeScreen extends Component {

    handleHomeClick = () => {
        this.props.history.replace('/')
    }

    handleHomeRedirection = (screen) => {
        switch(screen) {
            case "staff-management":
                this.props.history.push('/dealer/staff');
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
                    <Button  style={{ marginTop: 50, marginBottom: 30 }} onClick={() => this.handleHomeRedirection('staff-management')}>Staff Management</Button>
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