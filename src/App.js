import React from 'react';

import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import NetworkDetector from './NetworkDetector';
import LoginScreen from './screens/Auth/Login';
import RegisterScreen from './screens/Auth/Register';
import TwoFA from './screens/Auth/TwoFA';
import ForgotPassword from './screens/Auth/ForgotPassword';
import ResetPassword from './screens/Auth/ResetPassword';

import ProfileScreen from './screens/User/Profile/';
import ChangePassword from './screens/User/ChangePassword/';

import SalesHomeScreen from './screens/Sales/Home';
import ContactScreen from './screens/Sales/Contact';
import ReorderScreen from './screens/Sales/Reorder';
import ProductScreen from './screens/Sales/Product';
import SummaryScreen from './screens/Sales/Summary';
import PrequalifyScreen from './screens/Sales/Prequalify';

import DealerHomeScreen from './screens/Dealer/Home';
import SalesListScreen from './screens/Dealer/Sales';
import AppDetailsScreen from './screens/Dealer/AppDetails';
import ApplicationDetailsScreen from './screens/Dealer/ApplicationDetails';
import CustomerDetailsScreen from './screens/Dealer/Customer';
import DealerPreApprovals from './screens/Dealer/DealerPreApprovals';
import DealerIncompletes from './screens/Dealer/DealerIncomplete';
import DealerFix from './screens/Dealer/DealerFix';
import PreFilled from './screens/Dealer/PreFilled';
import ApplyPreFilledPage from './screens/Dealer/ApplyPreFilledPage';

import AdminHome from './screens/Admin/Home';
import AdminPendingApplications from './screens/Admin/AdminPendingApplications';
import AdminPendingApplicationItem from './screens/Admin/AdminPendingApplicationItem';
import AdminPreApprovals from './screens/Admin/AdminPreApprovals';
import AdminPreApprovalItem from './screens/Admin/AdminPreApprovalItem';
import AdminFundingRequests from './screens/Admin/FundingRequests';
import AdminFundingRequestItem from './screens/Admin/FundingRequestItem';

import StaffHomeScreen from './screens/Staff/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import './assets/css/index.scss';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) 
    {
      if(role && role.indexOf('admin') !== -1 && rest.path === "/")
      {
        return <AdminHome {...props} />;
      }
      else if(role && role.indexOf('dealer') !== -1 && rest.path === "/")
      {
        return <DealerHomeScreen {...props} />;
      }
      else if(role && (role.indexOf('sales') !== -1 || role.indexOf('dealer') !== -1) && rest.path === "/")
      {
        return <SalesHomeScreen {...props} />;
      }
      else
      {
        if(role && role.indexOf(rest.role) !== -1)
        {
          return <Component {...props} />;
        }
        else
        {
          if(role && role.indexOf('admin') !== -1)
          {
            return <AdminHome {...props} />;
          }
          else if(role && role.indexOf('dealer') !== -1)
          {
            return <DealerHomeScreen {...props} />;
          }
          else if(role && (role.indexOf('sales') !== -1 || role.indexOf('dealer') !== -1))
          {
            return <SalesHomeScreen {...props} />;
          }
        }
      }
    } 
    else
    {
      return <Redirect to='/login' />;
    }
  }} />
)

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Component {...props} />;
    } else {
      return <Redirect to='/' />;
    }
  }} />
)

function App() {
  return (
    <Router history={history}>
      <Switch> 

        <AuthRoute exact path="/login" component={LoginScreen} />
        <AuthRoute exact path="/register" component={RegisterScreen} />
        <AuthRoute path="/2fa" component={TwoFA} />
        <AuthRoute exact path="/forgot" component={ForgotPassword} />
        <AuthRoute exact path="/reset-password" component={ResetPassword} />

        <PrivateRoute exact role="dealer" path="/" component={DealerHomeScreen} />
        <PrivateRoute exact role="dealer" path="/sales-list/:status" component={SalesListScreen} />
        <PrivateRoute exact role="dealer" path="/preapprovals" component={DealerPreApprovals} />
        <PrivateRoute exact role="dealer" path="/incomplete-page" component={DealerIncompletes} />
        <PrivateRoute exact role="dealer" path="/dealer-fix/:appId" component={DealerFix} />
        <PrivateRoute exact role="dealer" path="/app-details/:appId" component={AppDetailsScreen} />
        <PrivateRoute exact role="dealer" path="/application-details/:appId" component={ApplicationDetailsScreen} />
        <PrivateRoute exact role="dealer" path="/customer/:id/:type" component={CustomerDetailsScreen} />
        <PrivateRoute exact role="dealer" path="/prefilled/:id" component={PreFilled} />
        <PrivateRoute exact role="dealer" path="/prefilled-view/:id" component={ApplyPreFilledPage} />

        <PrivateRoute exact role="dealer" path="/staff" component={StaffHomeScreen} />

        <PrivateRoute exact role="sales" path="/" component={SalesHomeScreen} />
        <PrivateRoute exact role="sales" path="/sales" component={SalesHomeScreen} />
        <PrivateRoute exact role="sales" path="/profile" component={ProfileScreen} />
        <PrivateRoute exact role="sales" path="/contact" component={ContactScreen} />
        <PrivateRoute exact role="sales" path="/reorder" component={ReorderScreen} />
        <PrivateRoute exact role="sales" path="/product/:id" component={ProductScreen} key=":id" />
        <PrivateRoute exact role="sales" path="/summary" component={SummaryScreen} />
        <PrivateRoute exact role="sales" path="/prequalify" component={PrequalifyScreen} />
        <PrivateRoute exact role="sales" path="/change-password" component={ChangePassword} />

        <PrivateRoute exact role="admin" path="/" component={AdminHome} />
        <PrivateRoute exact role="admin" path="/admin/pendingApplications" component={AdminPendingApplications} />
        <PrivateRoute exact role="admin" path="/admin/pendingApplication/:id" component={AdminPendingApplicationItem} />
        <PrivateRoute exact role="admin" path="/admin/preapprovals" component={AdminPreApprovals} />
        <PrivateRoute exact role="admin" path="/admin/preapproval/:id" component={AdminPreApprovalItem} key=":id" />
        <PrivateRoute exact role="admin" path="/admin/fundings" component={AdminFundingRequests} />
        <PrivateRoute exact role="admin" path="/admin/funding/:id" component={AdminFundingRequestItem} key=":id" />
      </Switch>
    </Router>
  );
}

export default NetworkDetector(App);