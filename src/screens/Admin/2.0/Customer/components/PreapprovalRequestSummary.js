import StatusIcon from '../../Home/components/StatusIcons/StatusIcon';
import React from 'react';
import PropTypes from 'prop-types';

export function PreapprovalRequestSummary({ order }) {
    return (
        <div className="preapproval-request-summary color-text">
            <div className="preapproval-request-summary--food">
                <div>Food:</div>
                <StatusIcon
                    symbol="P"
                    mode={order.food_review_mode}
                    status={order.food_status}
                />
            </div>
            <div className="preapproval-request-summary--food">
                <div>Appliance</div>
                <StatusIcon
                    symbol="P"
                    mode={order.other_review_mode}
                    status={order.other_status}
                />
            </div>
        </div>
    );
}

PreapprovalRequestSummary.propTypes = {
    order: PropTypes.object.isRequired,
};
