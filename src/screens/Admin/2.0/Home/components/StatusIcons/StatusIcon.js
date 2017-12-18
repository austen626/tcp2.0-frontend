import React from 'react';
import PropTypes from 'prop-types';
import { CircleStatusIcon } from './CircleStatusIcon';
import { TriangleStatusIcon } from './TriangleStatusIcon';
import { HexagonStatusIcon } from './HexagonStatusIcon';
import { statusApproval, statusInProcess, statusRejection } from '../../../../constant';

export default function StatusIcon({ symbol, mode, status }) {
    const fill = mode === 'auto';
    if (status === statusApproval) {
        return <CircleStatusIcon symbol={symbol} fill={fill} />;
    } else if (status === statusInProcess) {
        return <TriangleStatusIcon symbol={symbol} fill={fill} />;
    } else if (status === statusRejection) {
        return <HexagonStatusIcon symbol={symbol} fill={fill} />;
    } else {
        return <></>;
    }
}

StatusIcon.propTypes = {
    symbol: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
};
