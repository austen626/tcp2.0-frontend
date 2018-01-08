import { connect } from 'react-redux';
import { PureDealerManagement } from '../DealerManagement/DealerManagement';
import { getHistory } from '../../../../redux/actions/admin';
import Loader from '../../../../shared/Loader';
import Header, {
    HeaderCenter,
    HeaderLeft,
    HeaderRight,
} from '../../../../components/Dealer/Header';
import {
    IconAdd,
    IconArrowLeft,
    IconSearchAdmin,
    TCPLogo,
} from '../../../../assets/images';
import React, { Fragment, useEffect, useState } from 'react';
import { CircledImageButton } from '../../style';
import { Row, Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { toAbbrName } from '../../../../utils/helper';
import moment from 'moment';

export function PureHistory({ history, actionLoading, getHistory }) {
    const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [filterHistory, setFilterHistory] = useState([]);
    const statusToText = {
        funded: 'Funded',
        dispositioned: 'Preapproval Request Dispositioned',
    };

    const handleClickSearch = () => {
        setIsSearchBarVisible(!isSearchBarVisible);
    };

    const handleArrowBack = () => {};

    useEffect(() => {
        if (search != null && search !== '') {
            let temp = history.data.filter((d) =>
                d.company_name.toLowerCase().includes(search.toLowerCase())
            );
            setFilterHistory(temp);
        } else {
            setFilterHistory(history.data);
        }
        setFilterHistory(history.data);
    }, [search]);

    return (
        <div className="admin">
            {actionLoading && <Loader />}
            <Header>
                <HeaderLeft>
                    <img
                        src={IconArrowLeft}
                        onClick={() => handleArrowBack()}
                        alt=""
                    />
                </HeaderLeft>
                <HeaderCenter>
                    <div className="header-main">HISTORY</div>
                </HeaderCenter>
                <HeaderRight>
                    <CircledImageButton active={isSearchBarVisible}>
                        <img
                            src={IconSearchAdmin}
                            alt=""
                            onClick={handleClickSearch}
                        />
                    </CircledImageButton>
                </HeaderRight>
            </Header>
            {isSearchBarVisible && (
                <div className="search-header">
                    <form action="javascript:void(0)">
                        <Form.Group>
                            <Form.Control
                                value={search}
                                placeholder="Search"
                                onChange={(e) => setSearch(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </form>
                </div>
            )}
            <div className="main">
                <div className="list fill-screen">
                    {filterHistory &&
                        filterHistory.map((item) => (
                            <Fragment key={item.id}>
                                <Row className="single-row">
                                    <div className="w-100 d-flex history-row mx-md-5">
                                        <Col xs={3} md={6}>
                                            <div className="customer-name-wrapper">
                                                <span className="customer-name">
                                                    {toAbbrName(
                                                        item.customer.first_name,
                                                        item.customer.middle_name,
                                                        item.customer.last_name
                                                    )}
                                                </span>
                                            </div>
                                            <br className="d-md-none" />
                                            <span className="sales-name">
                                                {toAbbrName(
                                                    item.dealer.first_name,
                                                    item.dealer.middle_name,
                                                    item.dealer.last_name
                                                )}
                                            </span>
                                        </Col>
                                        <Col
                                            xs={9}
                                            md={6}
                                            className="text-right"
                                        >
                                            <span className="history-date">
                                                {moment(item.created_at).format(
                                                    'MM/DD/YY'
                                                )}
                                            </span>
                                            <br className="d-md-none" />
                                            <div className="history-status-wrapper">
                                                <span className="history-status">
                                                    {statusToText[item.status]}
                                                </span>
                                            </div>
                                        </Col>
                                    </div>
                                </Row>
                            </Fragment>
                        ))}
                </div>
            </div>
        </div>
    );
}

PureHistory.propTypes = {
    history: PropTypes.shape({
        data: PropTypes.array,
    }),
    actionLoading: PropTypes.bool,
    getHistory: PropTypes.func
};

const mapStateToProps = (state) => ({
    history: state.admin.history,
    actionLoading: state.admin.actionLoading,
});

const mapDispatchToProps = (dispatch) => ({
    getHistory: () => dispatch(getHistory()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PureDealerManagement);
