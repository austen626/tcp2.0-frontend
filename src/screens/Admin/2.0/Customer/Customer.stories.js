import React from 'react';
import { Customer } from './Customer';

export default {
    component: Customer,
    title: 'Admin/Customer/Customer',
    parameters: {
        layout: 'fullscreen',
    },
};

const Template = (args) => <Customer {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
