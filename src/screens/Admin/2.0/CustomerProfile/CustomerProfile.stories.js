import React from 'react';
import { CustomerProfile } from './CustomerProfile';
import { fixtureSaleSlip } from '../../../../models/customer.fixture';

export default {
    component: CustomerProfile,
    title: 'Admin/CustomerProfile',
    parameters: {
        layout: 'fullscreen',
    },
};

const Template = (args) => <CustomerProfile {...args} />;

const customer = {
    applicant: {
        first_name: 'Mark',
        last_name: 'Bialik',
        applied_date: '02 Feb 1967',
        address: 'Gold Valley 4 Houston, TX',
        email: 'john@myemail.com',
        phone: '(123) 456-7890',
    },
    co_applicant: {
        first_name: 'Carl',
        last_name: 'Smith',
        email: 'john@myemail.com',
        phone: '(123) 456-7890',
    },
    dealer: {
        name: 'John Doe',
        tcp_no: '1550109',
    },
    num_comments: 2,
    credit_app_on_file: true,
    food_tier: 2,
    appliance_tier: 2,
    last_order: {
        food_balance: 345,
        appliance_balance: 67,
        total_past_due_balance: 2425,
        final_food_pmt_expected: new Date(),
    },
};

export const Primary = Template.bind({});
Primary.args = {

};
