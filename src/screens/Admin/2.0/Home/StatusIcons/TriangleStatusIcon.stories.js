import { TriangleStatusIcon } from './TriangleStatusIcon';
import React from 'react';

export default {
    component: TriangleStatusIcon,
    title: 'Admin/StatusIcons/TriangleIcon',
};

const Template = (args) => <TriangleStatusIcon {...args} />;
export const Primary = Template.bind({});
Primary.args = {
    fill: false,
    symbol: 'P',
};
