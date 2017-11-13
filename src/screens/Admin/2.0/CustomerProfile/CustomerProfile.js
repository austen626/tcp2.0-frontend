import Header, {
    HeaderCenter,
    HeaderLeft,
    HeaderRight,
} from '../../../../components/Dealer/Header';
import { IconArrowLeft } from '../../../../assets/images';
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

function ApplicantList({ applicant, coApplicant }) {
    return (
        <>
            <div className="applicant-list">
                <div className="applicant">
                    <p>
                        <span>{applicant.name}</span>
                        <br />
                        <span>{applicant.applied_date}</span>
                    </p>
                    <p>
                        <Row>
                            <Col>Address: </Col>
                            <Col>{applicant.address}</Col>
                        </Row>
                    </p>
                    <p>
                        <Row>
                            <Col>Email: </Col>
                            <Col>{applicant.email}</Col>
                        </Row>
                    </p>
                    <p>
                        <Row>
                            <Col>Phone: </Col>
                            <Col>{applicant.phone}</Col>
                        </Row>
                    </p>
                </div>
                {coApplicant && (
                    <div className="applicant">
                        <p>
                            <span>{applicant.name}</span>
                            <br />
                            <span>{applicant.applied_date}</span>
                        </p>
                        <p>
                            <Row>
                                <Col>Email: </Col>
                                <Col>{applicant.email}</Col>
                            </Row>
                        </p>
                        <p>
                            <Row>
                                <Col>Phone: </Col>
                                <Col>{applicant.phone}</Col>
                            </Row>
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
ApplicantList.propTypes = {
    applicant: PropTypes.object.isRequired,
    coApplicant: PropTypes.object,
};

export function CustomerProfile({ data }) {
    const { first_name: firstName, last_name: lastName } = data;

    const handleArrowBack = () => {};

    return (
        <div className="admin">
            <Header>
                <HeaderLeft>
                    <img src={IconArrowLeft} onClick={handleArrowBack} alt="" />
                </HeaderLeft>
                <HeaderCenter>
                    <div className="header-main">
                        {firstName} {lastName}
                    </div>
                </HeaderCenter>
                <HeaderRight />
            </Header>
            <div className="main">
                <Row>
                    <Col>
                        {/*<ApplicantList applicant={} coApplicant={} />*/}
                    </Col>
                </Row>
            </div>
        </div>
    );
}

CustomerProfile.propTypes = {
    data: PropTypes.object.isRequired,
};
