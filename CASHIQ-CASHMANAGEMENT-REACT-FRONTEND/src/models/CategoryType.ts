export const CategoryType = {
    FOOD: 'Food',
    TRANSPORT: 'Transport',
    UTILITIES: 'Utilities',
    RENT: 'Rent',
    INCOME: 'Income',
    SHOPPING: 'Shopping',
    ENTERTAINMENT: 'Entertainment',
    HEALTH: 'Health',
    TRANSFER: 'Transfer',
    EDUCATION: 'Education'
} as const;

export type CategoryType = keyof typeof CategoryType;
