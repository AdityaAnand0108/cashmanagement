/**
 * Utility to format currency values.
 * Defaults to Indian Rupee (INR) and Indian English (en-IN) locale.
 */
export const formatCurrency = (amount: number, currency: string = 'INR', locale: string = 'en-IN'): string => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};
