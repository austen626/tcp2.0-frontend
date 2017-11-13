import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    CircleStatusIcon,
    HexagonStatusIcon,
    TriangleStatusIcon,
} from './StatusIcons';
import { ExpandIcon } from './ExpandIcon';

export function CustomerRow({ customer, expanded, onClick }) {
    const {
        applicant: applicant,
        co_applicant: coApplicant,
        request_type: requestType,
        food_date: foodDate,
        food_status: foodStatus,
        other_status: otherStatus,
        items: items,
        status: status,
        review_mode: reviewMode,
        food_review_mode: foodReviewMode,
        other_review_mode: otherReviewMode,
    } = customer;

    const formatDate = (date) => {
        return moment(date).format('MM/DD/YY');
    };

    const handleClickCustomer = () => {};

    const renderStatus = (symbol, mode, status) => {
        const fill = mode === 'auto';
        if (status === 'approval') {
            return <CircleStatusIcon symbol={symbol} fill={fill} />;
        } else if (status === 'in-process') {
            return <TriangleStatusIcon symbol={symbol} fill={fill} />;
        } else if (status === 'rejection') {
            return <HexagonStatusIcon symbol={symbol} fill={fill} />;
        }
    };

    const renderFood = (mode, status, date) => {
        return (
            <div>
                {renderStatus('P', mode, status)}
                <span className="customer-food-date">{formatDate(date)}</span>
            </div>
        );
    };

    const renderOther = (mode, status) => {
        return renderStatus('P', mode, status);
    };

    const renderPurchasedItems = (items) => {
        return items.map((item) => {
            return (
                <div className="customer-purchase-item" key={item.name}>
                    {item.name}
                </div>
            );
        });
    };

    return (
        <Row
            className={`single-row ${expanded ? 'expanded' : ''}`}
            onClick={onClick}
        >
            <div className="customer-row">
                <Col>
                    <div>
                        <span
                            className="customer-name"
                            onClick={handleClickCustomer}
                        >
                            {applicant.first_name[0].toUpperCase()}.
                            {applicant.last_name}
                        </span>
                    </div>
                    <div>
                        <span className="customer-location">
                            {applicant.address}
                        </span>
                    </div>
                </Col>
                <Col xs={5} className="content-col text-right">
                    {requestType === 'order'
                        ? renderPurchasedItems(items)
                        : renderFood(foodReviewMode, foodStatus, foodDate)}
                </Col>
                <Col xs={3} className="action-col text-right">
                    {requestType === 'order'
                        ? renderStatus('S', reviewMode, status)
                        : renderOther(otherReviewMode, otherStatus)}
                    <ExpandIcon />
                </Col>
            </div>
        </Row>
    );
}

CustomerRow.propTypes = {
    customer: PropTypes.object.isRequired,
    expanded: PropTypes.bool,
    onClick: PropTypes.func,
};
