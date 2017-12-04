import React from 'react';
import moment from 'moment';
import { Col, Row, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { IconAwesomeCheckCircle } from '../../../../assets/images';

function ApplicantCredit({ applicant }) {
    const credit_date = moment(applicant.date).format('MM/DD/YYYY');

    return (
        <div className="applicant-credit">
            <p className="color-dim-blue">
                {applicant.first_name} {applicant.last_name}
            </p>
            <p className="text-white">Income ${applicant.income}</p>
            <p className="text-white">
                FICO: {applicant.fico} / VAN: {applicant.van}
            </p>
            <p className="text-white">
                Credit Shop: &nbsp;
                {applicant.credit_shop && <img src={IconAwesomeCheckCircle} />}
            </p>
            <p className="text-white font-italic">{credit_date}</p>
        </div>
    );
}

ApplicantCredit.propTypes = {
    applicant: PropTypes.shape({
        date: PropTypes.object,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        income: PropTypes.number,
        fico: PropTypes.number,
        van: PropTypes.number,
        credit_shop: PropTypes.bool,
    }),
};

function CombinedCreditStats({ stats }) {
    return (
        <div className="combined-credit-stats">
            <Row>
                <Col className="col-left color-grey-blue">
                    Combined Past Due:
                </Col>
                <Col className="col-right color-light-blue">
                    $ {stats.past_due}
                </Col>
            </Row>
            <Row>
                <Col className="col-left color-grey-blue">Combined Income:</Col>
                <Col className="col-right color-light-blue">
                    $ {stats.income}
                </Col>
            </Row>
            <Row>
                <Col className="col-left color-grey-blue">
                    Combined Payments:
                </Col>
                <Col className="col-right color-light-blue">
                    $ {stats.payments}
                </Col>
            </Row>
            <Row>
                <Col className="col-left color-grey-blue">Combined DTI:</Col>
                <Col className="col-right color-light-blue">{stats.dti} %</Col>
            </Row>
        </div>
    );
}

CombinedCreditStats.propTypes = {
    stats: PropTypes.shape({
        past_due: PropTypes.number,
        income: PropTypes.number,
        payments: PropTypes.number,
        dti: PropTypes.number,
    }),
};

function BalanceStatsTable({ stats }) {
    const { revolving, mortgage, installment } = stats;
    const items = ['revolving', 'mortgage', 'installment'];

    const totalBalance = items.reduce((sum, item) => {
        return sum + stats[item].total_balance;
    }, 0);

    const totalMonthlyPayments = items.reduce((sum, item) => {
        return sum + stats[item].total_monthly_payments;
    }, 0);

    const pastDueAmounts = items.reduce((sum, item) => {
        return sum + stats[item].past_due_amounts;
    }, 0);

    return (
        <div className="balance-stats-table">
            <Row>
                <Col xs={3} />
                <Col xs={3} className="balance-col color-grey-blue text-center">
                    Total Balance
                </Col>
                <Col xs={3} className="payment-col color-grey-blue text-center">
                    Total Monthly Payments
                </Col>
                <Col
                    xs={3}
                    className="past-due-col color-grey-blue text-center"
                >
                    Past Due Amounts
                </Col>
            </Row>
            {items.map((item) => (
                <Row key={item}>
                    <Col xs={3} className="color-grey-blue">
                        {item[0].toUpperCase() + item.substr(1)}
                    </Col>
                    <Col
                        xs={3}
                        className="text-white text-right pr-xs-3 pr-md-4"
                    >
                        $ {stats[item].total_balance}
                    </Col>
                    <Col
                        xs={3}
                        className="text-white text-right pr-xs-3 pr-md-4"
                    >
                        $ {stats[item].total_monthly_payments}
                    </Col>
                    <Col
                        xs={3}
                        className="text-white text-right pr-xs-3 pr-md-4"
                    >
                        $ {stats[item].past_due_amounts}
                    </Col>
                </Row>
            ))}
            <div className="total-row">
                <Row className="text-white">
                    <Col xs={3}>TOTAL</Col>
                    <Col xs={3} className="text-right pr-xs-3 pr-md-4">
                        $ {totalBalance}
                    </Col>
                    <Col xs={3} className="text-right pr-xs-3 pr-md-4">
                        $ {totalMonthlyPayments}
                    </Col>
                    <Col xs={3} className="text-right pr-xs-3 pr-md-4">
                        $ {pastDueAmounts}
                    </Col>
                </Row>
            </div>
        </div>
    );
}

const BalanceStatsPropShape = PropTypes.shape({
    total_balance: PropTypes.number,
    total_monthly_payments: PropTypes.number,
    past_due_amounts: PropTypes.number,
});

BalanceStatsTable.propTypes = {
    stats: PropTypes.shape({
        revolving: BalanceStatsPropShape,
        mortgage: BalanceStatsPropShape,
        installment: BalanceStatsPropShape,
    }),
};

export default function CustomerCredit({ credit }) {
    const {
        applicant,
        co_applicant: coApplicant,
        combined_stats: combinedStats,
        delinquency_30: delinquency30,
        delinquency_60: delinquency60,
        delinquency_90: delinquency90,
        inquiries,
        revolving_percentage: revolvingPercentage,
        balance_stats: balanceStats,
        comment,
    } = credit;

    return (
        <div className="customer-credit-wrapper list">
            <div className="mobile-sized-container">
                <Row className="applicant-credit-list">
                    <Col className="col-left" xs={6}>
                        <ApplicantCredit applicant={applicant} />
                    </Col>
                    <Col className="col-right" xs={6}>
                        <ApplicantCredit applicant={coApplicant} />
                    </Col>
                </Row>
            </div>
            <div className="mobile-sized-container mt-3">
                <CombinedCreditStats stats={combinedStats} />
            </div>
            <div className="mobile-sized-container mt-3">
                <Row>
                    <Col className="text-white">Delinquency 30/60/90:</Col>
                    <Col className="color-light-blue text-right">
                        {delinquency30}/{delinquency60}/{delinquency90}
                    </Col>
                </Row>
            </div>
            <div className="mobile-sized-container mt-3">
                <Row>
                    <Col className="text-white">
                        Inquiries during last 6 months:
                    </Col>
                    <Col className="color-light-blue text-right">
                        {inquiries}
                    </Col>
                </Row>
            </div>
            <div className="mobile-sized-container mt-3">
                <Row>
                    <Col className="text-white">
                        Revolving Available Percentage:
                    </Col>
                    <Col className="color-light-blue text-right">
                        {revolvingPercentage}%
                    </Col>
                </Row>
            </div>
            <div className="mt-3">
                <BalanceStatsTable stats={balanceStats} />
            </div>
            <div className="mobile-sized-container mt-3">
                <div className="color-grey-blue">Comment</div>
                <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    value={comment}
                    style={{ height: '71px' }}
                />
            </div>
        </div>
    );
}

CustomerCredit.propTypes = {
    credit: PropTypes.shape({
        applicant: PropTypes.object,
        co_applicant: PropTypes.object,
        combined_stats: PropTypes.object,
        delinquency_30: PropTypes.number,
        delinquency_60: PropTypes.number,
        delinquency_90: PropTypes.number,
        inquiries: PropTypes.number,
        revolving_percentage: PropTypes.number,
        balance_stats: PropTypes.object,
        comment: PropTypes.string,
    }),
};
