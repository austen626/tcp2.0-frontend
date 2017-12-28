import { Comments } from './Comments';
import React from 'react';

export default {
    component: Comments,
    title: 'Admin/Comments/Comments',
    parameters: {
        layout: 'fullscreen',
    },
};

const Template = (args) => <Comments {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    applicant: {
        id: 513,
        first_name: 'First Name',
        last_name: 'Last Name',
        name: 'Godfrey',
    },
};
