/**
 * Utility to extract structured data from natural language transaction descriptions.
 * This simulates "Smart" extraction on the client-side.
 */

export const extractMerchant = (description: string): string => {
    if (!description) return "Unknown Merchant";
    
    // Pattern 1: "from [Merchant] [Amount]" or "from [Merchant] with"
    // e.g., "ordered food from swiggy 297"
    const fromMatch = description.match(/from\s+([A-Za-z0-9\s]+?)(?=\s+\d|\s+with|$)/i);
    if (fromMatch && fromMatch[1]) {
        return capitalizeWords(fromMatch[1].trim());
    }

    // Pattern 2: "paid [Merchant] [Amount]"
    const paidMatch = description.match(/paid\s+([A-Za-z0-9\s]+?)(?=\s+\d|$)/i);
    if (paidMatch && paidMatch[1]) {
        if (paidMatch[1].toLowerCase() === "internet bill") return "ISP"; // Specific override example
        return capitalizeWords(paidMatch[1].trim());
    }

    // Pattern 3: "at [Merchant]"
    const atMatch = description.match(/at\s+([A-Za-z0-9\s]+?)(?=\s+\d|$)/i);
    if (atMatch && atMatch[1]) {
        return capitalizeWords(atMatch[1].trim());
    }

    // Fallback: Use the first 2-3 words if it looks like a name? 
    // Or just return the description substring if short.
    // For now, if no pattern matches, return the description (or a generic placeholder if too long).
    // But to match the user's request for "Swiggy" vs "ordered food...", let's be conservative.
    
    // If description is short (likely just a name), return it.
    if (description.split(' ').length <= 2) {
        return capitalizeWords(description);
    }

    return "Unknown Merchant";
};

const capitalizeWords = (str: string): string => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
};
