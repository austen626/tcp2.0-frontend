import { IconMenu } from '../../../../assets/images';
import React, { useState } from 'react';

export function SideMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = (e) => {
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <>
            <img
                className="icon-menu"
                src={IconMenu}
                onClick={handleMenuClick}
                alt=""
            />
            {isMenuOpen && (
                <div className="nav-menu-overlay" onClick={handleMenuClick} />
            )}
            <nav className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
                <div className="nav-menu-header">
                    <button className="menu-close" onClick={handleMenuClick}>
                        x
                    </button>
                    Admin Name
                </div>
                <div className="nav-menu-content">
                    <ul className="nav-menu-items" onClick={handleMenuClick}>
                        <li>Dealers Management</li>
                        <li>History</li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
