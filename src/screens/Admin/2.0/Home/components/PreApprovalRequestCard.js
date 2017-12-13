import { Row, Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import Dropdown from '../../../../../components/commons/dropdown';
import {
    CalendarContainer,
    StatusChoice,
    StatusText,
    TierSelect,
} from '../../../style';
import {
    CircleStatusIcon,
    HexagonStatusIcon,
    TriangleStatusIcon,
} from './StatusIcons';
import DatePicker from 'react-datepicker';
import { ToggleButton } from './ToggleButton/ToggleButton';

export function PreApprovalRequestCard({ customer }) {
    const tierOptions = [
        { label: 1, value: 1 },
        { label: 2, value: 2 },
        { label: 3, value: 3 },
        { label: 4, value: 4 },
        { label: 5, value: 5 },
        { label: 6, value: 6 },
        { label: 7, value: 7 },
        { label: 8, value: 8 },
        { label: 9, value: 9 },
        { label: 10, value: 10 },
    ];

    const {
        food_tier: foodTier,
        food_review_mode: foodReviewMode,
        food_status: foodStatus,
        food_date: foodDate,
    } = customer;

    const handleFoodDateChange = (date) => {};

    return (
        <div className="preapproval-request-card">
            <div className="request-wrapper">
                <div className="request-title">
                    <label>PRODUCT/SERVICE:</label>
                    <span className="product-name">Food</span>
                </div>
                <Row>
                    <Col>
                        <TierSelect className="tier-input">
                            <label>Price Tier:</label>
                            <Dropdown
                                value={foodTier}
                                defaultValue={foodTier}
                                options={tierOptions}
                            />
                        </TierSelect>
                    </Col>
                    <Col>
                        <label>Earliest delivery date: </label>
                        <CalendarContainer>
                            <DatePicker
                                selected={foodDate}
                                onChange={handleFoodDateChange}
                                minDate={new Date()}
                                className="calendar-approve"
                                dateFormat="MM/dd/yyyy"
                                placeholderText="MM/DD/YYYY"
                            />
                        </CalendarContainer>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <StatusChoice>
                            <CircleStatusIcon
                                symbol="P"
                                fill={foodReviewMode === 'auto'}
                                disabled={foodStatus !== 'approval'}
                            />
                            <StatusText>Approve</StatusText>
                        </StatusChoice>
                    </Col>
                    <Col>
                        <StatusChoice>
                            <TriangleStatusIcon
                                symbol="P"
                                fill={foodReviewMode === 'auto'}
                                disabled={foodStatus !== 'in_process'}
                            />
                            <StatusText>Req.Review</StatusText>
                        </StatusChoice>
                    </Col>
                    <Col>
                        <StatusChoice>
                            <HexagonStatusIcon
                                symbol="P"
                                fill={foodReviewMode === 'auto'}
                                disabled={foodStatus !== 'rejection'}
                            />
                            <StatusText>Decline</StatusText>
                        </StatusChoice>
                    </Col>
                </Row>
            </div>
            <div className="request-wrapper">
                <div className="request-title">
                    <label className="">PRODUCT/SERVICE:</label>
                    <span className="product-name">Other</span>
                </div>
                <Row>
                    <Col>
                        <TierSelect className="tier-input">
                            <label>Price Tier:</label>
                            <Dropdown
                                value={customer.other_tier}
                                defaultValue={customer.other_tier}
                                options={tierOptions}
                            />
                        </TierSelect>
                    </Col>
                    <Col>
                        <StatusChoice>
                            <CircleStatusIcon
                                symbol="P"
                                fill={foodReviewMode === 'auto'}
                                disabled={foodStatus !== 'approval'}
                            />
                            <StatusText>Approve</StatusText>
                        </StatusChoice>
                    </Col>
                    <Col>
                        <StatusChoice>
                            <TriangleStatusIcon
                                symbol="P"
                                fill={foodReviewMode === 'auto'}
                                disabled={foodStatus !== 'in_process'}
                            />
                            <StatusText>Req.Review</StatusText>
                        </StatusChoice>
                    </Col>
                </Row>
            </div>

            <div className="text-center">
                Requires credit app? <ToggleButton />
            </div>
        </div>
    );
}

PreApprovalRequestCard.propTypes = {
    customer: PropTypes.object.isRequired,
};
