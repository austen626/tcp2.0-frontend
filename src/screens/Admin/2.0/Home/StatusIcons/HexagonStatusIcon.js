import PropTypes from 'prop-types';
import React from 'react';

export const HexagonStatusIcon = ({ fill, symbol }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25.173"
            height="25.173"
            viewBox="0 0 25.173 25.173"
        >
            <g
                id="Group_1521"
                data-name="Group 1521"
                transform="translate(1 1)"
            >
                <path
                    id="Path_827"
                    data-name="Path 827"
                    d="M1030.19,637.741h-9.6l-6.787,6.787v9.6l6.787,6.787h9.6l6.787-6.787v-9.6Z"
                    transform="translate(-1013.805 -637.741)"
                    fill={fill ? '#3d566a' : 'none'}
                    stroke="#3d566a"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                />
                <text
                    id="P"
                    transform="translate(7.845 16.836)"
                    fill="#fff"
                    fontSize="15"
                    fontFamily="Lato-Bold, Lato"
                    fontWeight="700"
                    style={{ isolation: 'isolate' }}
                >
                    <tspan x="0" y="0">
                        {symbol}
                    </tspan>
                </text>
            </g>
        </svg>
    );
};

HexagonStatusIcon.propTypes = {
    symbol: PropTypes.string.isRequired,
    fill: PropTypes.bool.isRequired,
};
