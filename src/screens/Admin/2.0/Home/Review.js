import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    deleteDealer,
    getDealers,
    setDealer,
} from '../../../../redux/actions/admin';
import { Form } from 'react-bootstrap';
import { HomeTabBar } from './components/HomeTabBar';
import { DealerRow } from './components/DealerRow';
import Header, {
    HeaderCenter,
    HeaderLeft,
    HeaderRight,
} from '../../../../components/Dealer/Header';
import { SideMenu } from './components/SideMenu';
import { IconSearchAdmin, TCPLogo } from '../../../../assets/images';
import { CircledImageButton } from '../../style';

export function PureReview({
    history,
    dealers,
    getDealers,
    setDealer,
    deleteDealer,
    setExpandHandler,
}) {
    const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [filterDealer, setFilterDealer] = useState([]);
    const [expandedDealers, setExpandedDealers] = useState({});

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

    useEffect(() => {
        setExpandHandler && setExpandHandler(handleExpand);
        return () => {
            setExpandHandler && setExpandHandler(() => {});
        };
    });

    const handleExpand = () => {
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
                dealer={item}
                expanded={expandedDealers[toOpenIndex(item.id)]}
                onClick={handleOpenDealerAction}
            />
        ));
    };

    const toOpenIndex = (id) => {
        return 'map' + id;
    };

    return (
        <>
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
                <div className="list">
                    {filterDealer && renderDealers(filterDealer)}
                </div>
            </div>
        </>
    );
}

PureReview.propTypes = {
    history: PropTypes.object,
    dealers: PropTypes.object,
    getDealers: PropTypes.func.isRequired,
    setDealer: PropTypes.func.isRequired,
    deleteDealer: PropTypes.func.isRequired,
    setExpandHandler: PropTypes.func,
};

const mapStateToProps = (state) => ({
    dealers: state.admin.dealers,
});

const mapDispatchToProps = (dispatch) => ({
    getDealers: () => dispatch(getDealers()),
    setDealer: (item) => dispatch(setDealer(item)),
    deleteDealer: (id) => dispatch(deleteDealer(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PureReview);
