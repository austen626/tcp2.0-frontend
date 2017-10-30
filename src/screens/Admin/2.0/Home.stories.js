import React from 'react';
import PureAdminHome from './Home.js';

export default {
    component: PureAdminHome,
    title: 'Admin/Home/HomeScreen',
};

const Template = (args) => <PureAdminHome {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    actionLoading: false,
    dealers: [
        {
            id: 49,
            company_name: 'automation_OUQiuWHc',
            email: 'test+DbCXSnCt+2e0o3jnO@test.com',
            contact_email: 'test+gRxIgCti+uwQim13i@test.com',
            phone: '(539) 543-1910',
            is_sales: true,
            is_active: false,
            street: 'VGsUHw2psHGwKvS',
            city: '947uEuPmKnnXus2',
            state: 'Florida',
            zip: '66576',
            role: ['sales', 'dealer'],
        },
        {
            id: 60,
            company_name: 'Automation_RREcFfWE',
            email: 'test+UDsD8T4o+pYOcxSnW@test.com',
            contact_email: 'test+UV4jjkd3+TJKPWDqd@test.com',
            phone: '(922) 856-3328',
            is_sales: true,
            is_active: false,
            street: 'foV0SuuzI5EdxWI',
            city: 'Xah8sVmLdgOaBBx',
            state: 'Florida',
            zip: '21524',
            role: ['sales', 'dealer'],
        },
    ],
};
