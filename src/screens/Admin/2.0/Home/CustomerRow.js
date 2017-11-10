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
import {
    IconAwesomePenFancy,
    IconAwesomePenFancyRight,
    IconEnvelopeClosed,
    IconEnvelopeOpen,
} from '../../../../assets/images';
import Dropdown from '../../../../components/commons/dropdown';
import { StatusChoice, TierSelect } from '../../style';

export function CustomerDetailCard({ data }) {
    const options = [
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

    const renderSaleItems = (items) => {
        return items.map((item) => (
            <li key={item.id}>
                <Row>
                    <Col>
                        {item.name} - ${item.price}
                    </Col>
                    <Col className="text-right">
                        {item.document_signed ? (
                            <img src={IconAwesomePenFancyRight} />
                        ) : (
                            <img src={IconAwesomePenFancy} />
                        )}
                        |
                        {item.document_delivered ? (
                            <img src={IconEnvelopeOpen} />
                        ) : (
                            <img src={IconEnvelopeClosed} />
                        )}
                    </Col>
                </Row>
            </li>
        ));
    };

    return (
        <Row>
            <Col className="customer-sale-summary">
                <ul className="customer-sale-documents">
                    {renderSaleItems(data.purchased_items)}
                </ul>
                <div className="customer-sale-tiers">
                    <TierSelect className="tier-input">
                        <label>Food Tier</label> <Dropdown options={options} />
                    </TierSelect>
                    <TierSelect className="tier-input ml-1 ml-sm-5">
                        <label>Other Tier</label> <Dropdown options={options} />
                    </TierSelect>
                </div>
                <div className="customer-sale-status">
                    <StatusChoice>
                        <CircleStatusIcon symbol="S" fill={false} />
                        <span className="status-text">Approve</span>
                    </StatusChoice>
                    <StatusChoice className="ml-4 ml-sm-5">
                        <TriangleStatusIcon symbol="S" fill={false} />
                        <span className="status-text">Req.Review</span>
                    </StatusChoice>
                    <StatusChoice className="ml-4 ml-sm-5">
                        <HexagonStatusIcon symbol="S" fill={false} />
                        <span className="status-text">Reject</span>
                    </StatusChoice>
                </div>
            </Col>
        </Row>
    );
}

CustomerDetailCard.propTypes = {
    data: PropTypes.object.isRequired,
};

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
        <Row
            className={`single-row ${expanded ? 'expanded' : ''}`}
            onClick={onClick}
        >
            <div className="customer-row">
                <Col>
                    <div>
                        <span className="customer-name">{name}</span>
                    </div>
                    <div>
                        <span className="customer-location">
                            {location}
                        </span>
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
