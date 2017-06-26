import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { IconSearchInActive } from '../../assets/images';
import { SearchBoxContainer, ErrorBox } from './style';
const SearchBox = (props) => {
    const { 
        nameSearch, 
        citySearch,
        nameChangeEvent,
        cityChangeEvent,
        handleSearchClick,
        errorMessage
    } = props;
    return (
        
        <Form onSubmit={handleSearchClick}>          
            <SearchBoxContainer className="customer-search">            
                <div id="header">
                    <span>CUSTOMER SEARCH</span>
                    <div id="icon">
                        <img src={IconSearchInActive} onClick={ handleSearchClick } alt="" />
                    </div>
                </div>
                <div id="form">
                    {
                        <ErrorBox> { errorMessage &&                   
                            <span className="text-danger">{ errorMessage }</span> 
                            }
                        </ErrorBox>                   
                    }
                    
                    <Form.Group className="mb-18">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Label className="form-label-required">required</Form.Label>
                        <Form.Control value={nameSearch} onChange={ nameChangeEvent }></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Label className="form-label-required">optional</Form.Label>
                        <Form.Control value={citySearch} onChange={ cityChangeEvent }></Form.Control>
                    </Form.Group>
                </div>
                <button type="submit" style={{"display": "none"}} />
            </SearchBoxContainer>
        </Form>
    )
}

SearchBox.propTypes = {
    nameSearch: PropTypes.string,
    citySearch: PropTypes.string,
    nameChangeEvent: PropTypes.func,
    cityChangeEvent: PropTypes.func,
    handleSearchClick: PropTypes.func,
    errorMessage: PropTypes.string,
};

export default SearchBox;