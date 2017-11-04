import { CustomerRow } from './CustomerRow';
import React from 'react';

export default {
    component: CustomerRow,
    title: 'Admin/Home/CustomerRow',
};

const Template = (args) => <CustomerRow {...args} />;
export const Primary = Template.bind({});
Primary.args = {
    data: {
        name: 'C.Santos',
        location: 'Green Mountain Falls, Colorado',
        sale_slip: false,
        food_date: new Date(),
        food_stage: 'PreApproval',
        food_mode: 'auto',
        food_status: 'approval',
        other_stage: 'Sales',
        other_mode: 'auto',
        other_status: 'in-process',
    },
    expanded: false,
    onClick: () => {},
};

export const Second = Template.bind({});
Second.args = {
    data: {
        name: 'C.Santos',
        location: 'Green Mountain Falls, Colorado',
        sale_slip: true,
        food_date: new Date(),
        food_stage: 'PreApproval',
        food_mode: 'auto',
        food_status: 'approval',
        other_stage: 'Sales',
        other_mode: 'auto',
        other_status: 'in-process',
        purchased_items: [
            { name: 'Full Service Program' },
            { name: 'Appliance' },
        ],
    },
    expanded: false,
    onClick: () => {},
}
