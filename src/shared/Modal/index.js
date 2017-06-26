/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

const ModalView = (props) => {
    const {
      	openModal,
        submitHandler,
        handleSubmit,
        firstBtnName,
        secondBtnName,
        children,
        headerTitle,
        toggleModal,
        className,
        size,
        footerClass,
        headerClass,
        center,
        hideFooter,
        handleClick,
        hideHeader
    } = props;
    return (
        <Modal show={ openModal } onHide={ toggleModal } className={ className } size={ size } centered={ center }>
            {
                !hideHeader && 
                <Modal.Header toggle={ toggleModal } className={ headerClass }>{headerTitle}</Modal.Header>
            }
            <Modal.Body>
                {children}
            </Modal.Body>
            { !hideFooter &&
                <Modal.Footer className={ footerClass }>
                    <div>
                        <Button color="secondary" onClick={ toggleModal }>{firstBtnName}</Button>
                        <Button color="primary" type="submit"
                            onClick={
                                handleSubmit ? handleSubmit(submitHandler) : handleClick
                            }
                        >{secondBtnName}</Button>

                    </div>

                </Modal.Footer>
            }
        </Modal>
    )
};

ModalView.propTypes = {
    openModal: PropTypes.bool,
    handleSubmit: PropTypes.func,
    submitHandler: PropTypes.func,
    firstBtnName: PropTypes.string,
    secondBtnName: PropTypes.string,
    children: PropTypes.object,
    size: PropTypes.string,
    headerTitle: PropTypes.string,
    toggleModal: PropTypes.func,
    className: PropTypes.string,
    footerClass: PropTypes.string,
    headerClass: PropTypes.string,
    center: PropTypes.bool,
    hideFooter: PropTypes.bool,
    handleClick: PropTypes.func,
    hideHeader: PropTypes.bool
}
export default ModalView;