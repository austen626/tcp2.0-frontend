import { Col, Row } from 'react-bootstrap';
import {
    IconAwesomePenFancy,
    IconAwesomePenFancyRight,
    IconEnvelopeClosed,
    IconEnvelopeOpen,
} from '../../../../assets/images';
import { StatusChoice, TierSelect } from '../../style';
import Dropdown from '../../../../components/commons/dropdown';
import {
    CircleStatusIcon,
    HexagonStatusIcon,
    TriangleStatusIcon,
} from './StatusIcons';
import PropTypes from 'prop-types';
import React from 'react';

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
                    <Col className="text-right document-status">
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
        <Row key={data.id}>
            <Col className="customer-sale-summary">
                <ul className="customer-sale-documents">
                    {renderSaleItems(data.purchased_items)}
                </ul>
                <div className="customer-sale-tiers">
                    <TierSelect className="tier-input">
                        <label>Food Tier</label>
                        <Dropdown
                            value={data.food_tier}
                            defaultValue={data.food_tier}
                            options={options}
                        />
                    </TierSelect>
                    <TierSelect className="tier-input ml-1 ml-sm-5">
                        <label>Other Tier</label>
                        <Dropdown
                            value={data.other_tier}
                            defaultValue={data.other_tier}
                            options={options}
                        />
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
                <button className="btn btn-comments">Comments {2}</button>
            </Col>
        </Row>
    );
}

CustomerDetailCard.propTypes = {
    data: PropTypes.object.isRequired,
};
