export const PaymentFrequency = {
    ONE_TIME: 'ONE_TIME',
    WEEKLY: 'WEEKLY',
    BIWEEKLY: 'BIWEEKLY',
    MONTHLY: 'MONTHLY'
} as const;

export type PaymentFrequency = typeof PaymentFrequency[keyof typeof PaymentFrequency];
