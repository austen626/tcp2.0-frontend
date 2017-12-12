import React, { useState } from 'react';
import CustomerTabBar from './components/CustomerTabBar';
import { CustomerProfile } from './CustomerProfile';
import CustomerCredit from './CustomerCredit';
import CustomerHistory from './CustomerHistory';
import CustomerPaperwork from './CustomerPaperwork';
import { fixtureOrder } from '../../../../models/customer.fixture';
import Header, {
    HeaderCenter,
    HeaderLeft,
    HeaderRight,
} from '../../../../components/Dealer/Header';
import { IconArrowLeft } from '../../../../assets/images';

export function Customer() {
    const [activeTab, setActiveTab] = useState(0);
    const applicant = {
        first_name: 'Brant',
        last_name: 'Miller',
    };

    const profileData = {
        customer: fixtureOrder,
        numComments: 2,
        dealer: {
            name: 'Dealer Name',
            tcp_number: '1550109',
        },
        latestOrder: {
            food_balance: 5000,
            appliance_balance: 500,
            total_past_due_balance: 5000,
            final_food_pmt_expected: new Date(),
        },
    };
    const creditData = {
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

    const historyData = {
        loans: [
            {
                id: 1,
                name: 'Food',
                date: new Date(),
                no: '36648930',
            },
            {
                id: 2,
                name: 'Food',
                date: new Date(),
                no: '36648931',
            },
            {
                id: 3,
                name: 'Food',
                date: new Date(),
                no: '36648932',
            },
        ],
    };

    const paperworkData = {
        paperworks: [
            {
                id: 1,
                document_delivered: false,
                document_signed: false,
                funded: false,
                type: 'sale',
                balance: 2000.05,
            },
            {
                id: 2,
                document_delivered: true,
                document_signed: false,
                funded: false,
                type: 'sale',
                balance: 3242.05,
            },
            {
                id: 3,
                document_delivered: true,
                document_signed: true,
                funded: false,
                type: 'sale',
                balance: 123.05,
            },
            {
                id: 4,
                funded: true,
                type: 'sale',
                balance: 52522.05,
            },
            {
                id: 5,
                funded: true,
                type: 'sale',
                balance: 422.05,
            },
            {
                id: 6,
                type: 'sale',
                funded: true,
                balance: 53632.4,
                date: new Date(),
            },
            {
                id: 7,
                type: 'pre-approval',
                date: new Date(),
            },
        ],
    };

    const handleArrowBack = () => {};

    return (
        <div className="admin">
            <Header>
                <HeaderLeft>
                    <img src={IconArrowLeft} onClick={handleArrowBack} alt="" />
                </HeaderLeft>
                <HeaderCenter>
                    <div className="header-main">
                        {applicant.first_name} {applicant.last_name}
                    </div>
                </HeaderCenter>
                <HeaderRight />
            </Header>
            <div className="main">
                {activeTab === 0 && <CustomerProfile {...profileData} />}
                {activeTab === 1 && <CustomerCredit {...creditData} />}
                {activeTab === 2 && <CustomerHistory {...historyData} />}
                {activeTab === 3 && <CustomerPaperwork {...paperworkData} />}
            </div>
            <CustomerTabBar activeTab={activeTab} onClickTab={setActiveTab} />
        </div>
    );
}
