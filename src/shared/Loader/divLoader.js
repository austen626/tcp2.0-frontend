import React from 'react';
import { DivLoaderConainer } from './style';
const DivLoader = () => {
    return (
        <div xs="12" className="">
            <DivLoaderConainer className="d-flex justify-content-center">
                <div className="spinner-border text-info" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </DivLoaderConainer>
        </div>
    )
}

export default DivLoader;
