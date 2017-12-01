import React from 'react';
import CustomerCredit from './CustomerCredit';

export default {
    component: CustomerCredit,
    title: 'Admin/Customer/CustomerCredit',
    parameters: {
        layout: 'fullscreen',
    },
};

const Template = (args) => (
    <div className="admin">
        <CustomerCredit {...args} />
    </div>
);

export const Primary = Template.bind({});
Primary.args = {
    credit: {
        applicant: {
            first_name: 'Brant',
            last_name: 'Miller',
            date: new Date(),
            income: 3000,
            fico: 12,
            van: 37,
            credit_shop: true,
        },
        co_applicant: {
            first_name: 'Brant',
            last_name: 'Miller',
            date: new Date(),
            income: 2500,
            fico: 40,
            van: 35,
            credit_shop: true,
        },
        combined_stats: {
            past_due: 2500,
            income: 35224,
            payments: 20000,
            dti: 30,
        },
        delinquency_30: 25,
        delinquency_60: 35,
        delinquency_90: 95,
        inquiries: 395,
        revolving_percentage: 90,
        balance_stats: {
            revolving: {
                total_balance: 2000.85,
                total_monthly_payments: 3524.56,
                past_due_amounts: 5255.62,
            },
            mortgage: {
                total_balance: 2552.52,
                total_monthly_payments: 1552.45,
                past_due_amounts: 1425.45,
            },
            installment: {
                total_balance: 150.25,
                total_monthly_payments: 256.34,
                past_due_amounts: 256.25,
            },
        },
        comment: 'He is trustable',
    },
};
