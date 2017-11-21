import { CustomerRow } from './CustomerRow';
import React from 'react';
import {
    fixtureOrder,
    fixturePreApproval,
} from '../../../../../models/customer.fixture';

export default {
    component: CustomerRow,
    title: 'Admin/Home/CustomerRow',
    parameters: {
        layout: 'fullscreen',
    },
};

const Template = (args) => (
    <div className="admin">
        <div className="main">
            <div className="list">
                <CustomerRow {...args} />
            </div>
        </div>
    </div>
);
export const Primary = Template.bind({});
Primary.args = {
    customer: fixturePreApproval,
    expanded: false,
    onClick: () => {},
};

export const Secondary = Template.bind({});
Secondary.args = {
    customer: fixtureOrder,
    expanded: false,
    onClick: () => {},
};
