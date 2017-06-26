import React from 'react';
import PropTypes from 'prop-types';
import { CustomerListContainer } from './style';
import Loader from 'shared/Loader';
const CustomerModalList = (props) => {
    const { customers, setCancel, handleSearchRowClick, reorderPage } = props;
    return (
        <CustomerListContainer className="search-modal">
            <div className="status-bar">
                <div id="status">
                    { customers.loading && <Loader /> }                    
                    { !customers.loading && <span className="result-count"> { customers.data.length || 0 } matches found...</span> }
                </div>
                <div id="action">
                    <div className="cancel-button" onClick={ setCancel }>
                        CANCEL
                    </div>
                </div>
            </div>
            <div className="search-data">
                { customers?.data?.map(item => (
                    <div
                        key={item["id"]}
                        className="search-row"
                        onClick={() => handleSearchRowClick(item)}
                    >
                        <div className="customer-name">
                            {
                            reorderPage ? item.name : item["Firstname1"] +" "+ item["Lastname1"] }</div>
                                <div className="customer-address">
                                    { 
                                        reorderPage ? item["street"] :   item["Street_Address1"]
                                    }
                                </div>
                                <div className="customer-address">
                                    {
                                        reorderPage ? item["city"]  +", "+ item["state"] + ", " + item["zip"] :
                                        item["City"]  +", "+ item["State"] +", " + item["Zip"]
                                    }
                                </div>
                    </div>
                )) }
            </div>
        </CustomerListContainer>
    )
}

CustomerModalList.propTypes = {
    customers: PropTypes.object,
    setCancel: PropTypes.func,
    handleSearchRowClick: PropTypes.func
};

export default CustomerModalList;