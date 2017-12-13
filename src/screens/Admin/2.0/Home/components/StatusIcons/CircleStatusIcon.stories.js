import { CircleStatusIcon } from './CircleStatusIcon';
import React from 'react';

export default {
    component: CircleStatusIcon,
    title: 'Admin/Components/StatusIcons/CircleIcon',
};

const Template = (args) => <CircleStatusIcon {...args} />;
export const Primary = Template.bind({});
Primary.args = {
    fill: false,
    symbol: 'P',
};
