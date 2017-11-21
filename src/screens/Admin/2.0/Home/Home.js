import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'shared/Loader';
import { getDealers } from '../../../../redux/actions/admin';
import { HomeTabBar } from './components/HomeTabBar';
import Review from './Review';
import Funding from './Funding';

export function PureAdminHome(props) {
    const [activeTab, setActiveTab] = useState(0);
    const { dealers, getDealers, actionLoading } = props;
    const reviewHandlerRef = useRef(() => {});

    useEffect(() => {
        getDealers();
    }, []);

    useEffect(() => {}, [activeTab]);

    const handleClickTab = (tab) => {
        if (tab === 0 && activeTab === tab) {
            reviewHandlerRef.current.call();
        }
        setActiveTab(tab);
    };

    const handleExpandHandler = (func) => {
        reviewHandlerRef.current = func;
    };

    return (
        <div className="admin">
            {dealers.loading && <Loader />}

            {actionLoading && <Loader />}
            {activeTab === 0 ? (
                <Review setExpandHandler={handleExpandHandler} />
            ) : (
                <Funding />
            )}

            <HomeTabBar
                activeTab={activeTab}
                badges={[5, 8]}
                onClickTab={handleClickTab}
            />
        </div>
    );
}

PureAdminHome.propTypes = {
    dealers: PropTypes.object,
    actionLoading: PropTypes.bool.isRequired,
    getDealers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    dealers: state.admin.dealers,
    actionLoading: state.admin.actionLoading,
});

const mapDispatchToProps = (dispatch) => ({
    getDealers: () => dispatch(getDealers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PureAdminHome);
