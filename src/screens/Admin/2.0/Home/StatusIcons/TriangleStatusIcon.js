import PropTypes from 'prop-types';
import React from 'react';

export const TriangleStatusIcon = ({ fill, symbol }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="31.725" height="25.053">
            <g data-name="Group 1403">
                <g data-name="Group 1387">
                    <g data-name="Group 1386">
                        <path
                            data-name="Path 799"
                            d="m1027.959 544.548 14.5 22.9h-29z"
                            transform="translate(-1012.096 -543.146)"
                            style={{
                                fill: fill ? '#e6cf0e' : 'none',
                                stroke: '#e6cf0e',
                                strokeMiterlimit: 10,
                                strokeWidth: '1.5px',
                            }}
                        />
                    </g>
                </g>
                <text
                    transform="translate(12.184 20.167)"
                    style={{
                        fill: '#fff',
                        fontSize: '12px',
                        fontFamily: 'Lato-Bold,Lato',
                        fontWeight: 700,
                        isolation: 'isolate',
                    }}
                >
                    <tspan x="0" y="0">
                        {symbol}
                    </tspan>
                </text>
            </g>
        </svg>
    );
};

TriangleStatusIcon.propTypes = {
    symbol: PropTypes.string.isRequired,
    fill: PropTypes.bool.isRequired,
};
