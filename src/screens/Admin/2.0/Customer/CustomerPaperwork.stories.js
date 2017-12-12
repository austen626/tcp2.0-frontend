import React from 'react';
import CustomerPaperwork from './CustomerPaperwork';

export default {
    component: CustomerPaperwork,
    title: 'Admin/Customer/CustomerPaperwork',
    parameters: {
        layout: 'fullscreen',
    },
};

const Template = (args) => (
    <div className="admin">
        <CustomerPaperwork {...args} />
    </div>
);

export const Primary = Template.bind({});

Primary.args = {
    paperworks: [
        {
            id: 1,
            document_delivered: false,
            document_signed: false,
            funded: false,
            type: 'sale',
            balance: 2000.05,
        },
        {
            id: 2,
            document_delivered: true,
            document_signed: false,
            funded: false,
            type: 'sale',
            balance: 3242.05,
        },
        {
            id: 3,
            document_delivered: true,
            document_signed: true,
            funded: false,
            type: 'sale',
            balance: 123.05,
        },
        {
            id: 4,
            funded: true,
            type: 'sale',
            balance: 52522.05,
        },
        {
            id: 5,
            funded: true,
            type: 'sale',
            balance: 422.05,
        },
        {
            id: 6,
            type: 'sale',
            funded: true,
            balance: 53632.4,
            date: new Date(),
        },
        {
            id: 7,
            type: 'pre-approval',
            date: new Date(),
        },
    ],
};
