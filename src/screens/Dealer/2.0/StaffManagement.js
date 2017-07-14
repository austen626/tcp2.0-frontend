import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../../components/Dealer/Header';
import { Form, Row, Col } from 'react-bootstrap';
import { TCPLogo, IconAdd, IconArrowLeft, IconDeleteNew } from '../../../assets/images';
import Loader from 'shared/Loader';

import { setStaff, getStaffs,deleteStaff } from '../../../redux/actions/dealer';

function StaffManagements(props) {

    const {
        history,
        staffs,
        getStaffs,
        setStaff,
        deleteStaff,
        actionLoading
    } = props;

    const [openStaffIndex, setOpenStaffIndex] = useState(null);
    const [search, setSearch] = useState(null);
    const [filterStaff, setFilterStaff] = useState([]);

    useEffect(() => {
        getStaffs();
    }, []);

    useEffect(() => {
        if(search != null && search != '') {
            let temp = staffs.data.filter(d => d.first_name.toLowerCase().includes(search.toLowerCase()))
            setFilterStaff(temp);
        }
        else {
            setFilterStaff(staffs.data);
        }
    }, [search]);

    useEffect(() => {
        setFilterStaff(staffs.data);
    }, [staffs]);

    const handleArrowBack = () => {       
        history.push('/')
    }

    const handleAddEditStaff = (item) => {  
        setStaff(item)     
        history.push(`/dealer/addStaff`);
    }

    const handleDeleteStaff = (item) => {  
        Swal.fire({
            title: 'Delete '+item.first_name+' '+item.last_name+'?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteStaff(item.id)
            }
        })
    }

    const handleOpenStaffAction = (staff) => {
        if('map'+staff.id === openStaffIndex) 
            setOpenStaffIndex(null) 
        else 
            setOpenStaffIndex('map'+staff.id)
    };

    const IconSmallArrowRight = (props) => {
        return (
            <svg className={`arrow-icon ${props.id === openStaffIndex && "arrow-icon-active"}`} enableBackground="new 0 0 12 12" height="12px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px">
                <path d="M24.291,14.276L14.705,4.69c-0.878-0.878-2.317-0.878-3.195,0l-0.8,0.8c-0.878,0.877-0.878,2.316,0,3.194  L18.024,16l-7.315,7.315c-0.878,0.878-0.878,2.317,0,3.194l0.8,0.8c0.878,0.879,2.317,0.879,3.195,0l9.586-9.587  c0.472-0.471,0.682-1.103,0.647-1.723C24.973,15.38,24.763,14.748,24.291,14.276z"/>
            </svg>
        )
    }

    return (
        <div className="dealer">

            { staffs.loading && <Loader /> }

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
                    <img src={IconAdd} onClick={() => handleAddEditStaff({})} alt=""/>
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
                    <div className="list">
                    { filterStaff && filterStaff.map((item) => (
                        <>
                            <Row key={item.id} className="single-row" onClick={() => handleOpenStaffAction(item)}>
                                <div className="dealer-row">
                                    <Col xs={6}>
                                        <span className="dealer-name">{item.first_name} {item.last_name}</span>
                                    </Col>
                                    <Col xs={6} className="dealer-action">
                                        <span className="staff_identifier">
                                            {item.role[0] === "sales" ? "S" : "D"}
                                        </span>
                                        <span><IconSmallArrowRight id={ 'map'+item.id }/></span>
                                    </Col>
                                </div>
                                {(openStaffIndex ===  ('map'+item.id)) && (
                                    <Col key={item.id} xs={12} className="single-row-details">
                                        <button className="delete" onClick={() => handleDeleteStaff(item)}>
                                            <img src={IconDeleteNew} alt=""/> Delete
                                        </button>
                                        <button className="edit" onClick={() => handleAddEditStaff(item)}>Edit</button>
                                    </Col>
                                )}
                            </Row>
                        </>
                    ))}
                </div>
            </div>

        </div>
    )
    
}

const mapStateToProps = state => ({
    staffs: state.dealer.staffs,
    actionLoading: state.dealer.actionLoading
});

const mapDispatchToProps = dispatch => ({
    getStaffs: () => dispatch(getStaffs()),
    setStaff: (data) => dispatch(setStaff(data)),
    deleteStaff: (id) => dispatch(deleteStaff(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StaffManagements);