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

export function CustomerRow({ data, expanded, onClick }) {
    const {
        name: name,
        location: location,
        sale_slip: saleSlip,
        food_date: foodDate,
        food_stage: foodStage,
        food_mode: foodMode,
        food_status: foodStatus,
        other_stage: otherStage,
        other_mode: otherMode,
        other_status: otherStatus,
        purchased_items: purchasedItems,
    } = data;

    const renderStatus = (stage, mode, status) => {
        const symbol = stage === 'PreApproval' ? 'P' : 'S';
        const fill = mode === 'auto';

        if (status === 'approval') {
            return <CircleStatusIcon symbol={symbol} fill={fill} />;
        } else if (status === 'in-process') {
            return <TriangleStatusIcon symbol={symbol} fill={fill} />;
        } else if (status === 'rejection') {
            return <HexagonStatusIcon symbol={symbol} fill={fill} />;
        }
    };

    const renderFood = (stage, mode, status, date) => {
        return (
            <div>
                {renderStatus(stage, mode, status)}
                <span className="customer-food-date">{formatDate(date)}</span>
            </div>
        );
    };

    const formatDate = (date) => {
        return moment(date).format('MM/DD/YY');
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
        <Row className={`single-row ${expanded ? 'expanded' : ''}`}>
            <div className="customer-row">
                <Col>
                    <div>
                        <span className="customer-name">{name}</span>
                    </div>
                    <div>
                        <span className="customer-location">{location}</span>
                    </div>
                </Col>
                <Col xs={5} className="content-col text-right">
                    {saleSlip
                        ? renderPurchasedItems(purchasedItems)
                        : renderFood(foodStage, foodMode, foodStatus, foodDate)}
                </Col>
                <Col xs={3} className="action-col text-right">
                    {renderStatus(otherStage, otherMode, otherStatus)}
                    <ExpandIcon />
                </Col>
            </div>
        </Row>
    );
}

CustomerRow.propTypes = {
    data: PropTypes.object.isRequired,
    expanded: PropTypes.bool,
    onClick: PropTypes.func,
};
