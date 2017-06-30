import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { pushNotification } from 'utils/notification';
import { message } from 'shared/constant';
import { TCPLogo, IconProfile, IconLogout } from '../../assets/images';

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

    onOpenMenu = () => {
        this.setState({ menuOpen: true });
    }

    renderAvatar = () => {
        const { isHome } = this.props;
        if (!isHome) {
            return null;
        }
        const { avatar } = this.props;
        if (!avatar || avatar === "") {
            return (
                <div className="header-avatar" onClick={this.onOpenMenu} ></div>
            )
        }
        return (
            <img
                className="header-avatar"
                alt=""
                src={avatar}
                onClick={this.onOpenMenu}
            />
        )
    }

    render() {
        const { children, className } = this.props;
        return (
            <div className={`${className} header`}>
                <div className="header-main">
                    <img
                        src={TCPLogo}
                        alt="logo"
                        className="main-logo"
                        // onClick={() => history.replace('/')}
                    />
                    { children }
                </div>

                <div className="header-menu" ref={this.menuContent}>
                    { this.renderAvatar() }
                    { this.state.menuOpen && (
                        <div className="header-menu-content">
                            <div style={{ height: 3, backgroundColor: '#b2d8f7' }}></div>
                            <Row>
                                <div className="profile-btn" onClick={this.onProfile}>
                                    <img alt="profile" src={IconProfile} />
                                    <span>Profile</span>
                                </div>
                                <div className="logout-btn" onClick={this.onLogout}>
                                    <img alt="profile" src={IconLogout} />
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