import React from 'react';
import { CustomerProfile } from './CustomerProfile';
import { fixtureOrder } from '../../../../models/customer.fixture';

export default {
    component: CustomerProfile,
    title: 'Admin/Customer/Profile',
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
    dealer: {
        name: 'Dealer Name',
        tcp_number: '1550109',
    },
    numComments: 2,
};
