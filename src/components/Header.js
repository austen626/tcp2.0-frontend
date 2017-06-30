import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';

class Header extends Component {
    menuContent = React.createRef();
    state = {
        menuOpen: false
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.menuContent && this.menuContent.current && !this.menuContent.current.contains(event.target)) {
            this.setState({ menuOpen: false });
        }
    }

    onProfile = () => {
        this.props.history.replace('/profile');
    }

    onLogout = () => {
        localStorage.removeItem('token');
        this.props.history.replace('/login');
    }

    render() {
        const { isHome, history, children } = this.props;
        return (
            <div className="header">
                <div className="header-main">
                    <img
                        src={require('../assets/images/TCPlogo.svg')}
                        alt="logo"
                        className="main-logo"
                        onClick={() => history.replace('/')}
                    />
                    { children }
                </div>

                <div className="header-menu" ref={this.menuContent}>
                    { isHome && (
                        <img
                            className="header-avatar"
                            alt="avatar"
                            src={require('../assets/images/fake-person.jpg')}
                            onClick={() => this.setState({ menuOpen: true })}
                        />
                    ) }
                    { this.state.menuOpen && (
                        <div className="header-menu-content">
                            <div style={{ height: 3, backgroundColor: '#b2d8f7' }}></div>
                            <Row>
                                <div className="profile-btn" onClick={this.onProfile}>
                                    <img alt="profile" src={require('../assets/images/icon-profile.svg')} />
                                    <span>Profile</span>
                                </div>
                                <div className="logout-btn" onClick={this.onLogout}>
                                    <img alt="profile" src={require('../assets/images/icon-logout.svg')} />
                                    <span>Logout</span>
                                </div>
                            </Row>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Header;