import { CircleStatusIcon } from './CircleStatusIcon';
import { TriangleStatusIcon } from './TriangleStatusIcon';
import { HexagonStatusIcon } from './HexagonStatusIcon';
import React from 'react';

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
