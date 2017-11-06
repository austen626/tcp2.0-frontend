import { CustomerDetailCard } from './CustomerRow';
import React from 'react';

export default {
    component: CustomerDetailCard,
    title: 'Admin/Home/CustomerDetailCard',
    parameters: {
        layout: 'fullscreen',
    },
};

const Template = (args) => (
    <div className="admin">
        <div className="main">
            <div className="list">
                <CustomerDetailCard {...args} />
            </div>
        </div>
    </div>
);
export const Primary = Template.bind({});
Primary.args = {
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
            {
                id: 125,
                name: 'Full Service Program',
                price: 3799,
                document_delivered: true,
                document_signed: false,
            },
            {
                id: 126,
                name: 'Appliance',
                price: 599,
                document_delivered: true,
                document_signed: true,
            },
        ],
        food_tier: 2,
        other_tier: 2,
    },
    expanded: false,
    onClick: () => {},
};