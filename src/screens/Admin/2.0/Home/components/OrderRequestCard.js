import { Col, Row } from 'react-bootstrap';
import {
    IconAwesomePenFancy,
    IconAwesomePenFancyRight,
    IconEnvelopeClosed,
    IconEnvelopeOpen,
} from '../../../../../assets/images';
import { StatusChoice, StatusText, TierSelect } from '../../../style';
import Dropdown from '../../../../../components/commons/dropdown';
import {
    CircleStatusIcon,
    HexagonStatusIcon,
    TriangleStatusIcon,
} from './StatusIcons';
import PropTypes from 'prop-types';
import React from 'react';
import {
    statusApproval,
    statusInProcess,
    statusRejection,
} from '../../../constant';

export function OrderRequestCard({ customer }) {
    const {
        id,
        items,
        name,
        price,
        food_tier: foodTier,
        other_tier: otherTier,
        status,
        review_mode: reviewMode,
        onChangeStatus,
        onChangeFoodTier,
        onChangeOtherTier,
    } = customer;

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

    const renderSaleItems = (items) => {
        return items.map((item) => (
            <li key={item.id}>
                <Row>
                    <Col>
                        {item.name} - ${item.price}
                    </Col>
                    <Col xs="auto" className="text-right document-status">
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
        <Row key={id} className="order-summary-row">
            <Col className="order-summary">
                <ul className="order-documents">{renderSaleItems(items)}</ul>
                <div className="order-tiers">
                    <TierSelect className="tier-input" inline={true}>
                        <label>Food Tier</label>
                        <Dropdown
                            handleChange={onChangeFoodTier}
                            value={foodTier}
                            defaultValue={foodTier}
                            options={tierOptions}
                        />
                    </TierSelect>
                    <TierSelect
                        className="tier-input ml-1 ml-sm-5"
                        inline={true}
                    >
                        <label>Other Tier</label>
                        <Dropdown
                            handleChange={onChangeOtherTier}
                            value={otherTier}
                            defaultValue={otherTier}
                            options={tierOptions}
                        />
                    </TierSelect>
                </div>
                <div className="order-status">
                    <StatusChoice
                        onClick={() => onChangeStatus(statusApproval)}
                    >
                        <CircleStatusIcon
                            symbol="S"
                            fill={reviewMode === 'auto'}
                            disabled={status !== statusApproval}
                        />
                        <StatusText>Approve</StatusText>
                    </StatusChoice>
                    <StatusChoice
                        className="ml-4 ml-sm-5"
                        onClick={() => onChangeStatus(statusInProcess)}
                    >
                        <TriangleStatusIcon
                            symbol="S"
                            fill={reviewMode === 'auto'}
                            disabled={status !== statusInProcess}
                        />
                        <StatusText>Req.Review</StatusText>
                    </StatusChoice>
                    <StatusChoice
                        className="ml-4 ml-sm-5"
                        onClick={() => onChangeStatus(statusRejection)}
                    >
                        <HexagonStatusIcon
                            symbol="S"
                            fill={reviewMode === 'auto'}
                            disabled={status !== statusRejection}
                        />
                        <StatusText>Reject</StatusText>
                    </StatusChoice>
                </div>
                <button className="btn btn-comments">Comments ({2})</button>
            </Col>
        </Row>
    );
}

OrderRequestCard.propTypes = {
    customer: PropTypes.object.isRequired,
};

OrderRequestCard.defaultProps = {
    onChangeStatus: () => {},
    onChangeFoodTier: () => {},
    onChangeOtherTier: () => {},
}