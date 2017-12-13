import { HexagonStatusIcon } from './HexagonStatusIcon';
import React from 'react';

export default {
    component: HexagonStatusIcon,
    title: 'Admin/Components/StatusIcons/HexagonIcon',
};

const Template = (args) => <HexagonStatusIcon {...args} />;
export const Primary = Template.bind({});
Primary.args = {
    fill: false,
    symbol: 'P',
};
