import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ExpandIcon } from './ExpandIcon';
import { CustomerRow } from './CustomerRow';
import { OrderRequestCard } from './OrderRequestCard';

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

export function DealerRow({ data, expanded, onClick }) {
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
            <>
                <CustomerRow
                    expanded={item.id === activeCustomer}
                    customer={item}
                    key={item.id}
                    onClick={() => {
                        handleClickCustomer(item);
                    }}
                />
                {item.id === activeCustomer && (
                    <OrderRequestCard customer={item} />
                )}
            </>
        ));
    };

    return (
        <React.Fragment key={data.id}>
            <Row
                className={`single-row ${expanded ? 'expanded' : ''}`}
                onClick={() => onClick && onClick(data)}
            >
                <div className="dealer-row">
                    <Col xs={6}>
                        <span className="dealer-name">
                            {data.company_name}
                        </span>
                    </Col>
                    <Col xs={6} className="dealer-action">
                        <BadgedExpand number={data.num_customers} />
                    </Col>
                </div>
                <div className="dealer-row-border" />
            </Row>
            {expanded && renderCustomerRows(data.customers)}
        </React.Fragment>
    );
}

DealerRow.propTypes = {
    data: PropTypes.object.isRequired,
    expanded: PropTypes.bool,
    onClick: PropTypes.func,
};
