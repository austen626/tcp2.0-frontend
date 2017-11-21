import React from 'react';
import PropTypes from 'prop-types';
import { SliderContainer, SliderItem } from '../../../style';

export default function CustomerTabBar({ activeTab, onClickTab }) {
    return (
        <div className="footer-container p-3">
            <SliderContainer>
                <SliderItem
                    className="col-3"
                    active={activeTab === 0}
                    onClick={() => onClickTab(0)}
                >
                    Profile
                </SliderItem>
                <SliderItem
                    className="col-3"
                    active={activeTab === 1}
                    onClick={() => onClickTab(1)}
                >
                    Credit
                </SliderItem>
                <SliderItem
                    className="col-3"
                    active={activeTab === 2}
                    onClick={() => onClickTab(2)}
                >
                    History
                </SliderItem>
                <SliderItem
                    className="col-3"
                    active={activeTab === 3}
                    onClick={() => onClickTab(3)}
                >
                    Paperwork
                </SliderItem>
            </SliderContainer>
        </div>
    );
}

CustomerTabBar.propTypes = {
    activeTab: PropTypes.number.isRequired,
    onClickTab: PropTypes.func.isRequired,
};
