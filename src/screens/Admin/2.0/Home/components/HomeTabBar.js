import { SliderContainer, SliderItem } from '../../../style';
import PropTypes from 'prop-types';
import React from 'react';

export function HomeTabBar({ activeTab, onClickTab, badges }) {
    return (
        <div className="footer-container p-3">
            <SliderContainer>
                <SliderItem
                    className="col-6"
                    active={activeTab === 0}
                    onClick={() => onClickTab(0)}
                >
                    <div className="slider-item--left">
                        <span className="badge-icon">{badges[0]}</span>
                    </div>
                    Review
                </SliderItem>
                <SliderItem
                    className="col-6"
                    active={activeTab === 1}
                    onClick={() => onClickTab(1)}
                >
                    Funding
                    <div className="slider-item--right">
                        <span className="badge-icon">{badges[1]}</span>
                    </div>
                </SliderItem>
            </SliderContainer>
        </div>
    );
}

HomeTabBar.propTypes = {
    activeTab: PropTypes.number,
    onClickTab: PropTypes.func,
    badges: PropTypes.array.isRequired,
};
