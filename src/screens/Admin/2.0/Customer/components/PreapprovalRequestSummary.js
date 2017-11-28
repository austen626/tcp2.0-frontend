import StatusIcon from '../../Home/components/StatusIcons/StatusIcon';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export function PreapprovalRequestSummary({ order }) {
    return (
        <div className="preapproval-request-summary color-text">
            <div className="preapproval-item">
                <p className="color-name">Food:</p>
                <p>
                    <StatusIcon
                        symbol="P"
                        mode={order.food_review_mode}
                        status={order.food_status}
                    />
                </p>
                <p>
                    <span className="color-name">Earliest delivery date</span>
                    <br />
                    <span className="text-white">
                        {moment(order.food_date).format('MM/DD/YY')}
                    </span>
                </p>
            </div>
            <div className="preapproval-item">
                <p className="color-name">Appliance</p>
                <p>
                    <StatusIcon
                        symbol="P"
                        mode={order.other_review_mode}
                        status={order.other_status}
                    />
                </p>
            </div>
        </div>
    );
}

PreapprovalRequestSummary.propTypes = {
    order: PropTypes.object.isRequired,
};
