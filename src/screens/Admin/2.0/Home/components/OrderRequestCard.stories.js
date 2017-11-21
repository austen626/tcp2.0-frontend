import { OrderRequestCard } from './OrderRequestCard';
import React from 'react';
import { fixtureOrder } from '../../../../../models/customer.fixture';

export default {
    component: OrderRequestCard,
    title: 'Admin/Home/OrderRequestCard',
    parameters: {
        layout: 'fullscreen',
    },
};

const Template = (args) => (
    <div className="admin">
        <div className="main">
            <div className="list">
                <OrderRequestCard {...args} />
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
