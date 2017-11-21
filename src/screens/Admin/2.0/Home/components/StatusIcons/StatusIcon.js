import React from 'react';
import PropTypes from 'prop-types';
import { CircleStatusIcon } from './CircleStatusIcon';
import { TriangleStatusIcon } from './TriangleStatusIcon';
import { HexagonStatusIcon } from './HexagonStatusIcon';

export default function StatusIcon({ symbol, mode, status }) {
    const fill = mode === 'auto';
    if (status === 'approval') {
        return <CircleStatusIcon symbol={symbol} fill={fill} />;
    } else if (status === 'in-process') {
        return <TriangleStatusIcon symbol={symbol} fill={fill} />;
    } else if (status === 'rejection') {
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
