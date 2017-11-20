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
import { CircledImageButton, SliderContainer, SliderItem } from '../../style';
import { getDealers } from '../../../../redux/actions/admin';
import { ExpandIcon } from './ExpandIcon';
import { DealerRow } from './DealerRow';
import { SideMenu } from './SideMenu';

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

    const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [filterDealer, setFilterDealer] = useState([]);
    const [activeOption, setActiveOption] = useState(OPTION_FUNDING);
    const [expandedDealers, setExpandedDealers] = useState({});

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
        setExpandedDealers({});
        setFilterDealer(dealers.data);
    }, [dealers]);

    const handleClickOption = (option) => {
        if (option === OPTION_FUNDING) {
            const activeIndex = filterDealer.findIndex(
                (dealer) => expandedDealers[toOpenIndex(dealer.id)]
            );
            if (activeIndex > -1) {
                filterDealer.forEach((dealer) => {
                    expandedDealers[toOpenIndex(dealer.id)] = false;
                });
            } else {
                filterDealer.forEach((dealer) => {
                    if (dealer.num_customers === 0) return;
                    expandedDealers[toOpenIndex(dealer.id)] = true;
                });
            }

            setExpandedDealers({ ...expandedDealers });
        }
        setActiveOption(option);
    };

    const handleOpenDealerAction = (dealer) => {
        if (dealer.num_customers > 0) {
            const key = toOpenIndex(dealer.id);
            const currentValue = expandedDealers[key];
            setExpandedDealers({
                ...expandedDealers,
                [key]: !currentValue,
            });
        }
    };

    const handleClickSearch = () => {
        setIsSearchBarVisible(!isSearchBarVisible);
    };

    const renderDealers = (dealers) => {
        return dealers.map((item) => (
            <DealerRow
                key={item.id}
                data={item}
                expanded={expandedDealers[toOpenIndex(item.id)]}
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
                    <SideMenu />
                </HeaderLeft>
                <HeaderCenter>
                    <div className="header-main">
                        <img className="main-logo" src={TCPLogo} alt="" />
                    </div>
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
                <div className="list with-footer">
                    {filterDealer && renderDealers(filterDealer)}
                </div>
                <div className="footer-container p-3">
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
