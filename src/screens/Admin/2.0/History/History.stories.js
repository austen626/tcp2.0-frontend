import React from 'react';
import { PureHistory } from './History';

export default {
    component: PureHistory,
    title: 'Admin/History/HistoryScreen',
    parameters: {
        layout: 'fullscreen',
    },
};

const Template = (args) => <PureHistory {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    history: {
        data: [
            {
                id: 1,
                customer: {
                    first_name: 'M',
                    middle_name: 'Y',
                    last_name: 'Name',
                },
                dealer: {
                    first_name: 'S',
                    last_name: 'Alesperson',
                },
                created_at: new Date(),
                status: 'dispositioned',
            },
            {
                id: 2,
                customer: {
                    first_name: 'M',
                    middle_name: 'Y',
                    last_name: 'Name',
                },
                dealer: {
                    first_name: 'S',
                    last_name: 'Alesperson',
                },
                created_at: new Date(),
                status: 'funded',
            },
            {
                id: 3,
                customer: {
                    first_name: 'M',
                    middle_name: 'Y',
                    last_name: 'Name',
                },
                dealer: {
                    first_name: 'S',
                    last_name: 'Alesperson',
                },
                created_at: new Date(),
                status: 'dispositioned',
            },
            {
                id: 4,
                customer: {
                    first_name: 'M',
                    middle_name: 'Y',
                    last_name: 'Name',
                },
                dealer: {
                    first_name: 'S',
                    last_name: 'Alesperson',
                },
                created_at: new Date(),
                status: 'dispositioned',
            },
            {
                id: 5,
                customer: {
                    first_name: 'M',
                    middle_name: 'Y',
                    last_name: 'Name',
                },
                dealer: {
                    first_name: 'S',
                    last_name: 'Alesperson',
                },
                created_at: new Date(),
                status: 'funded',
            },
            {
                id: 6,
                customer: {
                    first_name: 'M',
                    middle_name: 'Y',
                    last_name: 'Name',
                },
                dealer: {
                    first_name: 'S',
                    last_name: 'Alesperson',
                },
                created_at: new Date(),
                status: 'dispositioned',
            },
        ],
    },
    actionLoading: false,
    getHistory: () => {},
};
