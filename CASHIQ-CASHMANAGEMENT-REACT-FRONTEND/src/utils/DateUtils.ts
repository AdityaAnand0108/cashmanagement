import { PaymentFrequency } from '../models/PaymentFrequency';

/**
 * Calculates the number of days passed since the given date.
 * Returns 0 if the date is today or in the future.
 */
export const daysAgo = (dateStr: string): number => {
    const date = new Date(dateStr);
    const today = new Date();
    
    // Reset hours to compare dates only
    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
};

/**
 * Calculates the next logical payday.
 * If the given nextPayDay is in the past, it calculates the next occurrence
 * based on the frequency until it finds a future date (or today).
 */
export const calculateSmartNextPayDay = (currentNextPayDay: string, frequency: PaymentFrequency): string => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(currentNextPayDay);
    nextDate.setHours(0, 0, 0, 0);

    // If date is already in future or today, return it
    if (nextDate >= today) {
        return currentNextPayDay;
    }

    // If ONE_TIME, we don't calculate next; it's just passed.
    if (frequency === PaymentFrequency.ONE_TIME) {
        return currentNextPayDay;
    }

    // Loop until we find a date >= today
    // Limit iterations to prevent infinite loops in case of weird data
    let attempts = 0;
    while (nextDate < today && attempts < 500) {
        attempts++;
        switch (frequency) {
            case PaymentFrequency.WEEKLY:
                nextDate.setDate(nextDate.getDate() + 7);
                break;
            case PaymentFrequency.BIWEEKLY:
                nextDate.setDate(nextDate.getDate() + 14);
                break;
            case PaymentFrequency.MONTHLY:
                // Handle month overflow correctly
                nextDate.setMonth(nextDate.getMonth() + 1);
                break;
            default:
                // Should not happen, break loop
                return currentNextPayDay;
        }
    }

    // Format YYYY-MM-DD
    const year = nextDate.getFullYear();
    const month = String(nextDate.getMonth() + 1).padStart(2, '0');
    const day = String(nextDate.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
};

/**
 * Formats a date string (YYYY-MM-DD) to a more readable format (e.g., "Jan 26, 2026")
 */
export const formatReadableDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

/**
 * Formats a date string into a relative or friendly format.
 * - "Today"
 * - "Yesterday"
 * - "{N} Days Ago" (up to 7 days)
 * - "MMM D" (e.g., "Dec 30") for older dates
 * 
 * @param dateString - The date string to format (e.g., ISO string or "YYYY-MM-DD")
 * @returns The formatted date string
 */
export const formatRelativeDate = (dateString: string): string => {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);
    const now = new Date();
    
    // Reset time components for accurate day comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const diffTime = today.getTime() - targetDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return 'Today';
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays > 1 && diffDays <= 7) {
        return `${diffDays} Days Ago`;
    } else {
        // Format as "MMM D" (e.g., "Dec 30")
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
};
