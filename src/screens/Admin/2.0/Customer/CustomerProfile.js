import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import Header, {
    HeaderCenter,
    HeaderLeft,
    HeaderRight,
} from '../../../../components/Dealer/Header';
import { IconArrowLeft, IconChatBubble } from '../../../../assets/images';
import { OrderRequestSummary } from './components/OrderRequestSummary';
import { PreapprovalRequestSummary } from './components/PreapprovalRequestSummary';

function ApplicantList({ applicant, coApplicant }) {
    return (
        <div className="applicant-list">
            <div className="applicant">
                <div>
                    <span className="applicant-name">
                        {applicant.first_name[0]}.{applicant.last_name}
                    </span>
                    <br />
                    <span className="applicant-date">
                        {applicant.applied_date}
                    </span>
                </div>
                <div className="applicant-field-list">
                    <div className="applicant-field">
                        <Row>
                            <Col className="color-name" xs={4}>
                                Address:
                            </Col>
                            <Col className="color-text" xs={8}>
                                {applicant.address}
                            </Col>
                        </Row>
                    </div>
                    <div className="applicant-field">
                        <Row>
                            <Col className="color-name" xs={4}>
                                Email:
                            </Col>
                            <Col className="color-text" xs={8}>
                                {applicant.email}
                            </Col>
                        </Row>
                    </div>
                    <div className="applicant-field">
                        <Row>
                            <Col className="color-name" xs={4}>
                                Phone:
                            </Col>
                            <Col className="color-text" xs={8}>
                                {applicant.phone}
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            {coApplicant && (
                <div className="applicant">
                    <div>
                        <span className="color-name">
                            {applicant.first_name[0]}.{applicant.last_name}
                        </span>
                    </div>
                    <div className="applicant-field-list">
                        <div className="applicant-field">
                            <Row>
                                <Col className="color-name" xs={4}>
                                    Email:
                                </Col>
                                <Col className="color-text" xs={8}>
                                    {coApplicant.email}
                                </Col>
                            </Row>
                        </div>
                        <div className="applicant-field">
                            <Row>
                                <Col className="color-name" xs={4}>
                                    Phone:
                                </Col>
                                <Col className="color-text" xs={8}>
                                    {coApplicant.phone}
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

ApplicantList.propTypes = {
    applicant: PropTypes.object.isRequired,
    coApplicant: PropTypes.object,
};

export function OrderBalanceSummary({
    foodBalance,
    applianceBalance,
    totalPastDueBalance,
    finalFoodPmtExpected,
}) {
    return (
        <div className="order-balance-summary">
            <div className="balance-field">
                <span className="color-name">Food Balance:</span>
                <br />
                <span className="color-text">$ {foodBalance}</span>
            </div>
            <div className="balance-field">
                <span className="color-name">Appliance Balance:</span>
                <br />
                <span className="color-text">$ {applianceBalance}</span>
            </div>
            <div className="balance-field">
                <span className="color-name">Total Past Due Balance:</span>
                <br />
                <span className="color-text">$ {totalPastDueBalance}</span>
            </div>
            <div className="balance-field">
                <span className="color-name">Final Food Pmt Expected:</span>
                <br />
                <span className="color-text">
                    {moment(finalFoodPmtExpected).format('MM/DD/YY')}
                </span>
            </div>
        </div>
    );
}

OrderBalanceSummary.propTypes = {
    foodBalance: PropTypes.number.isRequired,
    applianceBalance: PropTypes.number.isRequired,
    totalPastDueBalance: PropTypes.number.isRequired,
    finalFoodPmtExpected: PropTypes.object.isRequired,
};

export function CustomerProfile({
    customer,
    dealer,
    latestOrder,
    numComments,
}) {
    const {
        applicant,
        co_applicant: coApplicant,
        credit_app_on_file: creditAppOnFile,
    } = customer;
    const {
        food_balance: foodBalance,
        appliance_balance: applianceBalance,
        total_past_due_balance: totalPastDueBalance,
        final_food_pmt_expected: finalFoodPmtDueExpected,
    } = latestOrder;

    const handleArrowBack = () => {};

    return (
        <div className="customer-profile-wrapper">
            <Row>
                <Col className="">
                    <ApplicantList
                        applicant={applicant}
                        coApplicant={coApplicant}
                    />
                </Col>
                <Col className="profile-right-col">
                    <div>
                        <span className="dealer-name color-text">
                            {dealer.name}
                        </span>
                        <br />
                        <span className="dealer-number color-name">
                            {dealer.tcp_number}
                        </span>
                    </div>
                    <div className="mt-4">
                        <button className="btn-chat">
                            <img src={IconChatBubble} />
                            Comments [{numComments}]
                        </button>
                    </div>
                    <div className="mt-4">
                        <span className="color-name">
                            Credit App on File:
                        </span>
                        <br />
                        <span className="color-text">
                            {creditAppOnFile ? 'Yes' : 'No'}
                        </span>
                    </div>
                    <div className="mt-3">
                        <Row>
                            <Col>
                                <span className="color-name">
                                    Food:
                                </span>
                                <br />
                                <span className="color-text">
                                    Tier {customer.food_tier}
                                </span>
                            </Col>
                            <Col>
                                <span className="color-name">
                                    Appliance:
                                </span>
                                <br />
                                <span className="color-text">
                                    Tier {customer.other_tier}
                                </span>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <div className="order-history-table">
                <Row className="table-header">
                    <Col className="text-center">Latest Order</Col>
                    <Col className="text-center">In Process</Col>
                </Row>
                <Row className="table-body">
                    <Col>
                        <OrderBalanceSummary
                            foodBalance={foodBalance}
                            applianceBalance={applianceBalance}
                            totalPastDueBalance={totalPastDueBalance}
                            finalFoodPmtExpected={
                                finalFoodPmtDueExpected
                            }
                        />
                    </Col>
                    <Col>
                        {customer.request_type === 'order' ? (
                            <OrderRequestSummary order={customer} />
                        ) : (
                            <PreapprovalRequestSummary
                                order={customer}
                            />
                        )}
                    </Col>
                </Row>
            </div>
            {customer.request_type === 'order' && (
                <Row>
                    <Col>
                        <button className="btn-action">
                            Request Preapproval
                        </button>
                    </Col>
                    <Col className="text-right">
                        <button className="btn-action">
                            Generate an Order
                        </button>
                    </Col>
                </Row>
            )}
        </div>
    );
}

CustomerProfile.propTypes = {
    customer: PropTypes.object.isRequired,
    dealer: PropTypes.object,
    latestOrder: PropTypes.object,
    numComments: PropTypes.number.isRequired,
};
