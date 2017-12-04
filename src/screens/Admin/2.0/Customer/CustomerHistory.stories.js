import React from 'react';
import CustomerHistory from './CustomerHistory';

export default {
    component: CustomerHistory,
    title: 'Admin/Customer/CustomerHistory',
    parameters: {
        layout: 'fullscreen',
    },
};

const Template = (args) => (
    <div className="admin">
        <CustomerHistory {...args} />
    </div>
);

export const Primary = Template.bind({});

Primary.args = {
    loans: [
        {
            id: 1,
            name: 'Food',
            date: new Date(),
            no: '36648930',
        },
        {
            id: 2,
            name: 'Food',
            date: new Date(),
            no: '36648931',
        },
        {
            id: 3,
            name: 'Food',
            date: new Date(),
            no: '36648932',
        },
    ],
};
