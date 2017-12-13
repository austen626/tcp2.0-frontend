import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { ExpandIcon } from './ExpandIcon';
import { CustomerRow } from './CustomerRow';
import { OrderRequestCard } from './OrderRequestCard';
import { PreApprovalRequestCard } from './PreApprovalRequestCard';

const BadgedExpand = ({ number }) => {
    if (number > 0) {
        return (
            <span className="badged-expand">
                <span className="number-badge">{number}</span>
                <ExpandIcon />
            </span>
        );
    } else {
        return <span className="number-badge">{number}</span>;
    }
};

export function DealerRow({ dealer, expanded, onClick }) {
    const [activeCustomer, setActiveCustomer] = useState(null);

    const handleClickCustomer = (item) => {
        if (item.id === activeCustomer) {
            setActiveCustomer(null);
        } else {
            setActiveCustomer(item.id);
        }
    };

    const renderCustomerRows = (customers) => {
        return customers.map((item) => (
            <Fragment key={item.id}>
                <CustomerRow
                    expanded={item.id === activeCustomer}
                    customer={item}
                    onClick={() => {
                        handleClickCustomer(item);
                    }}
                />
                {item.id === activeCustomer &&
                    (item.request_type === 'order' ? (
                        <OrderRequestCard customer={item} />
                    ) : (
                        <PreApprovalRequestCard customer={item} />
                    ))}
            </Fragment>
        ));
    };

    return (
        <React.Fragment key={dealer.id}>
            <Row
                className={`single-row ${expanded ? 'expanded' : ''}`}
                onClick={() => onClick && onClick(dealer)}
            >
                <div className="dealer-row">
                    <Col xs={6}>
                        <span className="dealer-name">
                            {dealer.company_name}
                        </span>
                    </Col>
                    <Col xs={6} className="dealer-action">
                        <BadgedExpand number={dealer.num_customers} />
                    </Col>
                </div>
                <div className="dealer-row-border" />
            </Row>
            {expanded && renderCustomerRows(dealer.customers)}
        </React.Fragment>
    );
}

DealerRow.propTypes = {
    dealer: PropTypes.object.isRequired,
    expanded: PropTypes.bool,
    onClick: PropTypes.func,
};
