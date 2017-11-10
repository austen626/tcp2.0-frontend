import React from 'react';
import { PureAdminHome } from './Home.js';

export default {
    component: PureAdminHome,
    title: 'Admin/Home/HomeScreen',
    parameters: {
        layout: 'fullscreen',
    },
};

const Template = (args) => <PureAdminHome {...args} />;
const customers = [
    {
        id: 123,
        name: 'C.Santos',
        location: 'Green Mountain Falls, Colorado',
        sale_slip: false,
        food_date: new Date(),
        food_stage: 'PreApproval',
        food_mode: 'auto',
        food_status: 'approval',
        other_stage: 'Sales',
        other_mode: 'auto',
        other_status: 'in-process',
        purchased_items: [
            { name: 'Full Service Program' },
            { name: 'Appliance' },
        ],
        food_tier: 2,
        other_tier: 2,
    },
    {
        id: 124,
        name: 'T.Williams',
        location: 'Green Mountain Falls, Colorado',
        sale_slip: true,
        food_date: new Date(),
        food_stage: 'PreApproval',
        food_mode: 'manual',
        food_status: 'approval',
        other_stage: 'PreApproval',
        other_mode: 'manual',
        other_status: 'in-process',
        purchased_items: [
            { name: 'Full Service Program' },
            { name: 'Appliance' },
        ],
        food_tier: 2,
        other_tier: 2,
    },
];

export const Primary = Template.bind({});
Primary.args = {
    getDealers: () => {},
    setDealer: () => {},
    deleteDealer: () => {},
    actionLoading: false,
    dealers: {
        data: [
            {
                id: 49,
                company_name: 'automation_OUQiuWHc',
                email: 'test+DbCXSnCt+2e0o3jnO@test.com',
                contact_email: 'test+gRxIgCti+uwQim13i@test.com',
                phone: '(539) 543-1910',
                is_sales: true,
                is_active: true,
                street: 'VGsUHw2psHGwKvS',
                city: '947uEuPmKnnXus2',
                state: 'Florida',
                zip: '66576',
                role: ['sales', 'dealer'],
                num_customers: 0,
            },
            {
                id: 60,
                company_name: 'Automation_RREcFfWE',
                email: 'test+UDsD8T4o+pYOcxSnW@test.com',
                contact_email: 'test+UV4jjkd3+TJKPWDqd@test.com',
                phone: '(922) 856-3328',
                is_sales: true,
                is_active: true,
                street: 'foV0SuuzI5EdxWI',
                city: 'Xah8sVmLdgOaBBx',
                state: 'Florida',
                zip: '21524',
                role: ['sales', 'dealer'],
                num_customers: 2,
                customers,
            },
        ],
    },
};
