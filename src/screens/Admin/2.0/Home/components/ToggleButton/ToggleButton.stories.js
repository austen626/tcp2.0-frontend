import { ToggleButton } from './ToggleButton';
import React from 'react';

export default {
    component: ToggleButton,
    title: 'Admin/Components/ToggleButton',
};

const Template = (args) => <ToggleButton {...args} />;
export const Primary = Template.bind({});
Primary.args = {
    fill: false,
    symbol: 'P',
};
