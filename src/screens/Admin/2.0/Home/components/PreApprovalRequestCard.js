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
import { IconFeatherCalendar } from '../../../../../assets/images';
import {
    statusApproval,
    statusInProcess,
    statusRejection,
} from '../../../constant';

function DateInput({ value, onChange }) {
    return (
        <CalendarContainer className="calendar-approve">
            <DatePicker
                selected={value}
                onChange={onChange}
                minDate={new Date()}
                className="calendar-approve"
                dateFormat="MM/dd/yyyy"
                placeholderText="MM/DD/YYYY"
            />
            <span className="calendar-badge">
                <img src={IconFeatherCalendar} />
            </span>
        </CalendarContainer>
    );
}

DateInput.propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};

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
                    <label>PRODUCT/SERVICE:&nbsp;</label>
                    <span className="product-name">Food</span>
                </div>
                <div className="request-detail">
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
                            <DateInput
                                value={foodDate}
                                onChange={handleFoodDateChange}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <StatusChoice>
                                <CircleStatusIcon
                                    symbol="P"
                                    fill={foodReviewMode === 'auto'}
                                    disabled={foodStatus !== statusApproval}
                                />
                                <StatusText className="status-text">
                                    Approve
                                </StatusText>
                            </StatusChoice>
                        </Col>
                        <Col className="text-center">
                            <StatusChoice>
                                <TriangleStatusIcon
                                    symbol="P"
                                    fill={foodReviewMode === 'auto'}
                                    disabled={foodStatus !== statusInProcess}
                                />
                                <StatusText className="status-text">
                                    Req.Review
                                </StatusText>
                            </StatusChoice>
                        </Col>
                        <Col className="text-right">
                            <StatusChoice>
                                <HexagonStatusIcon
                                    symbol="P"
                                    fill={foodReviewMode === 'auto'}
                                    disabled={foodStatus !== statusRejection}
                                />
                                <StatusText className="status-text">
                                    Decline
                                </StatusText>
                            </StatusChoice>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="request-wrapper">
                <div className="request-title">
                    <label className="">PRODUCT/SERVICE:&nbsp;</label>
                    <span className="product-name">Other</span>
                </div>
                <div className="request-detail">
                    <Row className="align-items-end">
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
                                    disabled={foodStatus !== statusApproval}
                                />
                                <StatusText className="status-text">
                                    Approve
                                </StatusText>
                            </StatusChoice>
                        </Col>
                        <Col className="text-right">
                            <StatusChoice>
                                <TriangleStatusIcon
                                    symbol="P"
                                    fill={foodReviewMode === 'auto'}
                                    disabled={foodStatus !== statusInProcess}
                                />
                                <StatusText className="status-text">
                                    Req.Review
                                </StatusText>
                            </StatusChoice>
                        </Col>
                    </Row>
                    <div className="text-center mt-3 require-credit-app">
                        <label>Requires credit app?</label>
                        <ToggleButton className="ml-3" />
                    </div>
                </div>
            </div>
        </div>
    );
}

PreApprovalRequestCard.propTypes = {
    customer: PropTypes.object.isRequired,
};
