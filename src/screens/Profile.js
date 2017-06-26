import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Form } from 'react-bootstrap';

import Header from '../components/Header';
import Footer from '../components/Footer';

class ProfileScreen extends Component {
    state = {
        fullname: '',
        mobile: '',
    }

    render() {
        const { fullname, mobile } = this.state;
        return (
            <>
                <Header isHome={true} history={this.props.history} />
                <div id="profile-page">
                    <div className="header2">
                        <img alt="profile" src={require('../assets/images/icon-profile-active.png')} />
                        Profile
                    </div>
                    <div className="container">
                        <Form.Group className="avatar-group">                            
                            <img alt="avatar" src={require('../assets/images/icon-profile-user-empty.svg')} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                required
                                value={fullname}
                                onChange={e => this.setState({fullname: e.target.value}) }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                required
                                value={mobile}
                                onChange={e => this.setState({mobile: e.target.value}) }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button className="change-password">CHANGE PASSWORD</Button>
                        </Form.Group>
                    </div>
                </div>
                <Footer>
                    <Button type="submit" className="button">SAVE</Button>
                </Footer>
            </>
        )
    }
}

export default connect(
    null,
    {
        
    }
)(ProfileScreen);