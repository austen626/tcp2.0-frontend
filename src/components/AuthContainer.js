import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import "../assets/css/auth.scss";

class AuthContainer extends Component {
    render() {
        return (
            <div className="auth-center">
                <div className={ this.props.match.path === "/register" ? "register-auth auth-page" : "auth-page" }>
                    <div className="logo">
                        <img
                            src={require('../assets/images/darkLogo.svg')}
                            alt="logo"
                        />
                    </div>
                    <span className="page-title">{this.props.title}</span>
                    {this.props.children}
                </div>
            </div>
            
        )
    }
}

export default withRouter(AuthContainer);