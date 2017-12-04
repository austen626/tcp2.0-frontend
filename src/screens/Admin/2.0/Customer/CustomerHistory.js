import React from 'react';
import PropTypes from 'prop-types';
import { IconDoorClosed } from '../../../../assets/images';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { ExpandIcon } from '../Home/components/ExpandIcon';

function LoanRow({ loan, expanded, onClick }) {
    return (
        <Row
            className={`single-row ${expanded ? 'expanded' : ''}`}
            onClick={onClick}
        >
            <div className="loan-row">
                <Col xs={5} sm={7} className="loan-row-heading">
                    <img src={IconDoorClosed} />
                    <span className="loan-title-wrapper">
                        <span className="loan-title">{loan.name}</span>
                        <span className="loan-date d-block d-sm-none">
                            {moment(loan.date).format('DD MMM YYYY')}
                        </span>
                    </span>
                </Col>
                <Col xs={4} sm={2} className="d-none d-sm-block">
                    <span className="loan-date">
                        {moment(loan.date).format('DD MMM YYYY')}
                    </span>
                </Col>

                <Col xs={6} sm={2} className="d-flex align-items-center">
                    <span className="loan-number">Loan No: {loan.no}</span>
                </Col>
                <Col
                    xs={1}
                    className="d-flex align-items-center justify-content-end"
                >
                    <ExpandIcon />
                </Col>
            </div>
        </Row>
    );
}

LoanRow.propTypes = {
    loan: PropTypes.object.isRequired,
    expanded: PropTypes.bool,
    onClick: PropTypes.func,
};

LoanRow.defaultProps = {
    onClick: () => {},
};

export default function CustomerHistory({ loans }) {
    const renderLoans = (loans) => {
        return loans.map((loan) => <LoanRow key={loan.id} loan={loan} />);
    };

    return (
        <div className="customer-history-wrapper list">
            {renderLoans(loans)}
        </div>
    );
}

CustomerHistory.propTypes = {
    loans: PropTypes.array.isRequired,
};
