import React from 'react';
import moment from 'moment';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { IconAwesomeCheckCircle } from '../../../../assets/images';

function ApplicantCredit({ applicant }) {
    const credit_date = moment(applicant.date).format('MM/DD/YYYY');

    return (
        <div className="applicant-credit">
            <div className="color-text">
                {applicant.first_name} {applicant.last_name}
            </div>
            <div className="text-white">Income ${applicant.income}</div>
            <div className="text-white">
                FICO: ${applicant.fico} / VAN: ${applicant.van}
            </div>
            <div className="text-white">
                Credit Shop: &nbsp;
                {applicant.credit_shop && <img src={IconAwesomeCheckCircle} />}
            </div>
            <div className="text-white font-italic">{credit_date}</div>
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
                <Col>Combined Past Due:</Col>
                <Col>{stats.past_due}</Col>
            </Row>
            <Row>
                <Col>Combined Income:</Col>
                <Col>{stats.income}</Col>
            </Row>
            <Row>
                <Col>Combined Payments:</Col>
                <Col>{stats.payments}</Col>
            </Row>
            <Row>
                <Col>Combined DTI:</Col>
                <Col>{stats.dti}</Col>
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
    const totalBalance =
        revolving.total_balance +
        mortgage.total_balance +
        installment.total_balance;

    const totalMonthlyPayments =
        revolving.total_monthly_payments +
        mortgage.total_monthly_payments +
        installment.total_monthly_payments;

    const pastDueAmounts =
        revolving.past_due_amounts +
        mortgage.past_due_amounts +
        installment.past_due_amounts;

    return (
        <>
            <Row>
                <Col />
                <Col>Total Balance</Col>
                <Col>Total Monthly Payments</Col>
                <Col>Past Due Amounts</Col>
            </Row>
            <Row>
                <Col>Revolving</Col>
                <Col>$ {revolving.total_balance}</Col>
                <Col>$ {revolving.total_monthly_payments}</Col>
                <Col>$ {revolving.past_due_amounts}</Col>
            </Row>
            <Row>
                <Col>Mortgage</Col>
                <Col>$ {mortgage.total_balance}</Col>
                <Col>$ {mortgage.total_monthly_payments}</Col>
                <Col>$ {mortgage.past_due_amounts}</Col>
            </Row>
            <Row>
                <Col>Installment</Col>
                <Col>$ {installment.total_balance}</Col>
                <Col>$ {installment.total_monthly_payments}</Col>
                <Col>$ {installment.past_due_amounts}</Col>
            </Row>
            <Row>
                <Col>TOTAL</Col>
                <Col>$ {totalBalance}</Col>
                <Col>$ {totalMonthlyPayments}</Col>
                <Col>$ {pastDueAmounts}</Col>
            </Row>
        </>
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
        <div className="custom-credit">
            <Row>
                <Col>
                    <ApplicantCredit applicant={applicant} />
                </Col>
                <Col>
                    <ApplicantCredit applicant={coApplicant} />
                </Col>
            </Row>
            <CombinedCreditStats stats={combinedStats} />
            <Row>
                <Col>Delinquency 30/60/90:</Col>
                <Col>
                    {delinquency30}/{delinquency60}/{delinquency90}
                </Col>
            </Row>
            <Row>
                <Col>Inquiries during last 6 months:</Col>
                <Col>{inquiries}</Col>
            </Row>
            <Row>
                <Col>Revolving Available Percentage:</Col>
                <Col>{revolvingPercentage}%</Col>
            </Row>
            <BalanceStatsTable stats={balanceStats} />
            <div>{comment}</div>
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
