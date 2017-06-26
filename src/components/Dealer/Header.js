import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';

import { TCPLogo, IconProfile, IconLogout } from '../../assets/images';

export const HeaderLogo = () => (
    <img src={TCPLogo} width={37} height={51} />
)

export const HeaderLeft = props => {
    return (
        <div className="header-left">
            { props.children }
        </div>
    )
}

export const HeaderCenter = props => {
    return (
        <div className="header-center">
            { props.children }
        </div>
    )
}

export const HeaderRight = props => {
    return (
        <div className="header-right">
            { props.children }
        </div>
    )
}

class Header extends Component {

    render() {
        const { children } = this.props;
        return (
            <div className="header">
                { children }
            </div>
        )
    }
}

export default Header;