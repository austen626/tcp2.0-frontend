import { OrderDetailCard } from './OrderDetailCard';
import React from 'react';
import { fixtureOrder } from '../../../../models/customer.fixture';

export default {
    component: OrderDetailCard,
    title: 'Admin/Home/OrderDetailCard',
    parameters: {
        layout: 'fullscreen',
    },
};

const Template = (args) => (
    <div className="admin">
        <div className="main">
            <div className="list">
                <OrderDetailCard {...args} />
            </div>
        </div>
    </div>
);
export const Primary = Template.bind({});
Primary.args = {
    customer: fixtureOrder,
    expanded: false,
    onClick: () => {},
};
