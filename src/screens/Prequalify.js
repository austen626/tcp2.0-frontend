import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import Header from '../components/Header';
import Footer from '../components/Footer';

class PrequalifyScreen extends Component {

    onBack = () => {
        this.props.history.goBack();
    }

    onSend = () => {

    }

    render() {
        return (
            <>
                <Header history={this.props.history}>
                    <img src={require('../assets/images/icon-back.svg')} alt="back" className="icon-back" onClick={this.onBack} />
                </Header>
                <div style={{
                    height: 64,
                    marginTop: 5,
                    backgroundColor: '#009e87',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                    paddingTop: 14
                }}>
                    PREQUALIFY
                </div>
                <Footer>
                    <Button className="button" onClick={this.onSend}>SEND</Button>
                </Footer>
            </>
        )
    }
}

export default connect(
    null,
    {
        
    }
)(PrequalifyScreen);