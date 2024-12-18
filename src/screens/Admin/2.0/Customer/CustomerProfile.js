import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import Header, {
    HeaderCenter,
    HeaderLeft,
    HeaderRight,
} from '../../../../components/Dealer/Header';
import { IconArrowLeft, IconChatBubble } from '../../../../assets/images';
import { OrderRequestSummary } from './components/OrderRequestSummary';
import { PreapprovalRequestSummary } from './components/PreapprovalRequestSummary';
import { toAbbrName } from '../../../../utils/helper';

function ApplicantList({ applicant, coApplicant }) {
    return (
        <div className="applicant-list">
            <div className="applicant">
                <div>
                    <span className="applicant-name">
                        {toAbbrName(
                            applicant.first_name,
                            null,
                            applicant.last_name
                        )}
                    </span>
                    <br />
                    <span className="applicant-date">
                        {applicant.applied_date}
                    </span>
                </div>
                <div className="applicant-field-list">
                    <div className="applicant-field">
                        <Row>
                            <Col className="color-light-blue" xs={4}>
                                Address:
                            </Col>
                            <Col className="color-dim-blue" xs={8}>
                                {applicant.address}
                            </Col>
                        </Row>
                    </div>
                    <div className="applicant-field">
                        <Row>
                            <Col className="color-light-blue" xs={4}>
                                Email:
                            </Col>
                            <Col className="color-dim-blue" xs={8}>
                                {applicant.email}
                            </Col>
                        </Row>
                    </div>
                    <div className="applicant-field">
                        <Row>
                            <Col className="color-light-blue" xs={4}>
                                Phone:
                            </Col>
                            <Col className="color-dim-blue" xs={8}>
                                {applicant.phone}
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            {coApplicant && (
                <div className="applicant">
                    <div>
                        <span className="color-light-blue">
                            {toAbbrName(
                                applicant.first_name,
                                null,
                                applicant.last_name
                            )}
                        </span>
                    </div>
                    <div className="applicant-field-list">
                        <div className="applicant-field">
                            <Row>
                                <Col className="color-light-blue" xs={4}>
                                    Email:
                                </Col>
                                <Col className="color-dim-blue" xs={8}>
                                    {coApplicant.email}
                                </Col>
                            </Row>
                        </div>
                        <div className="applicant-field">
                            <Row>
                                <Col className="color-light-blue" xs={4}>
                                    Phone:
                                </Col>
                                <Col className="color-dim-blue" xs={8}>
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
                <span className="color-light-blue">Food Balance:</span>
                <br />
                <span className="color-dim-blue">$ {foodBalance}</span>
            </div>
            <div className="balance-field">
                <span className="color-light-blue">Appliance Balance:</span>
                <br />
                <span className="color-dim-blue">$ {applianceBalance}</span>
            </div>
            <div className="balance-field">
                <span className="color-light-blue">
                    Total Past Due Balance:
                </span>
                <br />
                <span className="color-dim-blue">$ {totalPastDueBalance}</span>
            </div>
            <div className="balance-field">
                <span className="color-light-blue">
                    Final Food Pmt Expected:
                </span>
                <br />
                <span className="color-dim-blue">
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
        <div className="customer-profile-wrapper list">
            <div className="mobile-sized-container">
                <Row>
                    <Col>
                        <ApplicantList
                            applicant={applicant}
                            coApplicant={coApplicant}
                        />
                    </Col>
                    <Col className="profile-right-col">
                        <div>
                            <span className="dealer-name color-dim-blue">
                                {dealer.name}
                            </span>
                            <br />
                            <span className="dealer-number color-light-blue">
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
                            <span className="color-light-blue">
                                Credit App on File:
                            </span>
                            <br />
                            <span className="color-dim-blue">
                                {creditAppOnFile ? 'Yes' : 'No'}
                            </span>
                        </div>
                        <div className="mt-3">
                            <Row>
                                <Col>
                                    <span className="color-light-blue">
                                        Food:
                                    </span>
                                    <br />
                                    <span className="color-dim-blue">
                                        Tier {customer.food_tier}
                                    </span>
                                </Col>
                                <Col>
                                    <span className="color-light-blue">
                                        Appliance:
                                    </span>
                                    <br />
                                    <span className="color-dim-blue">
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
                                finalFoodPmtExpected={finalFoodPmtDueExpected}
                            />
                        </Col>
                        <Col>
                            {customer.request_type === 'order' ? (
                                <OrderRequestSummary order={customer} />
                            ) : (
                                <PreapprovalRequestSummary order={customer} />
                            )}
                        </Col>
                    </Row>
                </div>
                {customer.request_type === 'order' && (
                    <Row>
                        <Col>
                            <button className="btn-normal">
                                Request Preapproval
                            </button>
                        </Col>
                        <Col className="text-right">
                            <button className="btn-normal">
                                Generate an Order
                            </button>
                        </Col>
                    </Row>
                )}
            </div>
        </div>
    );
}

CustomerProfile.propTypes = {
    customer: PropTypes.object.isRequired,
    dealer: PropTypes.object,
    latestOrder: PropTypes.object,
    numComments: PropTypes.number.isRequired,
};
