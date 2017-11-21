import { Col, Row } from 'react-bootstrap';
import {
    IconAwesomePenFancy,
    IconAwesomePenFancyRight,
    IconEnvelopeClosed,
    IconEnvelopeOpen,
} from '../../../../../assets/images';
import StatusIcon from '../../Home/components/StatusIcons/StatusIcon';
import PropTypes from 'prop-types';
import React from 'react';

export function OrderRequestSummary({ order }) {
    const renderApplication = (application) => {
        return (
            <div className="application">
                <div>{application.name}</div>
                <Row>
                    <Col>${application.price}</Col>
                    <Col className="document-status text-right">
                        {application.document_signed ? (
                            <img src={IconAwesomePenFancyRight} />
                        ) : (
                            <img src={IconAwesomePenFancy} />
                        )}
                        |
                        {application.document_delivered ? (
                            <img src={IconEnvelopeOpen} />
                        ) : (
                            <img src={IconEnvelopeClosed} />
                        )}
                    </Col>
                </Row>
            </div>
        );
    };

    return (
        <div className="order-request-summary color-text">
            <div className="order-request-summary--status-wrapper">
                <StatusIcon
                    symbol="S"
                    mode={order.review_mode}
                    status={order.status}
                />
            </div>
            {order.items.map((application) => renderApplication(application))}
        </div>
    );
}

OrderRequestSummary.propTypes = {
    order: PropTypes.object.isRequired,
};
