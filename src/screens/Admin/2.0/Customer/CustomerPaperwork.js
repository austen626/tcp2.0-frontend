import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    IconAwesomePenFancy,
    IconAwesomePenFancyRight,
    IconEnvelopeClosed,
    IconEnvelopeOpen,
} from '../../../../assets/images';

function PaperworkRow({ paperwork }) {
    const renderSale = (paperwork) => {
        if (!paperwork.funded) {
            return (
                <>
                    Purchase: ${paperwork.balance}
                    <br />
                    {paperwork.document_signed ? (
                        <img src={IconAwesomePenFancyRight} />
                    ) : (
                        <img src={IconAwesomePenFancy} />
                    )}
                    <span className="mx-2">|</span>
                    {paperwork.document_delivered ? (
                        <img src={IconEnvelopeOpen} />
                    ) : (
                        <img src={IconEnvelopeClosed} />
                    )}
                </>
            );
        } else {
            return <>Purchase: ${paperwork.balance}</>;
        }
    };

    const renderPreapproval = (paperwork) => {
        return 'Credit App';
    };

    return (
        <div className="single-row">
            <div
                className={`d-flex paperwork-row ${
                    !paperwork.funded && paperwork.type === 'sale'
                        ? 'small-padding'
                        : ''
                }`}
            >
                <Col className="paperwork-title">
                    {paperwork.type === 'sale'
                        ? renderSale(paperwork)
                        : renderPreapproval(paperwork)}
                </Col>
                <Col
                    className={`paperwork-date text-right ${
                        paperwork.type === 'sale' && paperwork.funded === false
                            ? 'text-white'
                            : ''
                    }`}
                >
                    {moment(paperwork.date).format('MM/DD/YY')}
                </Col>
            </div>
        </div>
    );
}

PaperworkRow.propTypes = {
    paperwork: PropTypes.object.isRequired,
};

export default function CustomerPaperwork({ paperworks }) {
    const renderPaperWorks = (paperworks) =>
        paperworks.map((paperwork) => (
            <PaperworkRow key={paperwork.id} paperwork={paperwork} />
        ));

    return (
        <div className="customer-paperwork-wrapper list">
            {renderPaperWorks(paperworks)}
        </div>
    );
}

CustomerPaperwork.propTypes = {
    paperworks: PropTypes.array.isRequired,
};
