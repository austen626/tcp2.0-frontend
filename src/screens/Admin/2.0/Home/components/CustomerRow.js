import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ExpandIcon } from './ExpandIcon';
import StatusIcon from './StatusIcons/StatusIcon';
import { toAbbrName } from '../../../../../utils/helper';

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

    const renderFood = (mode, status, date) => {
        return (
            <div>
                {<StatusIcon symbol="P" mode={mode} status={status} />}
                <span className="customer-food-date">{formatDate(date)}</span>
            </div>
        );
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
                            {toAbbrName(
                                applicant.first_name,
                                null,
                                applicant.last_name
                            )}
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
                    {requestType === 'order' ? (
                        <StatusIcon
                            symbol="S"
                            mode={reviewMode}
                            status={status}
                        />
                    ) : (
                        <StatusIcon
                            symbol="P"
                            mode={otherReviewMode}
                            status={otherStatus}
                        />
                    )}
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
