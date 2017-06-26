import React from 'react';
import PropTypes from 'prop-types';
import { DivLoaderConainer } from './style';
const SmallInnerDiv = (props) => {
    const { classValue } = props;
    return (
        <div xs="12" className={ classValue }>
            <DivLoaderConainer className="d-flex justify-content-center">
                <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </DivLoaderConainer>
        </div>
    )
}
SmallInnerDiv.propTypes = {
    classValue: PropTypes.string
}
export default SmallInnerDiv;
