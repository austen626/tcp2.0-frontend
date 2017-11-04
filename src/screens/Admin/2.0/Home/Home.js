import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'react-bootstrap';
import Loader from 'shared/Loader';
import {
    TCPLogo,
    IconMenu,
    IconDeleteNew,
    IconSearchAdmin,
} from '../../../../assets/images';

import Header, {
    HeaderLeft,
    HeaderCenter,
    HeaderRight,
} from '../../../../components/Dealer/Header';
import { SliderContainer, SliderItem } from '../../style';
import { getDealers } from '../../../../redux/actions/admin';
import { ExpandIcon } from './ExpandIcon';
import { DealerRow } from './DealerRow';

export function PureAdminHome(props) {
    const OPTION_FUNDING = 'funding';
    const OPTION_REVIEW = 'review';

    const {
        history,
        dealers,
        getDealers,
        setDealer,
        deleteDealer,
        actionLoading,
    } = props;

    const [openDealerIndex, setOpenDealerIndex] = useState(null);
    const [search, setSearch] = useState('');
    const [filterDealer, setFilterDealer] = useState([]);
    const [activeOption, setActiveOption] = useState(OPTION_FUNDING);

    useEffect(() => {
        getDealers();
    }, []);

    useEffect(() => {}, [activeOption]);

    useEffect(() => {
        if (search != null && search !== '') {
            let temp = dealers.data.filter((d) =>
                d.company_name.toLowerCase().includes(search.toLowerCase())
            );
            setFilterDealer(temp);
        } else {
            setFilterDealer(dealers.data);
        }
    }, [search]);

    useEffect(() => {
        setFilterDealer(dealers.data);
    }, [dealers]);

    const handleArrowBack = () => {
        history.push('/');
    };

    const handleOpenDealerAction = (dealer) => {
        if (toOpenIndex(dealer.id) === openDealerIndex)
            setOpenDealerIndex(null);
        else setOpenDealerIndex(toOpenIndex(dealer.id));
    };

    const handleClickOption = (option) => {
        setActiveOption(option);
    };

    const renderDealers = (dealers) => {
        return dealers.map((item) => (
            <DealerRow
                key={item.id}
                expanded={openDealerIndex === toOpenIndex(item.id)}
                data={item}
                onClick={handleOpenDealerAction}
            />
        ));
    };

    const toOpenIndex = (id) => {
        return 'map' + id;
    };

    return (
        <div className="admin">
            {dealers.loading && <Loader />}

            {actionLoading && <Loader />}

            <Header>
                <HeaderLeft>
                    <img
                        className="icon-menu"
                        src={IconMenu}
                        onClick={() => handleArrowBack()}
                        alt=""
                    />
                </HeaderLeft>
                <HeaderCenter>
                    <div className="header-main">
                        <img className="main-logo" src={TCPLogo} alt="" />
                    </div>
                </HeaderCenter>
                <HeaderRight>
                    <img src={IconSearchAdmin} alt="" />
                </HeaderRight>
            </Header>

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

            <div className="main">
                <div className="list with-footer">
                    {filterDealer && renderDealers(filterDealer)}
                </div>
                <div className="footer-container padding-40px">
                    <SliderContainer>
                        <SliderItem
                            className="col-6"
                            active={activeOption === OPTION_FUNDING}
                            onClick={() => handleClickOption(OPTION_FUNDING)}
                        >
                            <div className="slider-item--left">
                                <span className="badge-icon">5</span>
                            </div>
                            Review
                        </SliderItem>
                        <SliderItem
                            className="col-6"
                            active={activeOption === OPTION_REVIEW}
                            onClick={() => handleClickOption(OPTION_REVIEW)}
                        >
                            Funding
                            <div className="slider-item--right">
                                <span className="badge-icon">8</span>
                            </div>
                        </SliderItem>
                    </SliderContainer>
                </div>
            </div>
        </div>
    );
}

PureAdminHome.propTypes = {
    history: PropTypes.object,
    dealers: PropTypes.array,
    actionLoading: PropTypes.bool.isRequired,
    getDealers: PropTypes.func.isRequired,
    setDealer: PropTypes.func.isRequired,
    deleteDealer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    dealers: state.admin.dealers,
    actionLoading: state.admin.actionLoading,
});

const mapDispatchToProps = (dispatch) => ({
    getDealers: () => dispatch(getDealers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PureAdminHome);
