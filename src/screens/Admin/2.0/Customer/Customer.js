import React, { useState } from 'react';
import CustomerTabBar from './components/CustomerTabBar';
import { CustomerProfile } from './CustomerProfile';
import CustomerCredit from './CustomerCredit';
import CustomerHistory from './CustomerHistory';
import CustomerPaperwork from './CustomerPaperwork';
import { fixtureOrder } from '../../../../models/customer.fixture';

export function Customer() {
    const [activeTab, setActiveTab] = useState(0);
    const customer = fixtureOrder;
    const latestOrder = {
        food_balance: 5000,
        appliance_balance: 500,
        total_past_due_balance: 5000,
        final_food_pmt_expected: new Date(),
    };
    const dealer = {
        name: 'Dealer Name',
        tcp_number: '1550109',
    };
    const numComments = 2;

    return (
        <div className="admin">
            {activeTab === 0 && (
                <CustomerProfile
                    customer={customer}
                    numComments={numComments}
                    dealer={dealer}
                    latestOrder={latestOrder}
                />
            )}
            {activeTab === 1 && <CustomerCredit />}
            {activeTab === 2 && <CustomerHistory />}
            {activeTab === 3 && <CustomerPaperwork />}
            <CustomerTabBar activeTab={activeTab} onClickTab={setActiveTab} />
        </div>
    );
}
