import { PreApprovalRequestCard } from './PreApprovalRequestCard';
import { OrderRequestCard } from './OrderRequestCard';
import { fixtureOrder, fixturePreApproval } from '../../../../models/customer.fixture';
import React from 'react';

export default {
    component: PreApprovalRequestCard,
    title: 'Admin/Home/PreApprovalRequestCard',
    parameters: {
        layout: 'fullscreen',
    },
};

const Template = (args) => (
    <div className="admin">
        <div className="main">
            <div className="list">
                <PreApprovalRequestCard {...args} />
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
