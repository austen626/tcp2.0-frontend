import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Modal, Button } from 'react-bootstrap';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../components/Dealer/Header';
import InviteModal from './InviteModal';
import { 
    IconStatusWaiting, 
    IconStatusConfirmed, 
    IconArrowLeft, 
    IconHome, 
} from '../../assets/images';
import { getStaffRequest, deleteStaffRequest, inviteStaffRequest } from '../../redux/actions/userAction';
import { AddIcon, GrayTrashIcon } from './imageFiles';
import { ExpandedWhiteDiv, ExpandFullView, StaffContainer } from './style.js'
import Loader from 'shared/Loader';

class HomeScreen extends Component {

    sidebarRef = React.createRef();

    state = {
        searchClicked: false,
        searchVal: "",
        optionPaymentIndexOpen: null,
        openInviteModal: false,
        displayView: null,
        backModal: false,
        deleteId: null
    }

    componentDidMount() {
        const { getStaffRequest } = this.props;
        getStaffRequest()
    }

    handleArrowBack = () => {
        this.props.history.push('/');
    }

    handleInviteClick = () => {
        this.setState({
            openInviteModal: true
        })
    }   
    

    handleAppClick = (appId) => {
        this.props.getAppDetailById(appId);
        this.props.history.push(`/app-details/${appId}`);
    }

    displayHideView = (mapId) => {
        const { displayView } = this.state;
        if(mapId === displayView) {
            this.setState({
                displayView: null,
            });
        } else {
            this.setState({
                displayView: mapId,
            });
        }
    }

    deleteStaffAction = (deleteId) => {
        this.setState({
            deleteId: deleteId,
            backModal: true
        })
    }

    handleBackModalClose = () => {
        this.setState({ backModal: false });
    }

    handleBackModalYes = () => {
        const { deleteId } = this.state;
        this.setState({ backModal: false });
        const { getStaffRequest, deleteStaffRequest } = this.props;
        deleteStaffRequest({
            deleteDivId: deleteId,
            getStaffRequest: getStaffRequest,
        })
    }

    toggleModal = () => {
        const { openInviteModal } = this.state;
        this.setState({
            openInviteModal: !openInviteModal
        })
    }

    redirectToSales = (item) => {
        const { history } = this.props;
        history.push(`sales-list/all?salesId=${ item.email }`);
    }
    render() {
        const { inviteStaffRequest } = this.props;
        const { searchVal, displayView } = this.state;
        const { staffData, isStaffLoading, isStaffDeleteLoading, isInviteLoading } = this.props.user;
        let filterData = staffData;
        if (searchVal !== '') {
            filterData = filterData.filter(app => {
                return ((app.name && app.name.toLowerCase().includes(searchVal.toLowerCase())) || (app.email.toLowerCase().includes(searchVal.toLowerCase())))
            })
        }
        // console.log(filterData, searchVal)
        const IconSmallArrowRight = (props) => {
            return (
                <svg className={`arrow-icon ${props.id === displayView && "arrow-icon-active"}`} enableBackground="new 0 0 12 12" height="12px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px">
                    <path d="M24.291,14.276L14.705,4.69c-0.878-0.878-2.317-0.878-3.195,0l-0.8,0.8c-0.878,0.877-0.878,2.316,0,3.194  L18.024,16l-7.315,7.315c-0.878,0.878-0.878,2.317,0,3.194l0.8,0.8c0.878,0.879,2.317,0.879,3.195,0l9.586-9.587  c0.472-0.471,0.682-1.103,0.647-1.723C24.973,15.38,24.763,14.748,24.291,14.276z"/>
                </svg>
            )
        }

        return (
            <StaffContainer className="dealer">
                <Header>
                    <HeaderLeft>
                        <img src={IconArrowLeft} onClick={this.handleArrowBack} alt=""/>
                        <img src={IconHome} alt="home" className="logo-home" onClick={() => {this.props.history.replace('/');}} />
                    </HeaderLeft>
                    <HeaderCenter>
                        <span>STAFF MANAGEMENT</span>
                    </HeaderCenter>
                    <HeaderRight>
                       <AddIcon clickEvent={this.handleInviteClick} />
                    </HeaderRight>
                </Header>
                <div className="preapproval-main">
                    {
                        (isStaffLoading || isStaffDeleteLoading || isInviteLoading) && <Loader />
                    }
                    <div className="dealer-list-search">
                        <Form.Control
                            placeholder="Search"
                            value={this.state.searchVal}
                            onChange={(e) => this.setState({ searchVal: e.target.value })}
                        />
                    </div>
                    {
                        filterData && filterData.map((item, index) => {
                            return (
                                <ExpandedWhiteDiv className={`request-row ${index%2 === 0 && "dark"}`} key={ index }>
                                    <div className="expand-row" >
                                        <div className="expand-single-box" onClick = {() => this.displayHideView('appIndex' + index)}>
                                            
                                            <div className="loan">
                                                <div className="info">
                                                    {
                                                        item.first_name ? `${item.first_name} ${item.last_name}` : 'Name - Not Available'
                                                    }
                                                </div>
                                            </div>
                                            <span><IconSmallArrowRight id={ `appIndex${ index }` } /></span>
                                        </div>
                                        {
                                            displayView === ('appIndex' + index) &&
                                            <ExpandFullView>
                                                <div className="avatar-section align-self-center">
                                                    <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/user-male-alt-icon.png" alt="" />
                                                </div> 
                                                <div className="exapand-mail-section text-center">
                                                    <div className="expand-mail-text">
                                                        { item.email }
                                                    </div>
                                                    <div className="expand-btn-section">
                                                        <button onClick={() => this.redirectToSales(item)} className="btn btn-primary green-primary-btn">My Sales</button>
                                                    </div>
                                                
                                                </div>
                                                <div className="align-self-center cursor-pointer" onClick={() => this.deleteStaffAction(item.id)}>
                                                    <GrayTrashIcon />
                                                </div>
                                            </ExpandFullView>
                                        }
                                    </div>
                                </ExpandedWhiteDiv>
                            )
                        })
                    }
                </div>
                <InviteModal 
                openInviteModal = { this.state.openInviteModal }
                inviteStaffRequest = { inviteStaffRequest }
                toggleModal={ this.toggleModal }/>
                <Modal show={this.state.backModal} onHide={this.handleBackModalClose} className="">
                   <Modal.Header closeButton></Modal.Header>
                    <Modal.Body className="padding-40px">
                        <p>Are you sure you want to delete this item from the system? You will not be able to access this record again.</p>
                    </Modal.Body>
                    <Modal.Footer className="">
                        <Button variant="secondary" onClick={this.handleBackModalClose}>
                                No
                        </Button>
                        <Button variant="primary" onClick={this.handleBackModalYes}>
                            Yes
                        </Button>
                        
                    </Modal.Footer>
                </Modal>
            </StaffContainer>
        )
    }
}

const mapStateToProps = state => ({
    apps: state.sales.apps,
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    getStaffRequest: () => dispatch(getStaffRequest()),
    deleteStaffRequest: data => dispatch(deleteStaffRequest(data)),
    inviteStaffRequest: data => dispatch(inviteStaffRequest(data))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);