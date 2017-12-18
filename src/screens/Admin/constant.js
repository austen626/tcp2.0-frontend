import { message as ConstMessage } from 'shared/constant';
import { toTitleCase } from 'utils/helper';
export const applianceMap = [
    {
        label: toTitleCase(ConstMessage.NO_CREDIT_CHECK_TEXT),
        value: ConstMessage.NO_CREDIT_CHECK_TEXT,
    },
    {
        label: toTitleCase(ConstMessage.WITH_CREDIT_CHECK_TEXT),
        value: ConstMessage.WITH_CREDIT_CHECK_TEXT,
    },
];

export const adminPreapprovalTypes = [
    {
        label: 'Food',
        value: 'food',
    },
    {
        label: 'Food & Appliance',
        value: 'food, appliance',
    },
    {
        label: 'Appliance',
        value: 'appliance',
    },
];

export const statusApproval = 'approval';
export const statusInProcess = 'in-process';
export const statusRejection = 'rejection';
