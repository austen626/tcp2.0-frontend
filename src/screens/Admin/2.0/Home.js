import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../../components/Dealer/Header';
import { Form, Row, Col } from 'react-bootstrap';
import { TCPLogo, IconAdd, IconArrowLeft, IconDeleteNew } from '../../../assets/images';
import Loader from 'shared/Loader';

import {SliderContainer, SliderItem} from "../style";

function AdminHome(props) {
  const OPTION_FUNDING = 'funding';
  const OPTION_REVIEW = 'review';

  const {
    history,
    dealers,
    getDealers,
    setDealer,
    deleteDealer,
    actionLoading
  } = props;

  const [openDealerIndex, setOpenDealerIndex] = useState(null);
  const [search, setSearch] = useState(null);
  const [filterDealer, setFilterDealer] = useState([]);
  const [activeOption, setActiveOption] = useState(OPTION_FUNDING);

  useEffect(() => {
    getDealers();
  }, []);

  useEffect(() => {
  }, [activeOption]);

  useEffect(() => {
    if(search != null && search !== '') {
      let temp = dealers.data.filter(d => d.company_name.toLowerCase().includes(search.toLowerCase()))
      setFilterDealer(temp);
    }
    else {
      setFilterDealer(dealers.data);
    }
  }, [search]);

  useEffect(() => {
    setFilterDealer(dealers.data);
  }, [dealers]);

  const handleArrowBack = () => {
    history.push('/')
  }

  const handleOpenDealerAction = (dealer) => {
    if('map'+dealer.id === openDealerIndex)
      setOpenDealerIndex(null)
    else
      setOpenDealerIndex('map'+dealer.id)
  };

  const IconSmallArrowRight = (props) => {
    return (
      <svg className={`arrow-icon ${props.id === openDealerIndex && "arrow-icon-active"}`} enableBackground="new 0 0 12 12" height="12px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px">
        <path d="M24.291,14.276L14.705,4.69c-0.878-0.878-2.317-0.878-3.195,0l-0.8,0.8c-0.878,0.877-0.878,2.316,0,3.194  L18.024,16l-7.315,7.315c-0.878,0.878-0.878,2.317,0,3.194l0.8,0.8c0.878,0.879,2.317,0.879,3.195,0l9.586-9.587  c0.472-0.471,0.682-1.103,0.647-1.723C24.973,15.38,24.763,14.748,24.291,14.276z"/>
      </svg>
    )
  }

  const handleClickOption = (option) => {
    setActiveOption(option);
  }

  return (
    <div className="dealer">

      { dealers.loading && <Loader /> }

      { actionLoading && <Loader /> }

      <Header>
        <HeaderLeft>
          <img src={IconArrowLeft} onClick={() => handleArrowBack()} alt=""/>
        </HeaderLeft>
        <HeaderCenter>
          <div className="header-main">
            <img className="main-logo" src={TCPLogo} alt=""/>
          </div>
        </HeaderCenter>
        <HeaderRight>
          <img src={IconAdd} onClick={() => handleAddEditDealer({})} alt=""/>
        </HeaderRight>
      </Header>

      <div className="search-header">
        <form action="javascript:void(0)">
          <Form.Group>
            <Form.Control value={search} placeholder="Search" onChange={(e) => setSearch(e.target.value)}></Form.Control>
          </Form.Group>
        </form>
      </div>

      <div className="main">
        <div className="list with-footer">
          { filterDealer && filterDealer.map((item) => (
            <React.Fragment key={item.id}>
              <Row key={item.id} className="single-row" onClick={() => handleOpenDealerAction(item)}>
                <div className="dealer-row">
                  <Col xs={6}>
                    <span className="dealer-name">{item.company_name}</span>
                  </Col>
                  <Col xs={6} className="dealer-action">
                    <span><IconSmallArrowRight id={ 'map'+item.id }/></span>
                  </Col>
                </div>
                {(openDealerIndex ===  ('map'+item.id)) && (
                  <Col key={item.id} xs={12} className="single-row-details">
                    <button className="delete" onClick={() => handleDeleteDealer(item)}>
                      <img src={IconDeleteNew} alt=""/> Delete
                    </button>
                    <button className="edit" onClick={() => handleAddEditDealer(item)}>Edit</button>
                  </Col>
                )}
              </Row>
            </React.Fragment>
          ))}
        </div>
        <div className="footer-container padding-40px">
          <SliderContainer>
            <SliderItem
              className="col-6"
              active={activeOption === OPTION_FUNDING}
              onClick={() => handleClickOption(OPTION_FUNDING)}
            >
              <div className="slider-item--left">
                <span className="badge-icon">5</span>
              </div>
              Review
            </SliderItem>
            <SliderItem
              className="col-6"
              active={activeOption === OPTION_REVIEW}
              onClick={() => handleClickOption(OPTION_REVIEW)}
            >
              Funding
              <div className="slider-item--right">
                <span className="badge-icon">8</span>
              </div>
            </SliderItem>
          </SliderContainer>
        </div>
      </div>
    </div>
  )

}

const mapStateToProps = state => ({
  dealers: state.admin.dealers,
  actionLoading: state.admin.actionLoading
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminHome);
