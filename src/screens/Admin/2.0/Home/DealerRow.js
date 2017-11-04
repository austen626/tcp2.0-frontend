import { Col, Row } from 'react-bootstrap';
import { IconDeleteNew } from '../../../../assets/images';
import PropTypes from 'prop-types';
import React from 'react';
import { ExpandIcon } from './ExpandIcon';
import { CustomerRow } from './CustomerRow';

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
    const renderCustomerRows = (customers) => {
        return customers.map((item) => (
            <CustomerRow data={item} key={item.id} />
        ));
    };

    return (
        <>
            <Row
                className={`single-row ${expanded ? 'expanded' : ''}`}
                onClick={() => onClick && onClick(data)}
            >
                <div className="dealer-row">
                    <Col xs={6}>
                        <span className="dealer-name">{data.company_name}</span>
                    </Col>
                    <Col xs={6} className="dealer-action">
                        <BadgedExpand number={data.num_customers} />
                    </Col>
                </div>
            </Row>
            {expanded && renderCustomerRows(data.customers)}
        </>
    );
}

DealerRow.propTypes = {
    data: PropTypes.object.isRequired,
    expanded: PropTypes.bool,
    onClick: PropTypes.func,
};
