import PropTypes from 'prop-types';
import React from 'react';

export const CircleStatusIcon = ({ fill, symbol }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="27.733" height="27.734">
            <g data-name="Group 1404">
                <g data-name="Group 1392">
                    <g data-name="Group 800" transform="translate(.75 .75)">
                        <circle
                            data-name="Ellipse 5"
                            cx="13.117"
                            cy="13.117"
                            style={{
                                fill: fill ? '#009d86' : 'none',
                                stroke: '#009d86',
                                strokeMiterlimit: 10,
                                strokeWidth: '1.5px',
                            }}
                            r="13.117"
                        />
                    </g>
                </g>
                <text
                    transform="translate(10.071 18.779)"
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

CircleStatusIcon.propTypes = {
    fill: PropTypes.bool.isRequired,
    symbol: PropTypes.string.isRequired,
};

CircleStatusIcon.defaultProps = {
    fill: false,
};
