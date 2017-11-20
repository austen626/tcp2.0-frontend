import React from 'react';
import { CustomerProfile } from './CustomerProfile';
import { fixtureOrder } from '../../../../models/customer.fixture';
import PropTypes from 'prop-types';

export default {
    component: CustomerProfile,
    title: 'Admin/CustomerProfile',
    parameters: {
        layout: 'fullscreen',
    },
};

const Template = (args) => <CustomerProfile {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    customer: fixtureOrder,
    latestOrder: {
        food_balance: 5000,
        appliance_balance: 500,
        total_past_due_balance: 5000,
        final_food_pmt_expected: new Date(),
    },
    inProcessOrder: {
        request_type: 'order',
        review_mode: 'auto',
        status: 'approval',
        applications: [
            {
                name: 'Credit Application',
                value: 0,
            },
            {
                name: 'Full Service Program',
                value: 3799,
            },
            {
                name: 'Appliance-',
                value: 599,
            },
            {
                name: 'Full Service Program',
                value: 3799,
            },
        ],
    },
    dealer: {
        name: 'Dealer Name',
        tcp_number: '1550109',
    },
    numComments: 2,
    creditAppOnFile: true,
    foodTier: 2,
    applianceTier: 2,
};
